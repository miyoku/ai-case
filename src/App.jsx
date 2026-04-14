import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import GridScan from './components/GridScan'
import SoftAurora from './components/SoftAurora'
import LightRays from './components/LightRays'
import BlurRevealContent from './components/BlurRevealContent'
import GlareHoverCard from './components/GlareHoverCard'
import TrainingShowcase from './components/TrainingShowcase'
import PixelSnow from './components/PixelSnow'
import ShapeGridBackground from './components/ShapeGridBackground'
import SkillsLanyard from './components/SkillsLanyard'
import TypewriterLoop from './components/TypewriterLoop'
import Magnet from './components/Magnet'
import PixelTrailArea from './components/PixelTrailArea'
import './App.css'

const HERO_SUBTITLE_TEXT = '在我的电脑上可以正常运行，你再检查一下。'

/** 前缀 + 删去错字后的后缀 === HERO_SUBTITLE_TEXT；错字为「云」误代「运」 */
const HERO_SUBTITLE_TYPE_PARTS = {
  prefix: '在我的电脑上可以正常',
  typo: '云',
  suffix: '运行，你再检查一下。',
}

function App() {
  const [activeSection, setActiveSection] = useState('intro')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showGridBackground, setShowGridBackground] = useState(true)
  const [odooBlurReplayKey, setOdooBlurReplayKey] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Odoo 区块显著进入视口时再关掉 GridScan，避免首屏仅露出少量时误判隐藏
  useEffect(() => {
    const odoo = document.getElementById('odoo')
    if (!odoo) return
    const io = new IntersectionObserver(
      ([entry]) => {
        // threshold=0 在大屏首刷容易被 1px 交叉触发；改为可见比例判断更稳定
        setShowGridBackground(entry.intersectionRatio < 0.35)
      },
      { threshold: [0, 0.35, 0.7], rootMargin: '0px' }
    )
    io.observe(odoo)
    return () => io.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      if (id === 'odoo') setShowGridBackground(false)
      if (id === 'intro') setShowGridBackground(true)
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      if (id === 'odoo') {
        window.setTimeout(() => setOdooBlurReplayKey((k) => k + 1), 520)
      }
    }
  }

  const handleStartExplore = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 8000)
    scrollToSection('odoo')
  }

  const sections = [
    { id: 'intro', label: '首页' },
    { id: 'odoo', label: '一、烛龙-odoo' },
    { id: 'ai-journey', label: '二、AI 全栈之旅' },
    { id: 'practice', label: '三、实战篇' },
    { id: 'summary', label: '四、总结与反思' },
  ]

  return (
    <div className="app">
      <div
        className={`app-background${showGridBackground ? '' : ' app-background--hidden'}`}
        aria-hidden
      >
        <GridScan
          enableWebcam={false}
          showPreview={false}
          linesColor="#4b4863"
          scanColor="#ff79f2"
          className="app-background__grid"
        />
      </div>
      <div className="app-foreground">
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
          <TypewriterLoop
            fullText={HERO_SUBTITLE_TEXT}
            prefix={HERO_SUBTITLE_TYPE_PARTS.prefix}
            typo={HERO_SUBTITLE_TYPE_PARTS.typo}
            suffix={HERO_SUBTITLE_TYPE_PARTS.suffix}
            className="hero-subtitle"
            textClassName="hero-subtitle__text"
          />
          <p className="hero-desc">AI 全栈之旅的实践与反思，涵盖烛龙-odoo、AI 迭代学习、实战案例及总结复盘</p>
          <Magnet>
            <button type="button" className="cta-button" onClick={handleStartExplore}>
              立即探索
            </button>
          </Magnet>
        </div>
      </section>

      {/* 烛龙-odoo · React Bits 极光：深底 + 左侧柔绿 + 右侧深紫 */}
      <section id="odoo" className="section section--soft-aurora section--odoo-aurora">
        <PixelTrailArea>
          <div className="section-aurora-bg" aria-hidden>
            <SoftAurora
              color1="#4a7c62"
              color2="#5b2d8f"
              speed={0.48}
              brightness={1.02}
              scale={1.55}
              enableMouseInteraction={false}
            />
          </div>
          <div className="container">
          <h2 className="section-title">一、烛龙-odoo</h2>
          <p className="section-desc section-desc--odoo">以主数据管理与流程自动化贯通全业务链路，解决数据孤岛并实现全链路流程闭环。</p>
          <div className="card">
            <BlurRevealContent replayKey={odooBlurReplayKey}>
              <div className="subsection subsection--in-card">
                <p>
                  <span className="odoo-inline-label">烛龙背景：</span>
                  烛龙是为破解数据孤岛、打通全业务链路而生的企业数字化核心驾驶舱，作为主数据管理与运营平台，
                  统一向多系统下发标准主数据，以数据与流程自动化贯通全业务链路，实现全链路流程闭环，支撑企业数字化流转。
                </p>
              </div>
              <div className="subsection subsection--in-card">
                <p>
                  <span className="odoo-inline-label">Odoo：</span>
                  <strong>Odoo</strong> 是一套用 <strong>Python</strong> 编写的全栈{' '}
                  <strong>ERP</strong>：内置 Web 框架、ORM、业务引擎与前端渲染，从后端到界面由同一套技术栈贯通。
                </p>
                <p>• 业务上，所有能力都以<strong>「模块」</strong>（Addon）形式组织与扩展——装什么模块，就有什么功能。</p>
                <p>• 架构上，可以概括成两句：<strong>数据库就是一切</strong>，数据与状态以库为准；</p>
                <p>
                  • ORM 控制一切——模型、权限、工作流与界面大量围绕 ORM 展开。搞懂模型与记录如何落库、如何被 ORM 读写，就抓住了主线。
                </p>
              </div>
            </BlurRevealContent>
          </div>
          </div>
        </PixelTrailArea>
      </section>

      {/* AI 全栈之旅 · React Bits 光线背景（与实战篇对换） */}
      <section id="ai-journey" className="section section--light-rays">
        <PixelTrailArea>
          <div className="section-lightrays-bg" aria-hidden>
            <LightRays
              className="section-lightrays-bg__canvas"
              raysOrigin="top-center"
              raysColor="#f5f5f5"
              raysSpeed={0.75}
              lightSpread={0.9}
              rayLength={2.4}
              fadeDistance={1.15}
              saturation={0.85}
              followMouse
              mouseInfluence={0.1}
              noiseAmount={0.03}
              distortion={0.04}
            />
          </div>
          <div className="container">
          <h2 className="section-title">二、AI 全栈之旅</h2>
          <p className="section-desc">从认知升级、工具沉淀到全栈落地，一条路径看清 AI 如何进入日常工作。</p>

          <div className="journey-pillars">
            <GlareHoverCard className="card journey-pillar">
              <h3>AI 认知迭代</h3>
              <p>
                从初识到深度使用，持续试探模型能力边界，把输出从「能用」打磨到「好用」，形成稳定的心智与预期。
              </p>
              <p>• 对话流</p>
              <p>• IDE</p>
              <p>• 终端集成</p>
            </GlareHoverCard>
            <GlareHoverCard className="card journey-pillar">
              <h3>工具衍生</h3>
              <p>
                围绕 AI 能力搭建工具链：按场景选型、组合插件与自动化，让单点尝试长成可复用、可协作的体系。
              </p>
              <p>
                • <a className="link" href="https://ingeek-iobd.feishu.cn/docx/F2bXdHSXpoC0A5x7apgcHLgcnEY" target="_blank" rel="noopener noreferrer">工具衍生文档</a>
              </p>
            </GlareHoverCard>
            <GlareHoverCard className="card journey-pillar">
              <h3>全栈应用</h3>
              <p>
                后端、前端、运维与文档等环节都能借力 AI：代码生成与审查、界面与体验、监控告警、向量检索与知识沉淀等。
              </p>
              <p>• 知识库沉淀</p>
              <p>• 多agent协作分工</p>
              <p>• skills</p>
            </GlareHoverCard>
          </div>
          </div>
        </PixelTrailArea>
      </section>

      <section id="practice" className="section section--particles">
        <div className="section-particles-bg" aria-hidden>
          <PixelSnow className="section-particles-bg__canvas" />
        </div>
        <div className="container">
          <h2 className="section-title">三、实战篇</h2>
          <p className="section-desc">本章节以动画导读形式呈现《实战训练》文档要点，可滚动浏览各小节。</p>

          <TrainingShowcase />
        </div>
      </section>

      {/* 总结与反思 · 形状网格背景（细格线 + 方块平滑移动高亮） */}
      <section id="summary" className="section section--shape-grid">
        <PixelTrailArea>
          <div className="section-shape-grid-bg" aria-hidden>
            <ShapeGridBackground className="section-shape-grid-bg__canvas" />
          </div>
          <div className="container">
          <h2 className="section-title">四、总结与反思</h2>
          
          <div className="subsection">
            <p className="section-desc">在使用 AI 辅助开发的过程中，「AI 幻觉」是面临的核心挑战之一：</p>
            
            <div className="summary-hallucination-grid">
              <div className="card summary-hallucination-card">
                <h4>模型能力（是否越贵越聪明）</h4>
                <p>AI 对复杂业务逻辑和特定技术栈的理解有时会出现偏差，生成代码看似合理但实际无法运行</p>
                <p className="tip">应对策略：沉淀模型能力，形成自己的知识库</p>
              </div>
              <div className="card summary-hallucination-card">
                <h4>代码不可控，方向无限发展（看不懂代码）</h4>
                <p>AI 生成代码时容易「跑偏」，偏离原始需求，过度工程化</p>
                <p className="tip">应对策略：明确需求边界，人工 Review 代码</p>
              </div>
              <div className="card summary-hallucination-card">
                <h4>裁判又是运动员（过分自我）</h4>
                <p>AI 生成的代码由 AI 自己评估，缺乏独立验证</p>
                <p className="tip">应对策略：引入独立 Review 机制，保持批判性思维</p>
              </div>
              <div className="card summary-hallucination-card">
                <h4>指令模糊，命令反复（想一出是一出）</h4>
                <p>需求描述不清晰时，AI 给出的结果差异巨大</p>
                <p className="tip">应对策略：提供具体示例文档，明确输入输出格式，迭代优化 prompt</p>
              </div>
            </div>
          </div>

          <div className="subsection">
            <SkillsLanyard />
          </div>

          <div className="conclusion">
            <h3>结语</h3>
            <p>AI 不是银弹，但它是最强大的杠杆。理解它的局限性、发挥它的优势，在实践中不断沉淀和反思，才能真正让 AI 成为工作中的得力助手。</p>
            
            <div className="principles">
              <div className="principle">
                <span>人机协作：AI 执行，人来决策</span>
              </div>
              <div className="principle">
                <span>明确需求：清晰的指令是好的输出的前提</span>
              </div>
              <div className="principle">
                <span>批判验证：AI 输出不等于正确，保持质疑精神</span>
              </div>
              <div className="principle">
                <span>持续沉淀：把经验固化为 Skill，让效率持续增长</span>
              </div>
            </div>
            
            <p className="update-time">文档创建时间：2026-04-11 持续更新中……</p>
          </div>
        </div>
        </PixelTrailArea>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <p>🦞 AI 全栈之旅 - 个人实践记录</p>
      </footer>
      </div>
    </div>
  )
}

export default App