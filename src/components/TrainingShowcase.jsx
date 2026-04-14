import { useEffect, useRef } from 'react'
import './TrainingShowcase.css'

const CHAPTER_ANCHORS = [
  { id: 'training-ch-1', label: 'ai差异化' },
  { id: 'training-ch-2', label: '飞书助手' },
  { id: 'training-ch-3', label: 'Odoo助手' },
  { id: 'training-ch-4', label: '总结' },
]

export default function TrainingShowcase() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const chapters = root.querySelectorAll('.training-chapter')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )
    chapters.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollToChapter = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="training-showcase" className="training-showcase" ref={rootRef}>
      <div className="training-showcase__mesh" aria-hidden />
      <div className="training-showcase__grid" aria-hidden />
      <div className="training-showcase__inner">
        <header className="training-showcase__hero">
          <div className="training-showcase__hero-actions">
            <a
              className="training-showcase__badge"
              href="https://ingeek-iobd.feishu.cn/wiki/JsH2wN9vAi5oi7kMrkccQ2MRn9d"
              target="_blank"
              rel="noopener noreferrer"
            >
              动画导读 · 打开云文档
            </a>
          </div>
          <p className="training-showcase__lead">
            本文档沉淀飞书助手与 Odoo 助手在日常工作中的应用实践，涵盖消息处理、代码开发、监控告警等多个场景，帮助提升团队协作效率。
          </p>
          <nav className="training-jump" aria-label="章节快速跳转">
            {CHAPTER_ANCHORS.map((a) => (
              <button
                key={a.id}
                type="button"
                className="training-jump__btn"
                onClick={() => scrollToChapter(a.id)}
              >
                {a.label}
              </button>
            ))}
          </nav>
        </header>

        <article id="training-ch-1" className="training-chapter">
          <div className="training-chapter__head">
            <div className="training-chapter__icon" aria-hidden>
              ⚖️
            </div>
            <div>
              <h4 className="training-chapter__title">一、AI 差异化能力培养</h4>
              <p className="training-chapter__subtitle">
                核心理念：飞书助手和 Odoo 助手擅长不同的技能，针对性地培养可以事半功倍。
              </p>
            </div>
          </div>
          <div className="training-pill-row">
            <span className="training-pill training-pill--feishu">飞书 · 协作与信息</span>
            <span className="training-pill training-pill--odoo">Odoo · 代码与运维</span>
          </div>
          <div className="training-table-wrap">
            <table className="training-table">
              <thead>
                <tr>
                  <th>助手</th>
                  <th>擅长领域</th>
                  <th>应用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🦞 飞书助手</td>
                  <td>消息处理、群聊管理、文档操作</td>
                  <td>批量推送、周报生成、聊天记录抓取</td>
                </tr>
                <tr>
                  <td>🦞 Odoo 助手</td>
                  <td>代码审查、代码修改、定时监控</td>
                  <td>Odoo 模块开发、Bug 定位、代码评估</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="training-chapter__subtitle" style={{ marginTop: '1rem' }}>
            效果：专业化分工，效率最大化，合理化 AI 消耗。
          </p>
        </article>

        <article id="training-ch-2" className="training-chapter">
          <div className="training-chapter__head">
            <div className="training-chapter__icon" aria-hidden>
              💬
            </div>
            <div>
              <h4 className="training-chapter__title">二、飞书助手</h4>
              <p className="training-chapter__subtitle">
                围绕消息、文档与群聊沉淀自动化能力，减少重复沟通与手工检索。
              </p>
            </div>
          </div>

          <section className="training-feature">
            <span className="training-feature__label">场景 1</span>
            <h4>批量消息推送</h4>
            <p>
              日常工作中需要向多个群或用户发送相同内容的通知，重复操作耗时。飞书助手批量处理飞书群发事务，一键推送至多个目标，减少重复劳动。
            </p>
          </section>

          <section className="training-feature">
            <span className="training-feature__label">场景 2</span>
            <h4>对话与文档抓取</h4>
            <p>
              <strong style={{ color: '#e2e8f0' }}>文档信息获取：</strong>
              飞书助手可以直接抓取相关文档确认信息，减轻沟通成本。
            </p>
            <ul className="training-list">
              <li>信息聚合：跨群收集关键信息</li>
              <li>周期性回顾：便于优化实际问题</li>
              <li>减少沟通成本：无需手动搜索，一键获取上下文</li>
            </ul>
            <p style={{ marginTop: '0.85rem', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.55 }}>
              <strong style={{ color: '#e2e8f0' }}>多群聊回顾 Skills：</strong>
              定期回顾多个工作群中的讨论内容，梳理业务痛点和未解决的问题；将飞书助手能力整合为自动化流程，定期生成模块周报，实现自我审查。
            </p>
            <ul className="training-list">
              <li>定时抓取：自动汇总指定群聊的关键讨论</li>
              <li>智能提炼：识别未解决的问题和关键进展</li>
              <li>格式生成：输出结构化的周报内容</li>
            </ul>
          </section>

          <section className="training-feature">
            <span className="training-feature__label">场景 3</span>
            <h4>接口文档书写</h4>
            <p>
              痛点：验收节点流程复杂，字段回溯难以实现，后期维护成本高。解决方案：沉淀标准化的接口文档模板，方便后期维护和交接。
            </p>
            <ul className="training-list">
              <li>接口名称和描述</li>
              <li>请求参数说明</li>
              <li>返回值格式</li>
              <li>错误码对照</li>
              <li>调用示例价值：减少沟通成本，便于问题追溯</li>
            </ul>
          </section>
        </article>

        <article id="training-ch-3" className="training-chapter">
          <div className="training-chapter__head">
            <div className="training-chapter__icon" aria-hidden>
              🛠️
            </div>
            <div>
              <h4 className="training-chapter__title">三、Odoo 助手</h4>
              <p className="training-chapter__subtitle">
                代码审查、队列监控与紧急修改闭环，把「排查 → 审查 → 报告」固化成可复用流程。
              </p>
            </div>
          </div>

          <section className="training-feature">
            <span className="training-feature__label">1 · 代码排查与审查</span>
            <h4>代码排查与审查 Skills</h4>
            <p>
              当其他同事修改了你的代码，或每次需要进行代码审查时，重复对比、排查的流程既繁琐又容易遗漏。Odoo 助手通过本地历史存储与最新变更的对比，结合代码结构理解，形成完整的「排查 → 审查 → 报告」自动化流程。
            </p>
            <div className="training-table-wrap" style={{ marginTop: '0.85rem' }}>
              <table className="training-table">
                <thead>
                  <tr>
                    <th>能力</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🔍 历史对比</td>
                    <td>自动拉取上一次提交的代码状态，与当前分支做差异对比</td>
                  </tr>
                  <tr>
                    <td>🧠 结构理解</td>
                    <td>深入了解代码结构和开发习惯，识别潜在 Bug 和逻辑差异</td>
                  </tr>
                  <tr>
                    <td>⚠️ 风险提示</td>
                    <td>标注需要重点关注的修改点，提示可能的隐形问题</td>
                  </tr>
                  <tr>
                    <td>📋 报告生成</td>
                    <td>自动整理排查结果，生成结构化的审查报告</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="training-list" style={{ marginTop: '0.75rem' }}>
              <li>时间节省：每次审查时间减少 60% 以上</li>
              <li>覆盖全面：不遗漏任何变更点，减少漏检率</li>
              <li>质量提升：提前发现潜在 Bug，提高代码质量</li>
              <li>可复用：Skills 一次沉淀，后续自动执行，无需重复配置</li>
            </ul>
            <p className="training-footnote">
              注意：AI 辅助排查不能替代人工测试，最终仍需开发者自行验证并测试发版。
            </p>
          </section>

          <section className="training-feature">
            <span className="training-feature__label">2 · 队列监控</span>
            <h4>队列监控与异常处理 Skills</h4>
            <p>
              痛点：工时队列经常发生暴涨，导致任务积压和响应延迟。Odoo 助手构建多层级监控体系。
            </p>
            <div className="training-layers">
              <div className="training-layer">
                <strong>第一层：异常监控</strong>
                <ul>
                  <li>实时检测队列长度变化</li>
                  <li>暴涨/骤降时自动告警</li>
                  <li>通知负责人及时处理</li>
                </ul>
              </div>
              <div className="training-layer">
                <strong>第二层：根因分析</strong>
                <ul>
                  <li>辅助排查积压原因</li>
                  <li>趋势分析与上下文汇总</li>
                </ul>
              </div>
              <div className="training-layer">
                <strong>第三层：自动处理</strong>
                <ul>
                  <li>授权状态重置</li>
                  <li>队列清理操作</li>
                  <li>立即处理积压任务</li>
                </ul>
              </div>
            </div>
            <p className="training-chapter__subtitle" style={{ marginTop: '0.85rem' }}>
              效果：问题发现时间从小时级缩短至分钟级，处理效率提升 3 倍以上。
            </p>
          </section>

          <section className="training-feature">
            <span className="training-feature__label">3 · 修改与定时</span>
            <h4>代码修改 Skills + 定时任务</h4>
            <p>紧急代码修改场景下，Odoo 助手辅助完成以下完整流程：</p>
            <div className="training-table-wrap" style={{ marginTop: '0.65rem' }}>
              <table className="training-table">
                <thead>
                  <tr>
                    <th>步骤</th>
                    <th>说明</th>
                    <th>执行者</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>需求处理</td>
                    <td>根据每日待办处理紧急代码修改</td>
                    <td>Odoo 助手</td>
                  </tr>
                  <tr>
                    <td>Diff 检测</td>
                    <td>检测提交内容，确保无遗漏</td>
                    <td>Odoo 助手</td>
                  </tr>
                  <tr>
                    <td>自测运行</td>
                    <td>自动执行测试用例验证</td>
                    <td>Odoo 助手</td>
                  </tr>
                  <tr>
                    <td>评估 + 提交上线</td>
                    <td>模型评估代码质量，确认无误后合并到目标分支</td>
                    <td>人工 Review</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '0.85rem', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.55 }}>
              <strong style={{ color: '#e2e8f0' }}>定时任务机制：</strong>
              对于下班前未完成的模块，设置定时任务：自动保存当前进展、定时继续处理，第二天上班直接 Review 上线。
            </p>
            <p className="training-chapter__subtitle" style={{ marginTop: '0.5rem' }}>
              效果：开发效率提升 50% 以上，减少紧急任务的加班时间。
            </p>
          </section>
        </article>

        <article id="training-ch-4" className="training-chapter">
          <div className="training-chapter__head">
            <div className="training-chapter__icon" aria-hidden>
              🚀
            </div>
            <div>
              <h4 className="training-chapter__title">总结</h4>
              <p className="training-chapter__subtitle">
                飞书助手与 Odoo 助手在日常工作中的应用实践一览。
              </p>
            </div>
          </div>
          <div className="training-table-wrap">
            <table className="training-table">
              <thead>
                <tr>
                  <th>助手</th>
                  <th>核心价值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🦞 飞书助手</td>
                  <td>消息处理、文档操作、群聊管理、周报生成</td>
                </tr>
                <tr>
                  <td>🦞 Odoo 助手</td>
                  <td>代码审查、代码修改、队列监控、定时任务</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="training-benefits">
            <div className="training-benefit">
              <span>✅</span>
              <span>效率提升：自动化处理重复任务，节省 60%+ 时间</span>
            </div>
            <div className="training-benefit">
              <span>✅</span>
              <span>质量保障：智能审查和监控，减少 Bug 和故障</span>
            </div>
            <div className="training-benefit">
              <span>✅</span>
              <span>知识沉淀：Skills 复用，构建可积累的能力库</span>
            </div>
            <div className="training-benefit">
              <span>✅</span>
              <span>协作优化：减少沟通成本，提升团队效率</span>
            </div>
          </div>
          <p className="training-meta">文档更新时间：2026-04-11 · 本站为动态展示导读</p>
        </article>
      </div>
    </div>
  )
}
