import { useState, useEffect } from 'react'
import './TypewriterLoop.css'

const DEFAULT_TIMINGS = {
  charMs: 148,
  backMs: 118,
  afterPrefix: 420,
  afterTypo: 560,
  afterBackspace: 220,
  afterFull: 1600,
  afterClear: 800,
}

/**
 * 循环打字，打完停顿后整句删掉再重来。
 * - plain：逐字打 fullText，无误字。
 * - 默认：prefix → typo → 退格 → suffix（须 prefix + suffix === fullText）。
 * - holdAfterType：打完当前完整句子后保持不动，不再整句删掉重播（适合说明性副标题）。
 */
export default function TypewriterLoop({
  fullText,
  plain = false,
  holdAfterType = false,
  prefix,
  typo,
  suffix,
  className = '',
  textClassName = '',
  timings: timingsProp,
}) {
  const [text, setText] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    const timings = { ...DEFAULT_TIMINGS, ...timingsProp }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(fullText)
      setTypingDone(true)
      return
    }

    let cancelled = false
    const wait = (ms) =>
      new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const run = async () => {
      const typeChunk = async (chunk, curRef) => {
        for (const ch of chunk) {
          if (cancelled) return
          await wait(timings.charMs)
          curRef.s += ch
          setText(curRef.s)
        }
      }
      const backspace = async (n, curRef) => {
        for (let k = 0; k < n; k += 1) {
          if (cancelled) return
          await wait(timings.backMs)
          curRef.s = curRef.s.slice(0, -1)
          setText(curRef.s)
        }
      }

      while (!cancelled) {
        const cur = { s: '' }

        if (plain) {
          await typeChunk(fullText, cur)
          if (cancelled) return
        } else {
          await typeChunk(prefix, cur)
          if (cancelled) return
          await wait(timings.afterPrefix)
          await typeChunk(typo, cur)
          if (cancelled) return
          await wait(timings.afterTypo)
          await backspace(typo.length, cur)
          if (cancelled) return
          await wait(timings.afterBackspace)
          await typeChunk(suffix, cur)
          if (cancelled) return
        }

        await wait(timings.afterFull)
        if (holdAfterType) {
          if (!cancelled) setTypingDone(true)
          return
        }
        while (cur.s.length > 0 && !cancelled) {
          await wait(timings.backMs)
          cur.s = cur.s.slice(0, -1)
          setText(cur.s)
        }
        if (cancelled) return
        await wait(timings.afterClear)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [fullText, plain, holdAfterType, prefix, typo, suffix, timingsProp])

  return (
    <p className={className.trim()} aria-label={fullText}>
      <span className={textClassName.trim()}>{text}</span>
      {!typingDone && <span className="typewriter-loop__caret" aria-hidden />}
    </p>
  )
}
