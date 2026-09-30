import { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

import type { CylinderLook } from '../../data/cylinders'

const RED = '#E3261D'
const BLUE = '#1E4FC2'
const R = 1
/** Height of each end dome; the straight wall's half-length varies by cylinder. */
const DOME = 0.4
const POST_ANGLES = [30, 90, 150, 210, 270, 330].map((d) => (d * Math.PI) / 180)

interface Spec {
  color: string
  /** Half-length of the straight wall: sets how tall the cylinder is. */
  wall: number
  /** Overall size relative to the 14.2 kg cylinder (before fitting to the frame). */
  size: number
  lines: [string, string]
}

const SPECS: Record<CylinderLook, Spec> = {
  domestic14: { color: RED, wall: 0.8, size: 1, lines: ['LPG 14.2 KG', 'Indane'] },
  xtralite10: { color: BLUE, wall: 0.55, size: 0.95, lines: ['LPG 10 KG', 'Xtralite'] },
  ftl5: { color: RED, wall: 0.3, size: 0.8, lines: ['LPG 5 KG', 'Indane'] },
  commercial19: { color: BLUE, wall: 1.15, size: 1, lines: ['LPG 19 KG', 'Indane'] },
  commercial47: { color: BLUE, wall: 1.7, size: 1.15, lines: ['LPG 47.5 KG', 'Indane'] },
  commercial425: { color: BLUE, wall: 1.5, size: 1.5, lines: ['LPG 425 KG', 'Indane'] },
}

/** Capsule-shaped body: domed bottom, straight wall, domed top (lathe profile). */
function bodyProfile(wall: number) {
  const pts: THREE.Vector2[] = []
  const steps = 20
  for (let i = 0; i <= steps; i++) {
    const a = -Math.PI / 2 + (i / steps) * (Math.PI / 2)
    pts.push(new THREE.Vector2(R * Math.cos(a) + 1e-4, -wall + DOME * Math.sin(a)))
  }
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * (Math.PI / 2)
    pts.push(new THREE.Vector2(R * Math.cos(a) + 1e-4, wall + DOME * Math.sin(a)))
  }
  return pts
}

/** Dome height at a given radius, so parts can sit on the shoulder. */
const shoulderY = (wall: number, r: number) => wall + DOME * Math.sqrt(Math.max(0, 1 - (r / R) ** 2))

const FOOT_R = 0.8
const FOOT_H = 0.4
const footTop = (wall: number) => -wall - DOME * Math.sqrt(1 - FOOT_R ** 2) + 0.04

const PX_PER_UNIT = 2048 / (2 * Math.PI * R)
const labelHeight = (wall: number) => Math.min(1.5, 2 * wall + 0.25)

/** White print (e.g. "LPG 14.2 KG / Indane"), drawn on the front (u = 0, wrapping the seam) and the back (u = 0.5). */
function drawLabel(canvas: HTMLCanvasElement, [small, big]: [string, string]) {
  const ctx = canvas.getContext('2d')!
  const k = Math.min(1, canvas.height / (1.5 * PX_PER_UNIT))
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const y1 = canvas.height * 0.12 + 35 * k
  for (const x of [0, canvas.width / 2, canvas.width]) {
    ctx.font = `700 ${70 * k}px Poppins, Arial, sans-serif`
    ctx.fillText(small, x, y1)
    ctx.font = `800 ${150 * k}px Poppins, Arial, sans-serif`
    ctx.fillText(big, x, y1 + 150 * k)
  }
}

function useLabelTexture(lines: [string, string], height: number) {
  const [small, big] = lines
  const tex = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = Math.round(height * PX_PER_UNIT)
    drawLabel(canvas, [small, big])
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [small, big, height])
  useEffect(() => {
    // Redraw once web fonts are ready so the print uses Poppins, not the fallback.
    let live = true
    document.fonts?.ready.then(() => {
      if (!live) return
      drawLabel(tex.image as HTMLCanvasElement, [small, big])
      tex.needsUpdate = true
    })
    return () => {
      live = false
      tex.dispose()
    }
  }, [tex, small, big])
  return tex
}

/** Alpha map punching a row of round holes through the foot ring. */
function useFootHoles() {
  const tex = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 1024, 128)
    ctx.fillStyle = '#000000'
    // The ring is ~5 units round but only 0.4 tall, so stretch holes vertically to keep them round on the mesh.
    const pxX = 1024 / (2 * Math.PI * FOOT_R)
    const pxY = 128 / FOOT_H
    for (let i = 0; i < 12; i++) {
      ctx.beginPath()
      ctx.ellipse(((i + 0.5) * 1024) / 12, 58, 0.045 * pxX, 0.045 * pxY, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    return new THREE.CanvasTexture(canvas)
  }, [])
  useEffect(() => () => tex.dispose(), [tex])
  return tex
}

function Paint({ color, side = THREE.FrontSide, alphaMap }: { color: string; side?: THREE.Side; alphaMap?: THREE.Texture }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.28}
      metalness={0.1}
      clearcoat={1}
      clearcoatRoughness={0.08}
      side={side}
      {...(alphaMap ? { alphaMap, alphaTest: 0.5 } : {})}
    />
  )
}

/** Floor the cylinder stands on (matches the contact shadow) and the tallest it may be drawn. */
const FLOOR_Y = -1.77
const MAX_HEIGHT = 3.6

function IndaneCylinder({ look }: { look: CylinderLook }) {
  const spec = SPECS[look]
  const { wall } = spec
  const bodyGeo = useMemo(() => new THREE.LatheGeometry(bodyProfile(wall), 128), [wall])
  useEffect(() => () => bodyGeo.dispose(), [bodyGeo])
  const labelH = labelHeight(wall)
  const label = useLabelTexture(spec.lines, labelH)
  const holes = useFootHoles()

  const TOP = wall + DOME
  const FOOT_TOP = footTop(wall)
  const ringR = 0.8
  const ringY = TOP + 0.62
  const postR = 0.74
  const postBase = shoulderY(wall, postR) - 0.05

  // Stand every cylinder on the same floor, shrinking tall ones to fit the frame.
  const bottom = FOOT_TOP - FOOT_H - 0.04
  const height = ringY + 0.08 - bottom
  const scale = Math.min(spec.size, MAX_HEIGHT / height)

  return (
    <group position={[0, FLOOR_Y - bottom * scale, 0]} scale={scale}>
      {/* body */}
      <mesh geometry={bodyGeo}>
        <Paint color={spec.color} />
      </mesh>
      {/* weld seam */}
      <mesh position={[0, -wall * 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R + 0.004, 0.018, 12, 128]} />
        <Paint color={spec.color} />
      </mesh>
      {/* printed label */}
      <mesh position={[0, wall + 0.25 - labelH / 2, 0]}>
        <cylinderGeometry args={[R + 0.006, R + 0.006, labelH, 128, 1, true]} />
        <meshBasicMaterial map={label} transparent depthWrite={false} toneMapped={false} />
      </mesh>

      {/* foot ring with holes and a rolled bottom lip */}
      <mesh position={[0, FOOT_TOP - FOOT_H / 2, 0]}>
        <cylinderGeometry args={[FOOT_R, FOOT_R + 0.02, FOOT_H, 96, 1, true]} />
        <Paint color={spec.color} side={THREE.DoubleSide} alphaMap={holes} />
      </mesh>
      <mesh position={[0, FOOT_TOP - FOOT_H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[FOOT_R + 0.02, 0.04, 12, 96]} />
        <Paint color={spec.color} />
      </mesh>

      {/* guard: posts on the shoulder carrying the top ring */}
      {POST_ANGLES.map((a) => {
        const h = ringY - postBase
        return (
          <RoundedBox
            key={a}
            args={[0.16, h, 0.1]}
            radius={0.035}
            position={[postR * Math.sin(a), postBase + h / 2, postR * Math.cos(a)]}
            rotation={[0, a, 0]}
          >
            <Paint color={spec.color} />
          </RoundedBox>
        )
      })}
      <mesh position={[0, ringY, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.75]}>
        <torusGeometry args={[ringR, 0.1, 20, 96]} />
        <Paint color={spec.color} />
      </mesh>

      {/* neck and valve */}
      <mesh position={[0, TOP + 0.04, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.14, 48]} />
        <Paint color={spec.color} />
      </mesh>
      <mesh position={[0, TOP + 0.18, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.16, 6]} />
        <meshStandardMaterial color="#C99A2E" metalness={0.95} roughness={0.25} />
      </mesh>
      <mesh position={[0, TOP + 0.33, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.16, 32]} />
        <meshStandardMaterial color="#D8DCE2" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, TOP + 0.42, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 32]} />
        <meshStandardMaterial color="#B9BEC6" metalness={0.95} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function IndaneCylinderScene({ look = 'domestic14' }: { look?: CylinderLook }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.9, 8.4], fov: 32 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#FFD2B8" />
      {/* Local light-formers instead of an HDR preset so the scene works offline. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-4, 1, 2]} rotation-y={Math.PI / 3} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#FFB380" position={[4, 0, 1]} rotation-y={-Math.PI / 3} scale={[3, 6, 1]} />
      </Environment>
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.4}>
        <IndaneCylinder look={look} />
      </Float>
      <ContactShadows position={[0, -1.78, 0]} opacity={0.4} scale={6} blur={2.4} far={3} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  )
}
