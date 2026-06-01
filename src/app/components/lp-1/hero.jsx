'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 10)
        setPhone(val)
        if (error) setError('')
    }

    const handleSubmit = () => {
        if (!phone || phone.length !== 10) {
            setError('Please enter a valid 10-digit mobile number')
            return
        }
        router.push(`/book-appointment?phone=${phone}`)
    }

    return (
        <section id="top" className="py-10 pt-30 pb-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-4">
                <div
                    className="grid md:grid-cols-[1.05fr_1fr] rounded-3xl overflow-hidden border border-[#c8dde8] min-h-[560px]"
                    style={{ background: 'linear-gradient(135deg, #eaf6fc 0%, #f5fbfe 55%, #fef4f5 100%)' }}
                >
                    {/* Left */}
                    <div className="p-4 md:p-14 flex flex-col justify-center">
                        <div className="flex gap-2 mb-8">
                            <Image className="shrink-0 object-contain" width={30} height={30} src="/landing-page/nabh-logo.webp" alt="NABH" />
                            <span className="inline-flex items-center px-4 py-1.5 bg-white border border-[#c8dde8] rounded-full text-xs md:text-sm font-medium text-[#1e2d3d]">
                                North Bengal&apos;s only NABH Accredited diabetes centre
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl leading-[1.35] text-[#12a4dd] mb-2 tracking-tight">
                            Tired of <br />managing diabetes alone?
                        </h1>
                        <p className="text-2xl font-medium text-black mb-8">Stop worrying. Start managing — with a real diabetes plan.</p>
                        <p className="text-[#5a7184] text-base max-w-lg mb-9">Get expert care for your diabetes — tests, counselling, diet plan and doctor consultation — all in one day, under one roof in Siliguri.</p>

                        <div className="w-full border bg-white shadow-2xl shadow-[#12a4dd]/20 border-[#12a4dd] p-3 rounded-lg">
                            <label className="text-sm block text-black/60 mb-4">Phone Number</label>
                            <div className={`flex items-center border-b pb-3 transition-colors ${error ? 'border-red-400' : 'border-[#12a4dd]/20'}`}>
                                <span className="text-xl font-semibold text-[#12a4dd] mr-2 shrink-0 select-none">+91</span>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    value={phone}
                                    onChange={handleChange}
                                    maxLength={10}
                                    placeholder="Enter 10-digit number"
                                    className="outline-none text-xl text-[#12a4dd] w-full placeholder:text-[#12a4dd]/30 placeholder:text-base"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" />
                                        <circle cx="12" cy="16" r="1" fill="white" />
                                    </svg>
                                    {error}
                                </p>
                            )}
                            <button
                                onClick={handleSubmit}
                                className="bg-[#12a4dd] hover:bg-[#0b7aaa] w-full mt-6 py-3 rounded-full cursor-pointer text-white font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                            >
                                Get Free Counselling
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="p-5 md:pl-0 flex items-stretch">
                        <div className="relative w-full rounded-2xl overflow-hidden min-h-[320px] bg-gradient-to-br from-[#d6f0fb] to-[#eaf6fc] border border-white/60">
                            <img
                                src="/landing-page/hero-image-right.webp"
                                alt="Clinic"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
