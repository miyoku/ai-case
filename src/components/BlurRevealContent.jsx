import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import './BlurRevealContent.css'

export default function BlurRevealContent({
  children,
  className,
  rootMargin = '0px 0px -8% 0px',
  /** 递增时重新播放模糊渐入（如导航点击跳转到本块） */
  replayKey = 0,
}) {
  const rootRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  useEffect(() => {
    if (!replayKey) return
    setActive(false)
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setActive(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (typeof raf2 === 'number') cancelAnimationFrame(raf2)
    }
  }, [replayKey])

  return (
    <div
      ref={rootRef}
      className={clsx('blur-reveal-content', active && 'blur-reveal-content--active', className)}
    >
      {children}
    </div>
  )
}
