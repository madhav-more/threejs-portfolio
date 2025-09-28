import { Leva } from 'leva';
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

/**
 * Background: FallingStars
 * - lightweight Points cloud that slowly falls and respawns at top.
 * - placed behind the main scene (negative z).
 */
function FallingStars({ count = 220, area = [70, 40, 70], speed = 0.8, z = -30 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const [ax, ay, az] = area;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * ax;
      const y = Math.random() * ay - ay / 2;
      const zpos = (Math.random() - 0.5) * az;
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = zpos;
    }
    return arr;
  }, [count, area]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const p = pointsRef.current.geometry.attributes.position.array;
    const halfY = area[1] / 2;
    // move every star down, recycle when below -halfY
    for (let i = 0; i < p.length; i += 3) {
      p[i + 1] -= speed * delta * 20;
      if (p[i + 1] < -halfY) {
        p[i + 1] = halfY;
        p[i] = (Math.random() - 0.5) * area[0];
        p[i + 2] = (Math.random() - 0.5) * area[2];
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0, z]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        // pleasing icy-blue glow
        color={'#9be8ff'}
      />
    </points>
  );
}

/**
 * Background: LightGrid
 * - subtle grid made of line segments on a horizontal plane that gently undulates.
 * - placed further behind; use divisions & size to tune resolution/look.
 */
function LightGrid({ size = 100, divisions = 40, y = -10, z = -34 }) {
  const gridRef = useRef();

  const vertices = useMemo(() => {
    const verts = [];
    const step = size / divisions;
    const half = size / 2;
    for (let i = -half; i <= half + 0.0001; i += step) {
      // lines parallel to X (constant z)
      verts.push(-half, 0, i, half, 0, i);
      // lines parallel to Z (constant x)
      verts.push(i, 0, -half, i, 0, half);
    }
    return new Float32Array(verts);
  }, [size, divisions]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (gridRef.current) {
      // gentle breathing/undulation for a futuristic animated grid
      gridRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.12) * 0.01;
      gridRef.current.position.y = y + Math.sin(t * 0.25) * 0.35;
      gridRef.current.rotation.z = Math.sin(t * 0.06) * 0.02;
    }
  });

  return (
    <lineSegments ref={gridRef} position={[0, y, z]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={vertices}
          itemSize={3}
          count={vertices.length / 3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        transparent
        opacity={0.12}
        depthWrite={false}
        linewidth={1}
        // subtle neon
        color={'#7efcff'}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

const Hero = () => {
  // Use media queries to determine screen size (kept intact)
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Corners layout: choose margins that feel good on desktop vs mobile.
  // I intentionally compute independent corner positions (top-left, top-right, bottom-left, bottom-right)
  // so elements always "snap" to corners with a margin. If you want different margins tune these values.
  const marginX = isMobile ? 8 : 18; // horizontal distance from center
  const marginY = isMobile ? 6 : 10; // vertical distance from center
  const zDepth = 0.5; // small forward offset so they don't sit behind other scene objects

  // Respect existing 'sizes' where possible but prefer corner snapping — simple, predictable placement.
  const reactLogoCorner = [
    -marginX,
    marginY,
    // prefer previously computed z if present so scaling/depth remains similar
    sizes.reactLogoPosition?.[2] ?? zDepth,
  ];
  const ringsCorner = [
    marginX,
    marginY,
    sizes.ringPosition?.[2] ?? zDepth,
  ];
  const cubeCorner = [
    -marginX,
    -marginY,
    sizes.cubePosition?.[2] ?? zDepth,
  ];
  const targetCorner = [
    marginX,
    -marginY,
    sizes.targetPosition?.[2] ?? zDepth,
  ];

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-20 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Madhav <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Building Full Stack  AI Products &  Brands</p>
      </div>

      <div className="w-full h-full ml-1 absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            {/* Background visual layers (behind everything): */}
            {/* Light grid for futuristic floor/plane */}
            <LightGrid size={120} divisions={48} y={-11} z={-40} />
            {/* Falling stars/particles that slowly descend */}
            <FallingStars count={260} area={[90, 52, 90]} speed={0.9} z={-38} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.1, -Math.PI, 0]}
              />
            </HeroCamera>

            {/* Place main corner elements in a dedicated group */}
            <group>
              <Target position={targetCorner} />
              <ReactLogo position={reactLogoCorner} />
              <Rings position={ringsCorner} />
              <Cube position={cubeCorner} />
            </group>

            {/* subtle scene lighting — kept minimal so background effects shine */}
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
            {/* small colored rim lights for extra depth */}
            <pointLight position={[-15, 8, 6]} intensity={0.3} color={'#7efcff'} />
            <pointLight position={[15, -6, 6]} intensity={0.25} color={'#ff8bd6'} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
