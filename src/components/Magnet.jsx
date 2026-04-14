import { useCallback, useEffect, useRef, useState } from 'react'
import './Magnet.css'

/**
 * 鼠标靠近时，子元素被「吸」向光标（磁铁效果）；离开感应区后回弹。
 */
export default function Magnet({
  children,
  className = '',
  strength = 0.42,
  maxPull = 28,
  zonePadding = 44,
}) {
  const zoneRef = useRef(null)
  const shiftRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const tick = useCallback(() => {
    const cur = currentRef.current
    const tgt = targetRef.current
    const ease = 0.2
    cur.x += (tgt.x - cur.x) * ease
    cur.y += (tgt.y - cur.y) * ease

    const el = shiftRef.current
    if (el) {
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`
    }

    const err = Math.hypot(tgt.x - cur.x, tgt.y - cur.y)
    const mag = Math.hypot(cur.x, cur.y)
    if (err > 0.35 || (mag > 0.35 && tgt.x === 0 && tgt.y === 0)) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      cur.x = tgt.x
      cur.y = tgt.y
      if (el) el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`
      rafRef.current = null
    }
  }, [])

  const scheduleTick = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const applyTarget = useCallback(
    (clientX, clientY) => {
      const zone = zoneRef.current
      if (!zone) return
      const z = zone.getBoundingClientRect()
      const zx = z.left + z.width / 2
      const zy = z.top + z.height / 2
      let tx = (clientX - zx) * strength
      let ty = (clientY - zy) * strength
      const len = Math.hypot(tx, ty)
      if (len > maxPull && len > 0) {
        tx = (tx / len) * maxPull
        ty = (ty / len) * maxPull
      }
      targetRef.current = { x: tx, y: ty }
      scheduleTick()
    },
    [maxPull, scheduleTick, strength]
  )

  const onMove = useCallback(
    (e) => {
      applyTarget(e.clientX, e.clientY)
    },
    [applyTarget]
  )

  const onLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
    scheduleTick()
  }, [scheduleTick])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (reducedMotion) {
    return <div className={`magnet magnet--static ${className}`.trim()}>{children}</div>
  }

  return (
    <div className={`magnet ${className}`.trim()}>
      <div
        ref={zoneRef}
        className="magnet__zone"
        style={{ padding: zonePadding, margin: -zonePadding }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div ref={shiftRef} className="magnet__shift">
          {children}
        </div>
      </div>
    </div>
  )
}
