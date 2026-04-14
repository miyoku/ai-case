import './ShineText.css'

/**
 * 闪亮文字：金属感渐变 + 斜向扫光；左侧星饰为装饰。
 */
export default function ShineText({ text, className = '', as: Comp = 'p' }) {
  return (
    <Comp className={`shine-text ${className}`.trim()} lang="zh-CN">
      <span className="shine-text__row">
        <span className="shine-text__sparkles" aria-hidden>
          <span className="shine-text__spark shine-text__spark--a">✦</span>
          <span className="shine-text__spark shine-text__spark--b">✦</span>
          <span className="shine-text__spark shine-text__spark--c">✦</span>
        </span>
        <span className="shine-text__inner">{text}</span>
      </span>
    </Comp>
  )
}
