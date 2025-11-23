
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  // Mouse interaction
  vec2 mouse = uMouse * uResolution.xy / uResolution.y;
  float dist = distance(st, mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, dist);
  
  // Flowing noise
  float time = uTime * 0.2;
  float n = snoise(st * 3.0 + vec2(time));
  
  // Layered noise for complexity
  float n2 = snoise(st * 6.0 - vec2(time * 1.5));
  
  // Liquid distortion
  float finalNoise = n * 0.6 + n2 * 0.4 + mouseInfluence * 0.2;
  
  // Color palette: Black/Dark Grey -> Gold
  vec3 black = vec3(0.02, 0.02, 0.02);
  vec3 gold = vec3(0.83, 0.68, 0.21);
  vec3 deepGold = vec3(0.4, 0.3, 0.1);
  
  // Mixing
  vec3 color = mix(black, deepGold, smoothstep(-0.2, 0.6, finalNoise));
  color = mix(color, gold, smoothstep(0.7, 1.0, finalNoise));
  
  // Vignette
  float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5) * 2.0);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

const LiquidPlane = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uMouse.value.lerp(state.pointer, 0.05); // Smooth interpolation
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <LiquidPlane />
      </Canvas>
    </div>
  );
};

export default LiquidBackground;
