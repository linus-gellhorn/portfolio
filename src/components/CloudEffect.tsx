import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

export default function CloudEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const frameRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const texturesRef = useRef<THREE.Data3DTexture[]>([]);
  const materialsRef = useRef<THREE.RawShaderMaterial[]>([]);
  const geometryRef = useRef<THREE.BoxGeometry | null>(null);
  const scrollProgressRef = useRef<number>(0);
  const initialCameraZRef = useRef<number>(1.5);
  const cloudPositionsRef = useRef<
    Array<{ x: number; y: number; z: number; direction: "left" | "right" }>
  >([]);
  const imagePlaneRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cloudMouseOffsetsRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    const pixelRatio = isMobile
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const cameraFOV = isMobile ? 70 : 60;
    const camera = new THREE.PerspectiveCamera(
      cameraFOV,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 1.5);
    initialCameraZRef.current = 1.5;
    cameraRef.current = camera;

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({ color: 0x5da5d5, side: THREE.BackSide })
    );
    scene.add(sky);

    // Load and add the linus-gellhorn SVG
    // Load SVG and convert to high-quality texture
    fetch("/linus-gellhorn.svg")
      .then((response) => response.text())
      .then((svgText) => {
        const img = new Image();
        const blob = new Blob([svgText], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
          // Create a high-resolution canvas
          const canvas = document.createElement("canvas");
          const scale = 4; // 4x resolution for crisp quality
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);

            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;

            const imageAspect = canvas.width / canvas.height;
            const planeWidth = 1;
            const planeHeight = planeWidth / imageAspect;

            const imagePlane = new THREE.Mesh(
              new THREE.PlaneGeometry(planeWidth, planeHeight),
              new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0,
              })
            );
            imagePlane.position.set(0, 0, -2);
            scene.add(imagePlane);
            imagePlaneRef.current = imagePlane;
          }

          URL.revokeObjectURL(url);
        };

        img.src = url;
      });

    // Function to generate a unique cloud texture
    const generateCloudTexture = (
      seed: number,
      scaleX: number,
      scaleY: number,
      scaleZ: number
    ) => {
      const size = 96;
      const data = new Uint8Array(size * size * size);
      let i = 0;
      const perlin = new ImprovedNoise();
      const vector = new THREE.Vector3();

      for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const d =
              1.0 -
              vector
                .set(x, y, z)
                .subScalar(size / 2)
                .divideScalar(size)
                .length();

            // Add seed offset to generate different patterns
            data[i] =
              (128 +
                128 *
                  perlin.noise(
                    x * scaleX + seed,
                    y * scaleY + seed * 0.5,
                    z * scaleZ + seed * 0.3
                  )) *
              d *
              d;
            i++;
          }
        }
      }

      const texture = new THREE.Data3DTexture(data, size, size, size);
      texture.format = THREE.RedFormat;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.unpackAlignment = 1;
      texture.needsUpdate = true;
      return texture;
    };

    // Generate unique textures for each cloud with same scale for consistent brightness
    const cloudTextures = [
      generateCloudTexture(0, 0.045, 0.05, 0.045), // Cloud 1 (left top)
      generateCloudTexture(50, 0.045, 0.05, 0.045), // Cloud 2 (left bottom)
      generateCloudTexture(100, 0.045, 0.05, 0.045), // Cloud 3 (right middle)
      generateCloudTexture(150, 0.045, 0.05, 0.045), // Cloud 4 (right top)
    ];
    texturesRef.current = cloudTextures;

    const vertexShader = /* glsl */ `
      in vec3 position;

      uniform mat4 modelMatrix;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform vec3 cameraPos;

      out vec3 vOrigin;
      out vec3 vDirection;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
        vDirection = position - vOrigin;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = /* glsl */ `
      precision highp float;
      precision highp sampler3D;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      in vec3 vOrigin;
      in vec3 vDirection;

      out vec4 color;

      uniform vec3 base;
      uniform sampler3D map;
      uniform float threshold;
      uniform float range;
      uniform float opacity;
      uniform float steps;
      uniform float frame;

      uint wang_hash(uint seed)
      {
        seed = (seed ^ 61u) ^ (seed >> 16u);
        seed *= 9u;
        seed = seed ^ (seed >> 4u);
        seed *= 0x27d4eb2du;
        seed = seed ^ (seed >> 15u);
        return seed;
      }

      float randomFloat(inout uint seed)
      {
        return float(wang_hash(seed)) / 4294967296.;
      }

      vec2 hitBox( vec3 orig, vec3 dir ) {
        const vec3 box_min = vec3( - 0.5 );
        const vec3 box_max = vec3( 0.5 );
        vec3 inv_dir = 1.0 / dir;
        vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
        vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
        vec3 tmin = min( tmin_tmp, tmax_tmp );
        vec3 tmax = max( tmin_tmp, tmax_tmp );
        float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
        float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
        return vec2( t0, t1 );
      }

      float sample1( vec3 p ) {
        return texture( map, p ).r;
      }

      float shading( vec3 coord ) {
        float step = 0.01;
        return sample1( coord + vec3( - step ) ) - sample1( coord + vec3( step ) );
      }

      vec4 linearToSRGB( in vec4 value ) {
        return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
      }

      void main(){
        vec3 rayDir = normalize( vDirection );
        vec2 bounds = hitBox( vOrigin, rayDir );

        if ( bounds.x > bounds.y ) discard;

        bounds.x = max( bounds.x, 0.0 );

        vec3 p = vOrigin + bounds.x * rayDir;
        vec3 inc = 1.0 / abs( rayDir );
        float delta = min( inc.x, min( inc.y, inc.z ) );
        delta /= steps;

        uint seed = uint( gl_FragCoord.x ) * uint( 1973 ) + uint( gl_FragCoord.y ) * uint( 9277 ) + uint( frame ) * uint( 26699 );
        vec3 size = vec3( textureSize( map, 0 ) );
        float randNum = randomFloat( seed ) * 2.0 - 1.0;
        p += rayDir * randNum * ( 1.0 / size );

        vec4 ac = vec4( base, 0.0 );

        for ( float t = bounds.x; t < bounds.y; t += delta ) {

          float d = sample1( p + 0.5 );

          d = smoothstep( threshold - range, threshold + range, d ) * opacity;

          float col = shading( p + 0.5 ) * 3.0 + ( ( p.x + p.y ) * 0.15 ) + 0.2;

          ac.rgb += ( 1.0 - ac.a ) * d * col;

          ac.a += ( 1.0 - ac.a ) * d;

          if ( ac.a >= 0.95 ) break;

          p += rayDir * delta;

        }

        color = linearToSRGB( ac );

        if ( color.a == 0.0 ) discard;

      }
    `;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometryRef.current = geometry;

    const cloudPositions = isMobile
      ? [
          {
            x: -0.4,
            y: 0.25,
            z: 0,
            direction: "left" as const,
            scale: { x: 1.6, y: 0.7, z: 1 },
          },
          {
            x: -0.25,
            y: -0.25,
            z: 0,
            direction: "left" as const,
            scale: { x: 1.2, y: 0.8, z: 1 },
          },
          {
            x: 0.4,
            y: -0.1,
            z: 0,
            direction: "right" as const,
            scale: { x: 1.8, y: 0.9, z: 1 },
          },
          {
            x: 0.3,
            y: 0.4,
            z: 0,
            direction: "right" as const,
            scale: { x: 1.2, y: 0.9, z: 1 },
          },
        ]
      : [
          {
            x: -0.5,
            y: 0.3,
            z: 0,
            direction: "left" as const,
            scale: { x: 2.0, y: 0.8, z: 1 },
          },
          {
            x: -0.3,
            y: -0.3,
            z: 0,
            direction: "left" as const,
            scale: { x: 1.5, y: 1, z: 1 },
          },
          {
            x: 0.5,
            y: -0.1,
            z: 0,
            direction: "right" as const,
            scale: { x: 2.2, y: 1, z: 1 },
          },
          {
            x: 0.4,
            y: 0.5,
            z: 0,
            direction: "right" as const,
            scale: { x: 1.4, y: 1, z: 1 },
          },
        ];
    cloudPositionsRef.current = cloudPositions;

    const meshes: THREE.Mesh[] = [];
    const materials: THREE.RawShaderMaterial[] = [];
    cloudPositions.forEach((pos, index) => {
      // Use the unique texture for this cloud
      const cloudMaterial = new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms: {
          base: { value: new THREE.Color(0xb7c6da) },
          map: { value: cloudTextures[index] }, // Each cloud gets its own texture
          cameraPos: { value: new THREE.Vector3() },
          threshold: { value: 0.25 },
          opacity: { value: 0.3 },
          range: { value: 0.1 },
          steps: { value: 75 },
          frame: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });
      materials.push(cloudMaterial);
      const mesh = new THREE.Mesh(geometry, cloudMaterial);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.set(pos.scale.x, pos.scale.y, pos.scale.z);
      scene.add(mesh);
      meshes.push(mesh);
      // Initialize smooth mouse offset for this cloud
      cloudMouseOffsetsRef.current.push({ x: 0, y: 0 });
    });
    meshesRef.current = meshes;
    materialsRef.current = materials;

    const handleResize = () => {
      const newIsMobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = newIsMobile ? 70 : 60;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (isMobile) {
        const spacerHeight = window.innerHeight * 1.65;
        const animationDistance = spacerHeight * 0.85;
        scrollProgressRef.current = Math.min(scrollY / animationDistance, 1);
      } else {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        scrollProgressRef.current = Math.min(scrollY / (maxScroll * 0.6), 1);
      }

      const cameraZ = initialCameraZRef.current + scrollProgressRef.current * 2;
      camera.position.z = cameraZ;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const animate = () => {
      if (meshesRef.current.length > 0 && camera && renderer && scene) {
        const cameraPos = camera.position;
        const time = performance.now();

        materialsRef.current.forEach((mat) => {
          mat.uniforms.cameraPos.value.copy(cameraPos);
          mat.uniforms.frame.value = frameRef.current;
        });

        // Update image scale and position based on scroll (happens throughout)
        if (
          imagePlaneRef.current &&
          imagePlaneRef.current.material instanceof THREE.MeshBasicMaterial
        ) {
          const scrollY = window.scrollY;
          const fadeInDistance = isMobile ? 80 : 100;
          let logoOpacity = Math.min(scrollY / fadeInDistance, 1);

          const initialScale = isMobile ? 0.5 : 1;
          const maxScale = isMobile ? 18 : 20;
          const zoomScale = initialScale + scrollProgressRef.current * maxScale;
          imagePlaneRef.current.scale.set(zoomScale, zoomScale, 1);

          const zoomZ = -2 + scrollProgressRef.current * (isMobile ? 10 : 12);
          imagePlaneRef.current.position.z = zoomZ;

          if (zoomZ > camera.position.z) {
            const fadeOutStart = 0.85;
            if (scrollProgressRef.current > fadeOutStart) {
              const fadeOutProgress =
                (scrollProgressRef.current - fadeOutStart) / (1 - fadeOutStart);
              logoOpacity = Math.max(0, logoOpacity * (1 - fadeOutProgress));
            }
          }

          imagePlaneRef.current.material.opacity = logoOpacity;
        }

        meshesRef.current.forEach((mesh, index) => {
          const initialPos = cloudPositionsRef.current[index];

          const isTopCloud = initialPos.y > 0.2;
          const scrollZSpeed = isMobile
            ? isTopCloud
              ? 12
              : 6
            : isTopCloud
              ? 15
              : 8;
          const scrollZ = scrollProgressRef.current * scrollZSpeed;

          const scrollOffset = scrollProgressRef.current * (isMobile ? 8 : 10);
          const direction = initialPos.direction === "left" ? -1 : 1;
          const scrollX = initialPos.x + direction * scrollOffset;

          const floatSpeed = 0.3;
          const floatAmount = isMobile ? 0.03 : 0.05;
          const driftSpeed = 0.2;
          const driftAmount = isMobile ? 0.08 : 0.1;

          const floatY =
            initialPos.y +
            Math.sin(time * 0.001 * floatSpeed + index) * floatAmount;
          const driftX =
            scrollX +
            Math.cos(time * 0.001 * driftSpeed + index * 0.5) * driftAmount;

          const cloudCenterX = driftX;
          const cloudCenterY = floatY;

          const dx = mouseRef.current.x - cloudCenterX;
          const dy = mouseRef.current.y - cloudCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = isMobile ? 2.0 : 1.5;
          const strength = isMobile ? 0.03 : 0.05;

          let targetOffsetX = 0;
          let targetOffsetY = 0;

          if (distance < maxDistance && distance > 0) {
            const force = (1 - distance / maxDistance) * strength;
            targetOffsetX = -(dx / distance) * force;
            targetOffsetY = -(dy / distance) * force;
          }

          const lerpFactor = isMobile ? 0.08 : 0.1;
          const currentOffset = cloudMouseOffsetsRef.current[index];
          currentOffset.x += (targetOffsetX - currentOffset.x) * lerpFactor;
          currentOffset.y += (targetOffsetY - currentOffset.y) * lerpFactor;

          mesh.position.set(
            driftX + currentOffset.x,
            floatY + currentOffset.y,
            initialPos.z + scrollZ
          );
        });

        frameRef.current++;
        renderer.render(scene, camera);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      meshesRef.current.forEach((mesh) => {
        scene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material && Array.isArray(mesh.material)) {
          mesh.material.forEach((mat: THREE.Material) => mat.dispose());
        } else if (mesh.material) {
          (mesh.material as THREE.Material).dispose();
        }
      });
      materialsRef.current.forEach((mat: THREE.RawShaderMaterial) =>
        mat.dispose()
      );
      renderer.dispose();
      texturesRef.current.forEach((tex) => tex.dispose());
      if (geometryRef.current) geometryRef.current.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
