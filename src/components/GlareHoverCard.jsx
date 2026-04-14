import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import './GlareHoverCard.css'

export default function GlareHoverCard({ children, className, replayKey = 0 }) {
  const rootRef = useRef(null)
  const [entered, setEntered] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!replayKey) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    setEntered(false)
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (typeof raf2 === 'number') cancelAnimationFrame(raf2)
    }
  }, [replayKey])

  const onMove = useCallback((e) => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--glare-x', `${x}%`)
    el.style.setProperty('--glare-y', `${y}%`)
  }, [])

  const onLeave = useCallback(() => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty('--glare-x', '50%')
    el.style.setProperty('--glare-y', '50%')
  }, [])

  return (
    <div
      ref={rootRef}
      className={clsx('glare-hover-card', entered && 'glare-hover-card--entered', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="glare-hover-card__shine" aria-hidden />
      <div className="glare-hover-card__inner">{children}</div>
    </div>
  )
}
