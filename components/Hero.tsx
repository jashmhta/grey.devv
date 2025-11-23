
import React, { Suspense, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, MeshDistortMaterial, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { TextReveal } from './TextReveal';
import * as THREE from 'three';
import { PlusGrid, TechBadge } from './Decorative';
import { VelocityScroll } from './TextAnimations';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      instancedMesh: any;
      tetrahedronGeometry: any;
      meshStandardMaterial: any;
      group: any;
      mesh: any;
      torusGeometry: any;
      icosahedronGeometry: any;
      sphereGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      hemisphereLight: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      instancedMesh: any;
      tetrahedronGeometry: any;
      meshStandardMaterial: any;
      group: any;
      mesh: any;
      torusGeometry: any;
      icosahedronGeometry: any;
      sphereGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      hemisphereLight: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      instancedMesh: any;
      tetrahedronGeometry: any;
      meshStandardMaterial: any;
      group: any;
      mesh: any;
      torusGeometry: any;
      icosahedronGeometry: any;
      sphereGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      hemisphereLight: any;
    }
  }
}

// --- SUB-COMPONENTS ---

// 4. Reactive Geometric Background Pattern
function GeometricBackground() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const count = 30; // 30x30 grid = 900 instances
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate grid positions
  const separation = 1.5;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mx = (state.pointer.x * viewport.width) / 2;
    const my = (state.pointer.y * viewport.height) / 2;
    
    let i = 0;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
         const xx = (x - count / 2) * separation;
         const yy = (y - count / 2) * separation;
         
         // Distance from mouse logic
         const dx = xx - mx;
         const dy = yy - my;
         const dist = Math.sqrt(dx * dx + dy * dy);
         
         // Interaction Zone
         const influence = Math.max(0, 1 - dist / 10); // 0 to 1 based on proximity
         
         // Base Wave Animation
         const zBase = -8; // Push back behind main object
         const zWave = Math.sin(xx * 0.5 + time * 0.5) * Math.cos(yy * 0.5 + time * 0.5) * 0.5;
         
         // React to mouse
         const z = zBase + zWave + (influence * 2); 
         
         // Rotation logic
         const rotX = time * 0.2 + (influence * 2);
         const rotY = time * 0.3 + (influence * 2);
         
         // Scale logic
         const scaleBase = 0.05;
         const scale = scaleBase + (influence * 0.1);

         dummy.position.set(xx, yy, z);
         dummy.rotation.set(rotX, rotY, 0);
         dummy.scale.set(scale, scale, scale);
         
         dummy.updateMatrix();
         meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count * count]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#333" 
        emissive="#d4af37"
        emissiveIntensity={0.2}
        wireframe={true}
        transparent
        opacity={0.15}
      />
    </instancedMesh>
  );
}

// 1. Floating Gold Tetrahedrons (Digital Dust)
function FloatingDebris() {
  const group = useRef<THREE.Group>(null);
  const count = 40;
  
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.05 + 0.02,
      speed: Math.random() * 0.2
    }));
  }, []);

  useFrame((state) => {
    if (group.current) {
        group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {particles.map((data, i) => (
        <Float key={i} speed={1 + data.speed} rotationIntensity={2} floatIntensity={2}>
            <mesh position={data.position} rotation={data.rotation} scale={data.scale}>
                <tetrahedronGeometry args={[1, 0]} />
                <meshStandardMaterial 
                    color="#d4af37" 
                    metalness={1} 
                    roughness={0.1} 
                    emissive="#b38728"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
      ))}
    </group>
  );
}

// 2. Thin Orbital Rings (Architectural Feel)
function ArchitecturalRings() {
    const ref1 = useRef<THREE.Mesh>(null);
    const ref2 = useRef<THREE.Mesh>(null);
    const ref3 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref1.current) { ref1.current.rotation.x = Math.sin(t * 0.1) * 0.5; ref1.current.rotation.y = t * 0.08; }
        if (ref2.current) { ref2.current.rotation.x = Math.cos(t * 0.15) * 0.5; ref2.current.rotation.y = t * -0.05; }
        if (ref3.current) { ref3.current.rotation.z = t * 0.02; ref3.current.rotation.y = Math.sin(t * 0.05) * 0.2; }
    });

    const materialProps = {
        color: "#ffffff",
        transparent: true,
        opacity: 0.15,
        metalness: 1,
        roughness: 0,
        side: THREE.DoubleSide
    };

    return (
        <group>
            <mesh ref={ref1} scale={4} rotation={[1.5, 0, 0]}>
                <torusGeometry args={[1, 0.002, 16, 100]} />
                <meshStandardMaterial {...materialProps} color="#d4af37" opacity={0.3} />
            </mesh>
            <mesh ref={ref2} scale={5.5} rotation={[1.2, 0.5, 0]}>
                <torusGeometry args={[1, 0.001, 16, 100]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
             <mesh ref={ref3} scale={7} rotation={[0.5, 0.5, 0]}>
                <torusGeometry args={[1, 0.001, 16, 100]} />
                <meshStandardMaterial {...materialProps} opacity={0.05} />
            </mesh>
        </group>
    )
}

// 3. Main Art Piece (Digital Core)
function DigitalCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      // Organic, shifting movement for the core
      coreRef.current.rotation.x = t * 0.2;
      coreRef.current.rotation.y = t * 0.15;
    }
    if (shellRef.current) {
      // Mechanical, counter-rotation for the shell
      shellRef.current.rotation.x = -t * 0.1;
      shellRef.current.rotation.y = -t * 0.05;
      shellRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
        {/* Inner Liquid Core (The "Grey Matter") */}
        <mesh ref={coreRef} castShadow receiveShadow scale={2.0}>
            <icosahedronGeometry args={[1, 15]} /> 
            <MeshDistortMaterial 
                color="#111111" 
                roughness={0.1} 
                metalness={1} 
                distort={0.4} 
                speed={1.8} 
                envMapIntensity={2}
            />
        </mesh>
        
        {/* Outer Gold Wireframe (The "Structure") */}
        <mesh ref={shellRef} scale={2.3}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial 
                color="#d4af37"
                wireframe
                transparent
                opacity={0.1}
                metalness={1}
                roughness={0}
                emissive="#d4af37"
                emissiveIntensity={0.05}
            />
        </mesh>
      </Float>
    </group>
  );
}

function LoadingSpinner() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#d4af37" wireframe />
        </mesh>
    )
}

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <style>{`
        .gold-text-shimmer {
            background: linear-gradient(
                to right,
                #bf953f 20%,
                #fcf6ba 40%,
                #b38728 60%,
                #fbf5b7 80%
            );
            background-size: 200% auto;
            color: #000;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 4s linear infinite;
        }
      `}</style>

      <PlusGrid />
      
      {/* Background Velocity Text */}
      <div className="absolute top-[10%] left-0 w-full opacity-[0.1] -rotate-2 pointer-events-none z-0 mix-blend-overlay">
        <VelocityScroll baseVelocity={-0.5} className="text-[15rem] md:text-[25rem] font-display font-bold text-white/20">
            GREY • MATTER • FORM • VOID •
        </VelocityScroll>
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-10 cursor-move">
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 35 }} gl={{ antialias: false }}>
            <ambientLight intensity={1} />
            
            {/* Dynamic Lighting Setup */}
            <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} intensity={3} castShadow color="#fff5db" />
            <pointLight position={[-10, -10, -10]} intensity={5} color="#d4af37" />
            <pointLight position={[0, 5, -5]} intensity={2} color="#444444" />
            
            {/* Subtle Rim Light */}
            <hemisphereLight color="#ffffff" groundColor="#000000" intensity={0.3} position={[5, 10, 2]} />
            
            <Environment preset="studio" />
            
            <Suspense fallback={<LoadingSpinner />}>
                <GeometricBackground />
                <DigitalCore />
                <FloatingDebris />
                <ArchitecturalRings />
                <Sparkles count={50} scale={10} size={1} speed={0.4} opacity={0.4} color="#d4af37" />
            </Suspense>
            
            <EffectComposer>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.8} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </Canvas>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />

      {/* Overlay Text */}
      <motion.div 
        style={{ opacity, y: y2 }}
        className="relative z-20 text-center flex flex-col items-center pointer-events-none p-4 w-full h-full justify-center"
      >
        <div className="absolute top-[12%] md:top-[15%]">
            <TextReveal className="text-amber-500 font-mono text-sm md:text-base uppercase tracking-[0.5em] drop-shadow-md">
                The Space Between Code & Art
            </TextReveal>
        </div>

        <motion.h1 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[23vw] leading-none font-display font-bold tracking-tighter text-white select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-30"
        >
            GREY
        </motion.h1>

        <div className="mt-6 md:mt-10 z-30">
             <div className="gold-text-shimmer font-display text-2xl md:text-5xl uppercase tracking-[0.3em] font-light drop-shadow-2xl">
                Luxury Digital Agency
            </div>
        </div>
      </motion.div>

      <div className="absolute bottom-12 right-12 z-30 hidden md:block">
          <TechBadge />
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Scroll to Explore</span>
        <motion.div 
          className="w-[1px] h-16 bg-gradient-to-b from-amber-500 via-white to-transparent"
          animate={{ scaleY: [0, 1, 0], transformOrigin: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default Hero;
