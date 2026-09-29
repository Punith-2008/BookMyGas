import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { CylinderLook } from '../../data/cylinders'

interface VariantSpec {
  color: string
  height: number
  radius: number
  label: string
  textColor: string
  /** Overall scale so tall cylinders still fit the frame. */
  scale: number
}

const SPECS: Record<CylinderLook, VariantSpec> = {
  domestic14: { color: '#D7261E', height: 2.2, radius: 1, label: 'LPG · 14.2 kg', textColor: '#0B1F3A', scale: 1 },
  xtralite10: { color: '#F59E0B', height: 1.8, radius: 0.9, label: 'Xtralite · 10 kg', textColor: '#0B1F3A', scale: 1 },
  ftl5: { color: '#C9D1DB', height: 1.3, radius: 0.8, label: 'FTL · 5 kg', textColor: '#0B1F3A', scale: 1 },
  commercial19: { color: '#1F4FA3', height: 2.6, radius: 1, label: 'LPG · 19 kg', textColor: '#0B1F3A', scale: 0.95 },
  commercial47: { color: '#1F4FA3', height: 3, radius: 1.2, label: 'LPG · 47.5 kg', textColor: '#0B1F3A', scale: 0.8 },
  commercial425: { color: '#1F4FA3', height: 3.4, radius: 1.5, label: 'LPG · 425 kg', textColor: '#0B1F3A', scale: 0.68 },
}

/** Lathe profile for an LPG cylinder body: flat base, straight wall, domed shoulder. */
function bodyProfile(h: number, r: number) {
  const pts: THREE.Vector2[] = []
  const half = h / 2
  pts.push(new THREE.Vector2(0, -half))
  pts.push(new THREE.Vector2(r * 0.92, -half))
  pts.push(new THREE.Vector2(r, -half + 0.08))
  pts.push(new THREE.Vector2(r, half - 0.35))
  const shoulder = 14
  for (let i = 1; i <= shoulder; i++) {
    const t = i / shoulder
    const a = (t * Math.PI) / 2
    pts.push(new THREE.Vector2(r * Math.cos(a) * (1 - t * 0.62) + r * 0.3 * t * t, half - 0.35 + Math.sin(a) * 0.55))
  }
  pts.push(new THREE.Vector2(0, half + 0.22))
  return pts
}

function makeLabelTexture(label: string, textColor: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // Repeat twice so the label reads from any angle.
  for (const offset of [0, 1024]) {
    const cx = offset + 512
    // flame icon
    ctx.fillStyle = '#FF6B1A'
    ctx.beginPath()
    ctx.moveTo(cx - 330, 40)
    ctx.bezierCurveTo(cx - 280, 100, cx - 270, 130, cx - 270, 160)
    ctx.arc(cx - 330, 160, 60, 0, Math.PI, false)
    ctx.bezierCurveTo(cx - 390, 130, cx - 380, 100, cx - 330, 40)
    ctx.fill()
    ctx.fillStyle = textColor
    ctx.font = '800 92px Poppins, Arial, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, cx - 230, 110)
    ctx.fillStyle = '#FF6B1A'
    ctx.font = '700 54px Inter, Arial, sans-serif'
    ctx.fillText('BookMyGas', cx - 228, 196)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function CylinderModel({ variant }: { variant: CylinderLook }) {
  const spec = SPECS[variant]
  const group = useRef<THREE.Group>(null)
  const bodyMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const flame = useRef<THREE.Mesh>(null)
  const targetColor = useMemo(() => new THREE.Color(spec.color), [spec.color])

  const bodyGeo = useMemo(() => new THREE.LatheGeometry(bodyProfile(spec.height, spec.radius), 96), [spec.height, spec.radius])
  const labelTex = useMemo(() => makeLabelTexture(spec.label, spec.textColor), [spec.label, spec.textColor])
  useEffect(() => () => labelTex.dispose(), [labelTex])
  useEffect(() => () => bodyGeo.dispose(), [bodyGeo])

  useFrame((state, delta) => {
    if (bodyMat.current) bodyMat.current.color.lerp(targetColor, Math.min(1, delta * 6))
    if (group.current) {
      const s = THREE.MathUtils.lerp(group.current.scale.x, spec.scale, Math.min(1, delta * 5))
      group.current.scale.setScalar(s)
    }
    if (flame.current) {
      const t = state.clock.elapsedTime
      flame.current.scale.set(1 + Math.sin(t * 9) * 0.06, 1 + Math.sin(t * 13) * 0.14, 1 + Math.cos(t * 9) * 0.06)
    }
  })

  // "Pop" when the variant changes.
  useEffect(() => {
    group.current?.scale.setScalar(spec.scale * 0.82)
  }, [variant])

  const half = spec.height / 2
  const topY = half + 0.22
  const labelH = spec.height * 0.28

  return (
    <group ref={group}>
      {/* body */}
      <mesh geometry={bodyGeo} castShadow>
        <meshPhysicalMaterial ref={bodyMat} color={spec.color} clearcoat={1} clearcoatRoughness={0.15} roughness={0.35} metalness={0.25} />
      </mesh>
      {/* wrap-around label */}
      <mesh position={[0, -half * 0.05, 0]}>
        <cylinderGeometry args={[spec.radius + 0.004, spec.radius + 0.004, labelH, 96, 1, true]} />
        <meshStandardMaterial map={labelTex} roughness={0.5} />
      </mesh>
      {/* foot ring */}
      <mesh position={[0, -half - 0.12, 0]}>
        <cylinderGeometry args={[spec.radius * 0.88, spec.radius * 0.9, 0.26, 64, 1, true]} />
        <meshStandardMaterial color="#2B2F36" roughness={0.6} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* guard ring (shroud) */}
      <mesh position={[0, topY + 0.18, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.46, 48, 1, true]} />
        <meshPhysicalMaterial color={spec.color} clearcoat={1} roughness={0.35} metalness={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, topY + 0.41, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.035, 12, 48]} />
        <meshPhysicalMaterial color={spec.color} clearcoat={1} roughness={0.3} />
      </mesh>
      {/* brass valve */}
      <mesh position={[0, topY + 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.28, 32]} />
        <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, topY + 0.28, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.08, 32]} />
        <meshStandardMaterial color="#5B6270" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* stylised flame above the valve */}
      <mesh ref={flame} position={[0, topY + 0.72, 0]}>
        <coneGeometry args={[0.13, 0.42, 24]} />
        <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={2.2} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, topY + 0.6, 0.3]} color="#FF8A4C" intensity={3} distance={2.5} />
    </group>
  )
}

export default function Cylinder3DScene({ variant, interactive }: { variant: CylinderLook; interactive: boolean }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.8, 6.2], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      {/* Local light-formers instead of an HDR preset so the scene works offline. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} position={[-4, 1, 2]} rotation-y={Math.PI / 3} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#FFB380" position={[4, 0, 1]} rotation-y={-Math.PI / 3} scale={[3, 6, 1]} />
      </Environment>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
        <CylinderModel variant={variant} />
      </Float>
      <ContactShadows position={[0, -1.75, 0]} opacity={0.35} scale={6} blur={2.6} far={3} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={interactive}
        autoRotate
        autoRotateSpeed={1.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  )
}
