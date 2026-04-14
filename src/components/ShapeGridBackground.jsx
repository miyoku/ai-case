import { useEffect, useRef } from 'react'
import './ShapeGridBackground.css'

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

export default function ShapeGridBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const reduceRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let sectionEl = null
    let visible = true
    const cell = 52
    const lineRgb = '72, 72, 88'
    const lineAlpha = 0.12
    const glowRgb = '110, 108, 128'

    const squares = [
      { ox: 0.31, oy: 0.42, sx: 0.11, sy: 0.09, px: 1.7, py: 2.1, a: 0.11 },
      { ox: 0.62, oy: 0.55, sx: 0.13, sy: 0.12, px: 2.2, py: 1.8, a: 0.08 },
      { ox: 0.48, oy: 0.28, sx: 0.1, sy: 0.11, px: 1.5, py: 2.4, a: 0.07 },
    ]

    const getSize = () => ({
      w: canvas.clientWidth || 1,
      h: canvas.clientHeight || 1,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { w, h } = getSize()
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    sectionEl = canvas.closest('section')
    const io =
      sectionEl &&
      new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting
        },
        { threshold: 0, rootMargin: '60px 0px' }
      )
    if (sectionEl) io.observe(sectionEl)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      reduceRef.current = mq.matches
    }
    onMq()
    mq.addEventListener('change', onMq)

    let t0 = performance.now()

    const drawGrid = (w, h) => {
      ctx.strokeStyle = `rgba(${lineRgb}, ${lineAlpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= w; x += cell) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
      }
      for (let y = 0; y <= h; y += cell) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
      }
      ctx.stroke()
    }

    const frame = (t) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return

      const reduce = reduceRef.current
      const { w, h } = getSize()
      if (w < 4 || h < 4) return

      const dt = reduce ? 0 : Math.min(0.033, (t - t0) / 1000)
      t0 = t
      const time = t * 0.001

      ctx.clearRect(0, 0, w, h)
      drawGrid(w, h)

      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)

      for (const s of squares) {
        const u =
          s.ox * cols +
          Math.sin(time * s.px + s.oy * 6) * s.sx * cols * 0.5 +
          Math.sin(time * 0.35 + s.ox * 4) * 1.2
        const v =
          s.oy * rows +
          Math.cos(time * s.py + s.ox * 5) * s.sy * rows * 0.5 +
          Math.cos(time * 0.42 + s.oy * 3) * 1.0

        const gx = clamp(u, 0.5, cols - 1.5)
        const gy = clamp(v, 0.5, rows - 1.5)

        const px = gx * cell
        const py = gy * cell
        const fade = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(time * 1.4 + s.ox * 10))
        const baseA = reduce ? s.a * 0.6 : s.a * fade

        const g = ctx.createRadialGradient(
          px + cell * 0.5,
          py + cell * 0.5,
          0,
          px + cell * 0.5,
          py + cell * 0.5,
          cell * 1.35
        )
        g.addColorStop(0, `rgba(${glowRgb}, ${baseA * 1.8})`)
        g.addColorStop(0.45, `rgba(${glowRgb}, ${baseA * 0.45})`)
        g.addColorStop(1, `rgba(${glowRgb}, 0)`)
        ctx.fillStyle = g
        ctx.fillRect(px - cell * 0.35, py - cell * 0.35, cell * 1.7, cell * 1.7)

        ctx.fillStyle = `rgba(200, 200, 215, ${baseA * 0.82})`
        ctx.fillRect(Math.floor(px) + 1, Math.floor(py) + 1, cell - 2, cell - 2)
      }
    }

    resize()
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io?.disconnect()
      mq.removeEventListener('change', onMq)
    }
  }, [])

  return <canvas ref={canvasRef} className={`shape-grid-canvas ${className}`.trim()} aria-hidden />
}
