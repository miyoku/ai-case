import { useCallback, useEffect, useId, useRef } from 'react'
import './PixelTrailArea.css'

/** 与 React Bits 演示接近：网格列数、插值、拖尾点相对大小、存活时间 */
const GRID_DIVISIONS = 50
const INTERP = 5
const TRAIL_POINT_SCALE = 0.1
const MAX_AGE_MS = 520
const MAX_POINTS = 520

/** 主色（演示里 #8878c9） */
const TRAIL_RGB = '136, 120, 201'

/** Gooey：模糊 + 色阶，把离散圆块熔成粗轨迹 */
const GOOEY_BLUR = 8
const GOOEY_MATRIX = '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'

function gridLinePoints(x0, y0, x1, y1, cell) {
  const dx = x1 - x0
  const dy = y1 - y0
  const dist = Math.hypot(dx, dy)
  if (dist < 0.5) return [{ x: x0, y: y0 }]
  const steps = Math.min(48, Math.max(1, Math.ceil(dist / cell)))
  const out = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const x = Math.round((x0 + dx * t) / cell) * cell
    const y = Math.round((y0 + dy * t) / cell) * cell
    out.push({ x, y })
  }
  return out
}

function PixelTrailLayer({ hostRef }) {
  const filterId = `pt-goo-${useId().replace(/:/g, '')}`
  const canvasRef = useRef(null)
  const trailRef = useRef([])
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const smoothRef = useRef({ x: 0, y: 0, inited: false })
  const lastCellRef = useRef(null)
  const cellPxRef = useRef(16)
  const rafRef = useRef(null)
  const aliveRef = useRef(true)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })

  const pushPoints = useCallback((points) => {
    const trail = trailRef.current
    let prev = trail[trail.length - 1]
    const now = performance.now()
    for (const p of points) {
      if (prev && prev.x === p.x && prev.y === p.y) continue
      trail.push({ x: p.x, y: p.y, t: now })
      prev = trail[trail.length - 1]
      while (trail.length > MAX_POINTS) trail.shift()
    }
  }, [])

  const resize = useCallback(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = host.getBoundingClientRect()
    const w = Math.max(1, Math.floor(rect.width))
    const h = Math.max(1, Math.floor(rect.height))
    cellPxRef.current = Math.max(10, Math.floor(w / GRID_DIVISIONS))
    sizeRef.current = { w, h, dpr }
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
  }, [hostRef])

  const onPointer = useCallback(
    (e) => {
      const host = hostRef.current
      if (!host) return
      const rect = host.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < -32 || y < -32 || x > rect.width + 32 || y > rect.height + 32) return
      pointerRef.current.x = x
      pointerRef.current.y = y
      pointerRef.current.active = true
    },
    [hostRef]
  )

  const onLeave = useCallback(() => {
    pointerRef.current.active = false
    smoothRef.current.inited = false
    lastCellRef.current = null
  }, [])

  const tick = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { w, h, dpr } = sizeRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cell = cellPxRef.current
    const ptr = pointerRef.current
    const smooth = smoothRef.current
    const k = 1 / INTERP

    if (ptr.active) {
      if (!smooth.inited) {
        smooth.x = ptr.x
        smooth.y = ptr.y
        smooth.inited = true
      } else {
        smooth.x += (ptr.x - smooth.x) * k
        smooth.y += (ptr.y - smooth.y) * k
      }
      const sx = Math.round(smooth.x / cell) * cell
      const sy = Math.round(smooth.y / cell) * cell
      const last = lastCellRef.current
      if (last == null) {
        pushPoints([{ x: sx, y: sy }])
        lastCellRef.current = { x: sx, y: sy }
      } else if (last.x !== sx || last.y !== sy) {
        pushPoints(gridLinePoints(last.x, last.y, sx, sy, cell))
        lastCellRef.current = { x: sx, y: sy }
      }
    } else {
      smooth.inited = false
      lastCellRef.current = null
    }

    const now = performance.now()
    trailRef.current = trailRef.current.filter((p) => now - p.t < MAX_AGE_MS)

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const rBase = cell * (0.42 + TRAIL_POINT_SCALE * 1.35)
    const trail = trailRef.current
    for (let i = 0; i < trail.length; i += 1) {
      const p = trail[i]
      const age = now - p.t
      const fade = 1 - age / MAX_AGE_MS
      const a = Math.max(0, fade * 0.92)
      ctx.fillStyle = `rgba(${TRAIL_RGB}, ${a})`
      const cx = p.x + cell * 0.5
      const cy = p.y + cell * 0.5
      ctx.beginPath()
      ctx.arc(cx, cy, Math.max(4, rBase), 0, Math.PI * 2)
      ctx.fill()
    }

    if (aliveRef.current) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [pushPoints])

  useEffect(() => {
    aliveRef.current = true
    resize()
    const ro = new ResizeObserver(() => resize())
    if (hostRef.current) ro.observe(hostRef.current)
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      aliveRef.current = false
      ro.disconnect()
      window.removeEventListener('resize', resize)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [hostRef, resize, tick])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    host.addEventListener('pointermove', onPointer, { passive: true })
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('pointercancel', onLeave)
    return () => {
      host.removeEventListener('pointermove', onPointer)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('pointercancel', onLeave)
    }
  }, [hostRef, onPointer, onLeave])

  return (
    <>
      <svg className="section-pixel-trail-filters" aria-hidden focusable="false">
        <defs>
          <filter
            id={filterId}
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={GOOEY_BLUR} result="blur" />
            <feColorMatrix in="blur" type="matrix" values={GOOEY_MATRIX} result="goo" />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        className="section-pixel-trail-canvas"
        style={{ filter: `url(#${filterId})` }}
        aria-hidden
      />
    </>
  )
}

/**
 * 包裹区块内容：指针插值 + 网格采样 + gooey 熔合，接近 React Bits「像素轨迹」观感。
 */
export default function PixelTrailArea({ children }) {
  const hostRef = useRef(null)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="section-pixel-trail-host" ref={hostRef}>
      {children}
      {!reduced && <PixelTrailLayer hostRef={hostRef} />}
    </div>
  )
}
