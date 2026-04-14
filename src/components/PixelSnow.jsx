import { useEffect, useRef } from 'react'
import './PixelSnow.css'

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

export default function PixelSnow({ className = '' }) {
  const canvasRef = useRef(null)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let flakes = []
    let sectionEl = null
    let visible = true

    const getSize = () => ({
      w: canvas.clientWidth || 1,
      h: canvas.clientHeight || 1,
    })

    const initFlakes = (w, h) => {
      const area = w * h
      /* 方块更大、略少一点，避免糊成一片 */
      const count = clamp(Math.floor(area / 10400), 100, 360)
      flakes = []
      for (let i = 0; i < count; i++) {
        const r = Math.random()
        const s = r > 0.88 ? 5 : r > 0.62 ? 4 : r > 0.28 ? 3 : 2
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s,
          vy: 0.35 + Math.random() * 1.65,
          vx: (Math.random() - 0.5) * 0.35,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: 0.018 + Math.random() * 0.038,
          o: 0.38 + Math.random() * 0.48,
        })
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { w, h } = getSize()
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
      initFlakes(w, h)
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
        { root: null, threshold: 0, rootMargin: '80px 0px 80px 0px' }
      )
    if (sectionEl) io.observe(sectionEl)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      reduceMotionRef.current = mq.matches
    }
    onMq()
    mq.addEventListener('change', onMq)

    let t0 = performance.now()

    const frame = (t) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return

      const reduce = reduceMotionRef.current
      const { w, h } = getSize()
      if (w < 2 || h < 2) return

      const dt = reduce ? 0 : Math.min(0.05, (t - t0) / 1000)
      t0 = t
      const scale = dt * 60

      ctx.clearRect(0, 0, w, h)

      for (const f of flakes) {
        if (!reduce) {
          f.sway += f.swaySpeed * scale
          f.x += (f.vx + Math.sin(f.sway) * 0.22) * scale
          f.y += f.vy * scale
        }

        if (f.y > h + f.s) {
          f.y = -f.s - Math.random() * 60
          f.x = Math.random() * w
        }
        if (f.x < -f.s) f.x = w + f.s
        if (f.x > w + f.s) f.x = -f.s

        const tw = reduce ? 1 : 0.78 + 0.22 * (0.5 + 0.5 * Math.sin(f.sway * 0.65))
        const alpha = clamp(f.o * tw, 0.22, 0.98)
        const fx = Math.floor(f.x)
        const fy = Math.floor(f.y)

        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fillRect(fx, fy, f.s, f.s)
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

  return <canvas ref={canvasRef} className={`pixel-snow-canvas ${className}`.trim()} aria-hidden />
}
