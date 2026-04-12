import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('intro')
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  const triggerCelebration = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 8000)
  }

  const sections = [
    { id: 'intro', label: '🏠 首页' },
    { id: 'odoo', label: '一、Odoo 原理' },
    { id: 'ai-journey', label: '二、AI 全栈之旅' },
    { id: 'practice', label: '三、实战篇' },
    { id: 'summary', label: '四、总结与反思' },
  ]

  return (
    <div className="app">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}
      
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-logo">🦞 AI 全栈之旅</div>
        <div className="nav-links">
          {sections.map(section => (
            <button 
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 首页 */}
      <section id="intro" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">🦞 AI 全栈之旅</h1>
          <p className="hero-subtitle">从 AI 入门到深度实践的完整路径</p>
          <p className="hero-desc">本文档记录 AI 全栈之旅的实践与反思，涵盖 Odoo 原理、AI 迭代学习、实战案例及总结复盘</p>
          <button className="cta-button" onClick={triggerCelebration}>
            🚀 开始探索
          </button>
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* Odoo 原理 */}
      <section id="odoo" className="section">
        <div className="container">
          <h2 className="section-title">一、Odoo 原理</h2>
          <div className="card">
            <p>本章节讲解 Odoo 的核心架构与设计理念。</p>
            <div className="placeholder-text">（待补充 Odoo 原理内容）</div>
          </div>
        </div>
      </section>

      {/* AI 全栈之旅 */}
      <section id="ai-journey" className="section">
        <div className="container">
          <h2 className="section-title">二、AI 全栈之旅</h2>
          <p className="section-desc">本章节讲述从接触 AI 开始的完整学习路径，涵盖 AI 的迭代演进、工具衍生与应用实践。</p>
          
          <div className="card-grid">
            <div className="card highlight">
              <h3>🤖 Ai-case</h3>
              <p>AI 问答工具</p>
            </div>
          </div>

          <div className="subsection">
            <h3>2.1 AI 认知迭代</h3>
            <ul>
              <li>从初识 AI 到深度应用的心路历程</li>
              <li>AI 能力边界的不断探索</li>
              <li>从「能用」到「好用」的能力升级</li>
            </ul>
          </div>

          <div className="subsection">
            <h3>2.2 工具衍生</h3>
            <ul>
              <li>如何围绕 AI 能力构建工具链</li>
              <li>不同场景下的工具选型与组合</li>
              <li>从单一工具到生态体系的演进</li>
            </ul>
          </div>

          <div className="subsection">
            <h3>2.3 全栈应用</h3>
            <div className="card-grid">
              <div className="card">
                <h4>🦞 后端开发</h4>
                <p>代码生成、审查、优化</p>
              </div>
              <div className="card">
                <h4>🎨 前端与界面层</h4>
                <p>借助好的模型能力，增长见识</p>
              </div>
              <div className="card">
                <h4>⚙️ 运维与监控</h4>
                <p>AI 也有视觉和触觉</p>
              </div>
              <div className="card">
                <h4>📝 文档与知识管理</h4>
                <p>AI 向量搜索已达成，AI 记忆保持</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 实战篇 */}
      <section id="practice" className="section">
        <div className="container">
          <h2 className="section-title">三、实战篇</h2>
          <p className="section-desc">本章节收录各类实战案例与操作演示。</p>
          
          <div className="card">
            <h3>🦞 实战训练</h3>
            <table className="practice-table">
              <thead>
                <tr>
                  <th>案例名称</th>
                  <th>说明</th>
                  <th>链接</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>批量消息推送</td>
                  <td>飞书助手批量处理群发事务</td>
                  <td><a href="#" className="link">查看案例</a></td>
                </tr>
                <tr>
                  <td>代码排查与审查</td>
                  <td>Odoo助手代码审查自动化</td>
                  <td><a href="#" className="link">查看案例</a></td>
                </tr>
                <tr>
                  <td>队列监控告警</td>
                  <td>工时队列异常监控与处理</td>
                  <td><a href="#" className="link">查看案例</a></td>
                </tr>
                <tr>
                  <td>多群聊周报</td>
                  <td>飞书助手自动生成周报</td>
                  <td><a href="#" className="link">查看案例</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 总结与反思 */}
      <section id="summary" className="section">
        <div className="container">
          <h2 className="section-title">四、总结与反思</h2>
          
          <div className="subsection">
            <h3>4.1 AI 幻觉问题</h3>
            <p>在使用 AI 辅助开发的过程中，「AI 幻觉」是面临的核心挑战之一：</p>
            
            <div className="card-grid">
              <div className="card warning">
                <h4>1️⃣ 模型能力边界模糊</h4>
                <p>AI 对复杂业务逻辑的理解有时会出现偏差，生成代码看似合理但实际无法运行</p>
                <p className="tip">应对策略：保持批判性思维，重要代码必须人工 Review</p>
              </div>
              <div className="card warning">
                <h4>2️⃣ 代码不可控，方向无限发展</h4>
                <p>AI 生成代码时容易「跑偏」，偏离原始需求，过度工程化</p>
                <p className="tip">应对策略：明确需求边界，提供足够的上下文和约束</p>
              </div>
              <div className="card warning">
                <h4>3️⃣ 裁判又是运动员</h4>
                <p>AI 生成的代码由 AI 自己评估，缺乏独立验证</p>
                <p className="tip">应对策略：引入独立 Review 机制，人工介入关键节点</p>
              </div>
              <div className="card warning">
                <h4>4️⃣ 指令模糊，命令反复</h4>
                <p>需求描述不清晰时，AI 给出的结果差异巨大</p>
                <p className="tip">应对策略：提供具体示例，明确输入输出格式，迭代优化 prompt</p>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>4.2 核心经验</h3>
            <div className="card-grid">
              <div className="card success">
                <h4>💡 提示词工程</h4>
                <p>好的 prompt 是 AI 输出的前提，越具体越有效</p>
              </div>
              <div className="card success">
                <h4>🤝 人机协作</h4>
                <p>AI 擅长执行，人负责决策，两者配合效率最高</p>
              </div>
              <div className="card success">
                <h4>📦 Skill 沉淀</h4>
                <p>将重复流程固化为 Skill，减少每次的沟通成本</p>
              </div>
              <div className="card success">
                <h4>🎯 边界意识</h4>
                <p>知道 AI 能做什么、不能做什么，比会用 AI 更重要</p>
              </div>
              <div className="card success">
                <h4>🔄 持续迭代</h4>
                <p>AI 能力在飞速进化，保持学习和适应的心态</p>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>4.3 我的 Skill 沉淀</h3>
            <p>以下是我在实际工作中沉淀出的可复用 Skills，持续更新中：</p>
            
            <table className="practice-table">
              <thead>
                <tr>
                  <th>Skill 名称</th>
                  <th>功能描述</th>
                  <th>适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🦞 飞书助手 - 批量推送</td>
                  <td>批量处理飞书群发事务</td>
                  <td>重复通知、多群推送</td>
                </tr>
                <tr>
                  <td>🦞 飞书助手 - 文档抓取</td>
                  <td>直接读取飞书文档内容</td>
                  <td>信息确认、知识查阅</td>
                </tr>
                <tr>
                  <td>🦞 飞书助手 - 多群聊周报</td>
                  <td>自动汇总群聊关键信息生成周报</td>
                  <td>周期性汇报、问题追踪</td>
                </tr>
                <tr>
                  <td>🦞 Odoo助手 - 代码审查</td>
                  <td>自动对比历史提交与当前分支</td>
                  <td>Code Review、Bug 定位</td>
                </tr>
                <tr>
                  <td>🦞 Odoo助手 - 队列监控</td>
                  <td>实时监控工时队列异常并告警</td>
                  <td>运维监控、故障预警</td>
                </tr>
                <tr>
                  <td>🦞 Odoo助手 - 代码修改</td>
                  <td>辅助处理紧急代码修改并提交</td>
                  <td>紧急修复、加班减负</td>
                </tr>
                <tr>
                  <td>🦞 Odoo助手 - 定时任务</td>
                  <td>定时执行未完成的开发任务</td>
                  <td>下班续跑、自动化流程</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="conclusion">
            <h3>🚀 结语</h3>
            <p>AI 不是银弹，但它是最强大的杠杆。理解它的局限性、发挥它的优势，在实践中不断沉淀和反思，才能真正让 AI 成为工作中的得力助手。</p>
            
            <div className="principles">
              <div className="principle">
                <span className="principle-icon">🤝</span>
                <span>人机协作：AI 执行，人来决策</span>
              </div>
              <div className="principle">
                <span className="principle-icon">📝</span>
                <span>明确需求：清晰的指令是好的输出的前提</span>
              </div>
              <div className="principle">
                <span className="principle-icon">🔍</span>
                <span>批判验证：AI 输出不等于正确，保持质疑精神</span>
              </div>
              <div className="principle">
                <span className="principle-icon">🔄</span>
                <span>持续沉淀：把经验固化为 Skill，让效率持续增长</span>
              </div>
            </div>
            
            <p className="update-time">文档创建时间：2026-04-11 持续更新中……</p>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <p>🦞 AI 全栈之旅 - 个人实践记录</p>
      </footer>
    </div>
  )
}

export default App