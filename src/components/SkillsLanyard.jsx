import ShineText from './ShineText'
import './SkillsLanyard.css'

const SKILLS_INTRO_FULL = '这是我在实际工作中沉淀出的可复用 Skills，持续更新中...'

const SKILLS = [
  { name: '飞书助手 - 批量推送', scene: '重复通知、多群推送' },
  { name: '飞书助手 - 文档抓取', scene: '信息确认、知识查阅' },
  { name: '飞书助手 - 多群聊周报', scene: '周期性汇报、问题追踪' },
  { name: 'Odoo助手 - 代码审查', scene: 'Code Review、Bug 定位' },
  { name: 'Odoo助手 - 队列监控', scene: '运维监控、故障预警' },
  { name: 'Odoo助手 - 代码修改', scene: '紧急修复、加班减负' },
  { name: 'Odoo助手 - 定时任务', scene: '下班续跑、自动化流程' },
]

export default function SkillsLanyard() {
  return (
    <div className="skills-lanyard skills-lanyard--single">
      <aside className="skills-lanyard__intro" aria-label="Skills 说明">
        <ShineText text={SKILLS_INTRO_FULL} className="skills-lanyard__intro-text" />
      </aside>

      <div className="skills-lanyard__mast">
        <div className="skills-lanyard__rail" aria-hidden />
        <div className="skills-lanyard__swing">
          <div className="skills-lanyard__strap" aria-hidden />
          <div className="skills-lanyard__clip" aria-hidden />
          <div className="skills-lanyard__tag">
            <div className="skills-lanyard__tag-label">Skills</div>
            {SKILLS.map((item) => (
              <div key={item.name} className="skills-lanyard__skill-block">
                <span className="skills-lanyard__skill-title">{item.name}</span>
                <span className="skills-lanyard__skill-scene">
                  <strong>适用场景：</strong>
                  {item.scene}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
