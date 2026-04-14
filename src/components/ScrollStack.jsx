import './ScrollStack.css'

const ITEMS = [
  {
    title: '提示词工程',
    text: '好的 prompt 是 AI 输出的前提，越具体越有效。',
  },
  {
    title: 'Skill 沉淀',
    text: '将重复流程固化为 Skill，减少每次的沟通成本。',
  },
  {
    title: '人机协作',
    text: 'AI 擅长执行，人负责决策，两者配合效率最高。',
  },
  {
    title: '边界意识',
    text: '知道 AI 能做什么、不能做什么，比会用 AI 更重要。',
  },
  {
    title: '持续迭代',
    text: 'AI 能力在飞速进化，保持学习和适应的心态。',
  },
]

export default function ScrollStack() {
  return (
    <div className="scroll-stack">
      {ITEMS.map((item) => (
        <article key={item.title} className="scroll-stack__card">
          <h4 className="scroll-stack__title">{item.title}</h4>
          <p className="scroll-stack__text">{item.text}</p>
        </article>
      ))}
    </div>
  )
}
