'use client'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { MdBloodtype, MdOutlineWarningAmber } from 'react-icons/md'
import { FaRegQuestionCircle } from 'react-icons/fa'

const problems = [
  {
    title: 'Sugar levels stay high',
    desc: "Even after medicines, your HbA1c just doesn't come down.",
    icon: MdBloodtype,
    iconColor: '#ec1c36',
    iconBg: '#fff0f2',
    corner: { x: -340, y: -200 },
  },
  {
    title: 'Feeling tired, weak or unwell',
    desc: 'Constant fatigue, frequent urination, or blurred vision.',
    icon: TbActivityHeartbeat,
    iconColor: '#12a4dd',
    iconBg: '#e8f7fd',
    corner: { x: 340, y: -200 },
  },
  {
    title: 'Worried about complications',
    desc: 'Fear of kidney, eye, heart or foot damage from diabetes.',
    icon: MdOutlineWarningAmber,
    iconColor: '#d97706',
    iconBg: '#fffbeb',
    corner: { x: -340, y: 200 },
  },
  {
    title: 'Newly diagnosed and confused',
    desc: "Just found out you have diabetes and don't know where to start.",
    icon: FaRegQuestionCircle,
    iconColor: '#7c3aed',
    iconBg: '#f5f3ff',
    corner: { x: 340, y: 200 },
  },
]

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)) }
function norm(p, s, e)        { return clamp((p - s) / (e - s), 0, 1) }
function lerp(a, b, t)        { return a + (b - a) * t }

function phases(i) {
  const start = 0.08 + i * 0.22
  return {
    slideIn: [start,        start + 0.09],
    flyOut:  [start + 0.18, start + 0.22],
  }
}

function ProblemCard({ problem }) {
  const Icon = problem.icon
  return (
    <div className="w-[280px] lg:w-[350px] rounded-2xl bg-white border border-[#c8dde8] shadow-xl py-5 p-5">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: problem.iconBg }}
      >
        <Icon size={20} color={problem.iconColor} />
      </div>
      <h3 className="font-semibold text-[#092540] text-xl mb-1.5 leading-snug">
        {problem.title}
      </h3>
      <p className="text-lg text-[#5a7184] leading-relaxed">{problem.desc}</p>
    </div>
  )
}

export default function ProblemsSection() {
  const sectionRef       = useRef(null)
  const mobileSectionRef = useRef(null)
  const [progress, setProgress]             = useState(0)
  const [mobileProgress, setMobileProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect()
        const scrollable = height - window.innerHeight
        if (scrollable > 0) setProgress(clamp(-top / scrollable, 0, 1))
      }
      if (mobileSectionRef.current) {
        const { top, height } = mobileSectionRef.current.getBoundingClientRect()
        const scrollable = height - window.innerHeight
        if (scrollable > 0) setMobileProgress(clamp(-top / scrollable, 0, 1))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headingOpacity =
    progress < 0.04 ? norm(progress, 0, 0.04) :
    progress < 0.05 ? 1 :
    Math.max(0, 1 - norm(progress, 0.05, 0.10))
  const headingY = lerp(30, 0, norm(progress, 0, 0.04))

  const bgOpacity       = Math.sin(progress * Math.PI) * 0.6
  const mobileBgOpacity = Math.sin(mobileProgress * Math.PI) * 0.6

  return (
    <>
      {/* ── Desktop: sticky scroll theater ── */}
      <section
        ref={sectionRef}
        className="relative bg-white hidden lg:block"
        style={{ height: '700vh' }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

          {/* Static subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(180,100,220,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(180,100,220,0.035) 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px',
            }}
          />

          {/* Scroll-reactive gradient background */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              opacity: bgOpacity,
              background: 'radial-gradient(ellipse 90% 75% at 50% 50%, #EDD0F7 0%, rgba(237,208,247,0.45) 40%, rgba(244,229,249,0.15) 68%, rgba(244,229,249,0) 100%)',
            }}
          />

          {/* Section heading */}
          <div
            className="absolute top-[35%] left-1/2 z-40 text-center pointer-events-none w-full px-4"
            style={{
              opacity: headingOpacity,
              transform: `translateX(-50%) translateY(${headingY}px)`,
            }}
          >
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-3">
              Common struggles
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[48px] font-bold text-[#092540]">
              Do you relate to <br/> any of these?
            </h2>
          </div>

          {/* Animated cards */}
          {problems.map((problem, i) => {
            const { slideIn, flyOut } = phases(i)
            let x = 0, y = 300, opacity = 0, scale = 1

            if (progress >= slideIn[0] && progress < slideIn[1]) {
              const t = norm(progress, slideIn[0], slideIn[1])
              y = lerp(300, -60, t)
              opacity = t
            } else if (progress >= slideIn[1] && progress < flyOut[0]) {
              y = -60; opacity = 1
            } else if (progress >= flyOut[0] && progress < flyOut[1]) {
              const t = norm(progress, flyOut[0], flyOut[1])
              y = lerp(-60, problem.corner.y, t)
              x = lerp(0, problem.corner.x, t)
              opacity = 1
              scale = lerp(1, 0.92, t)
            } else if (progress >= flyOut[1]) {
              y = problem.corner.y; x = problem.corner.x; opacity = 1; scale = 0.92
            }

            return (
              <div
                key={i}
                className="absolute z-30"
                style={{ transform: `translate(${x}px, ${y}px) scale(${scale})`, opacity }}
              >
                <ProblemCard problem={problem} />
              </div>
            )
          })}

          {/* Glucometer */}
          <div className="relative w-[300px] sm:w-[400px] md:w-[480px] lg:w-[520px] z-20">
            <div
              className="absolute rounded"
              style={{ top: '19%', left: '15%', width: '70%', height: '45%', zIndex: 15 }}
            />
            <Image
              src="/landing-page/glucometer.png"
              alt="Glucometer"
              width={400}
              height={400}
              priority
              className="w-full h-auto relative"
              style={{ zIndex: 20 }}
            />
          </div>

        </div>
      </section>

      {/* ── Mobile: sticky scroll animation ── */}
      <section ref={mobileSectionRef} className="lg:hidden bg-white relative" style={{ height: '480vh' }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden gap-22">

          {/* Static subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(180,100,220,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(180,100,220,0.035) 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px',
            }}
          />

          {/* Scroll-reactive gradient background */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              opacity: mobileBgOpacity,
              background: 'radial-gradient(ellipse 90% 75% at 50% 50%, #EDD0F7 0%, rgba(237,208,247,0.45) 40%, rgba(244,229,249,0.15) 68%, rgba(244,229,249,0) 100%)',
            }}
          />

          {/* Heading */}
          <div className="text-center z-10 px-4">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-2">
              Common struggles
            </p>
            <h2 className="text-4xl font-bold text-[#092540]">
              Do you relate to any of these?
            </h2>
          </div>

          {/* Glucometer + overlaid cards */}
          <div className="relative w-[340px] shrink-0">
            <Image
              src="/landing-page/glucometer.png"
              alt="Glucometer"
              width={320}
              height={320}
              className="w-full h-auto relative z-0"
            />

            {problems.map((problem, i) => {
              const offset       = i * 0.22
              const fadeInStart  = 0.05 + offset
              const fadeInEnd    = 0.13 + offset
              const stayEnd      = 0.22 + offset
              const fadeOutEnd   = 0.29 + offset

              let opacity = 0, y = 32
              if (mobileProgress >= fadeInStart && mobileProgress < fadeInEnd) {
                const t = norm(mobileProgress, fadeInStart, fadeInEnd)
                opacity = t; y = lerp(32, 0, t)
              } else if (mobileProgress >= fadeInEnd && mobileProgress < stayEnd) {
                opacity = 1; y = 0
              } else if (mobileProgress >= stayEnd && mobileProgress < fadeOutEnd) {
                const t = norm(mobileProgress, stayEnd, fadeOutEnd)
                opacity = 1 - t; y = lerp(0, -44, t)
              }

              const Icon = problem.icon
              return (
                <div
                  key={i}
                  className="absolute left-1/2 z-20"
                  style={{
                    top: '18%',
                    transform: `translateX(-50%) translateY(${y}px)`,
                    opacity,
                    pointerEvents: opacity > 0.05 ? 'auto' : 'none',
                    width: 312,
                  }}
                >
                  <div className="rounded-xl bg-white border border-[#c8dde8] shadow-2xl px-5 py-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: problem.iconBg }}
                    >
                      <Icon size={20} color={problem.iconColor} />
                    </div>
                    <h3 className="font-semibold text-[#092540] text-base mb-1.5 leading-snug">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-[#5a7184] leading-relaxed">{problem.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}
