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
      <h3 className="font-semibold text-[#092540] text-sm mb-1.5 leading-snug">
        {problem.title}
      </h3>
      <p className="text-xs text-[#5a7184] leading-relaxed">{problem.desc}</p>
    </div>
  )
}

export default function ProblemsSection() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const { top, height } = sectionRef.current.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      if (scrollable <= 0) return
      setProgress(clamp(-top / scrollable, 0, 1))
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

  return (
    <>
      {/* ── Desktop: sticky scroll theater ── */}
      <section
        ref={sectionRef}
        className="relative bg-white hidden lg:block"
        style={{ height: '700vh' }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#092540]">
              Do you relate to <br /> any of these?
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

      {/* ── Mobile: static grid layout ── */}
      <section className="lg:hidden bg-white py-16 px-5">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-3">
            Common struggles
          </p>
          <h2 className="text-2xl font-bold text-[#092540]">
            Do you relate to <br /> any of these?
          </h2>
        </div>

        <div className="flex justify-center mb-10">
          <Image
            src="/landing-page/glucometer.png"
            alt="Glucometer"
            width={260}
            height={260}
            className="w-[260px] h-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {problems.map((problem, i) => (
            <ProblemCard key={i} problem={problem} />
          ))}
        </div>
      </section>
    </>
  )
}
