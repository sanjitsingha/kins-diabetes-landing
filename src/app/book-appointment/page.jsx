"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "doctors-consultation",
    num: "01",
    title: "Doctors Consultation",
    desc: "Expert medical evaluation & personalised advice",
  },
  {
    id: "diabetes-counselling",
    num: "02",
    title: "Diabetes Counselling",
    desc: "Lifestyle guidance, diet planning & management",
  },
  {
    id: "whole-body-checkup",
    num: "03",
    title: "Whole Body Check-Up",
    desc: "Complete diagnostics & comprehensive health screening",
  },
];

const STATS = [
  { label: "Patients",  bold: "Served",  val: "50k+",  star: false },
  { label: "One-Day",   bold: "Care",    val: "7hr",   star: false },
  { label: "Years",     bold: "Trusted", val: "14+",   star: false },
  { label: "Google",    bold: "Rated",   val: "4.8",   star: true  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function PhoneIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,6 5,9 10,3" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <span className="text-[12.5px] font-semibold text-[#2c3e50] tracking-wide uppercase">
      {children} <span className="text-[#e5373d]">*</span>
    </span>
  );
}

function TextInput({ error, ...props }) {
  return (
    <input
      {...props}
      className={[
        "w-full h-[50px] px-4 bg-[#f8fbfc] border-[1.5px] rounded-lg",
        "text-[15px] text-[#0d1c2e] outline-none transition-all",
        "placeholder:text-[#b0bec5] placeholder:font-normal",
        "focus:border-[#00b8d4] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,184,212,0.12)]",
        error ? "border-[#e5373d] shadow-[0_0_0_3px_rgba(229,55,61,0.1)]" : "border-[#e2e8ed]",
      ].join(" ")}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", mobile: "", city: "", diabetic: "", service: "" });
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState(null);

  // Phone pre-filled from ?phone= URL param
  const [phoneFromUrl, setPhoneFromUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("phone");
    if (p && /^\d{10}$/.test(p)) {
      setPhoneFromUrl(p);
      setForm(prev => ({ ...prev, mobile: p }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  // Only allow digits in the manual mobile input
  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm(prev => ({ ...prev, mobile: val }));
    if (errors.mobile) setErrors(prev => ({ ...prev, mobile: false }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError(null);

  const newErrors = {};
  if (!form.name.trim())    newErrors.name = true;
  if (!form.city.trim())    newErrors.city = true;
  if (!form.diabetic)       newErrors.diabetic = true;
  if (!form.service)        newErrors.service = true;
  if (!form.mobile || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = true;

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  if (!supabase) {
    setServerError("Service unavailable. Please try again later.");
    return;
  }

  setLoading(true);
  const { error } = await supabase
    .from("appointments")
    .insert([{ name: form.name, mobile: form.mobile, city: form.city, diabetic: form.diabetic, service: form.service }]);
  setLoading(false);

  if (!error) {
    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        content_name: "Consultation Form",
        currency:     "INR",
        value:        0,
      });
    }
    router.push("/thank-you");
  } else {
    setServerError(error.message);
  }
};

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#0d1c2e]">

      {/* ── HEADER ──────────────────────────────────── */}
      <header className="bg-white border-b border-[#e2e8ed] px-10 max-sm:px-4 h-[72px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center">
          <Image src="/landing-page/kd-logo.png" alt="Kins Diabetes" width={200} height={46} className="h-11 w-auto" priority />
        </Link>
      </header>

      {/* ── HERO BAND ───────────────────────────────── */}
      <section className="bg-[#f1f8fc] px-6 pt-16 pb-20 max-sm:pt-11 max-sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 mb-[18px]">
          <span className="w-7 h-0.5 bg-[#00b8d4] rounded-sm" />
          <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#00b8d4]">
            North Bengal&apos;s Only NABH Diabetes Centre
          </span>
        </div>

        <h1 className="font-serif text-[clamp(28px,5vw,46px)] text-[#0d1c2e] leading-[1.18] mb-3.5">
          Book Your Appointment Now
        </h1>

        {/* Show pre-filled phone confirmation */}
        {phoneFromUrl ? (
          <p className="text-[15px] text-[#56687a] max-w-[480px] mx-auto leading-[1.65]">
            We&apos;ve got your number <span className="font-semibold text-[#00b8d4]">+91 {phoneFromUrl}</span>. Fill in the remaining details and we&apos;ll call you shortly.
          </p>
        ) : (
          <p className="text-[15px] text-[#56687a] max-w-[480px] mx-auto leading-[1.65]">
            Fill in your details and our expert team will call you shortly to schedule your personalised diabetes care session.
          </p>
        )}
      </section>

      {/* ── MAIN ────────────────────────────────────── */}
      <main id="book" className="flex flex-col items-center px-5 pb-20 -mt-11 relative z-10">

        <div className="bg-white rounded-[20px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] w-full max-w-[880px] overflow-hidden">

          <div className="p-10 max-sm:p-5">
              <h2 className="font-serif text-[22px] text-[#0d1c2e] mb-7 pb-5 border-b border-[#e2e8ed]">
                Your Details
              </h2>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                {serverError && (
                  <div className="text-sm text-[#e5373d] bg-[#fff3f4] border border-[#f8d7da] rounded-md px-3 py-2">
                    {serverError}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Full Name</FieldLabel>
                  <TextInput type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" autoComplete="name" error={errors.name} />
                </div>

                {/* Mobile — hidden when pre-filled from URL, shown otherwise */}
                {phoneFromUrl ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#e4f7fb] border border-[rgba(0,184,212,0.3)] rounded-lg">
                    <PhoneIcon className="w-4 h-4 text-[#00b8d4] shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0099b2]">Mobile Number</p>
                      <p className="text-sm font-semibold text-[#0d1c2e]">+91 {phoneFromUrl}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>Mobile Number</FieldLabel>
                    <div className="flex">
                      <span className="h-[50px] px-3.5 bg-[#e4f7fb] border-[1.5px] border-r-0 border-[#e2e8ed] rounded-l-lg text-sm font-semibold text-[#0099b2] flex items-center shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleMobileChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        autoComplete="tel"
                        className={[
                          "flex-1 h-[50px] px-4 bg-[#f8fbfc] border-[1.5px] rounded-r-lg",
                          "text-[15px] text-[#0d1c2e] outline-none transition-all placeholder:text-[#b0bec5]",
                          "focus:border-[#00b8d4] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,184,212,0.12)]",
                          errors.mobile ? "border-[#e5373d]" : "border-[#e2e8ed]",
                        ].join(" ")}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-xs text-[#e5373d] mt-0.5">Please enter a valid 10-digit mobile number</p>
                    )}
                  </div>
                )}

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>City</FieldLabel>
                  <TextInput type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Siliguri, Darjeeling…" autoComplete="address-level2" error={errors.city} />
                </div>

                <hr className="border-[#e2e8ed]" />

                {/* Are You Diabetic? */}
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Are You Diabetic?</FieldLabel>
                  <div className="flex gap-2.5">
                    {["yes", "no"].map((val) => {
                      const checked = form.diabetic === val;
                      return (
                        <label key={val} className={["flex-1 flex items-center justify-center gap-2.5 h-[50px]", "border-[1.5px] rounded-lg text-[14.5px] font-medium", "cursor-pointer select-none transition-all hover:border-[#a0d4e0]", checked ? "border-[#00b8d4] bg-[#e4f7fb] text-[#0d1c2e]" : errors.diabetic ? "border-[#e5373d] bg-[#f8fbfc] text-[#56687a]" : "border-[#e2e8ed] bg-[#f8fbfc] text-[#56687a]"].join(" ")}>
                          <input type="radio" name="diabetic" value={val} checked={checked} onChange={handleChange} className="sr-only" />
                          <span className={`w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "border-[#00b8d4]" : "border-[#e2e8ed]"}`}>
                            <span className={`w-[9px] h-[9px] rounded-full transition-colors ${checked ? "bg-[#00b8d4]" : ""}`} />
                          </span>
                          {val.charAt(0).toUpperCase() + val.slice(1)}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>How Can I Help You?</FieldLabel>
                  <div className="flex flex-col gap-2">
                    {SERVICES.map((svc) => {
                      const checked = form.service === svc.id;
                      return (
                        <label key={svc.id} className={["flex items-center gap-3.5 p-3.5 border-[1.5px] rounded-lg", "cursor-pointer select-none transition-all hover:border-[#a0d4e0]", checked ? "border-[#00b8d4] bg-[#e4f7fb]" : errors.service ? "border-[#e5373d] bg-[#f8fbfc]" : "border-[#e2e8ed] bg-[#f8fbfc]"].join(" ")}>
                          <input type="radio" name="service" value={svc.id} checked={checked} onChange={handleChange} className="sr-only" />
                          <div className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold shrink-0 transition-all ${checked ? "bg-[#00b8d4] border-[#00b8d4] text-white" : "bg-[#faf8f4] border-[#e2e8ed] text-[#56687a]"}`}>
                            {svc.num}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-[#0d1c2e] leading-snug">{svc.title}</span>
                            <span className="text-xs text-[#56687a]">{svc.desc}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${checked ? "bg-[#00b8d4] border-[#00b8d4]" : "border-[#e2e8ed]"}`}>
                            {checked && <CheckIcon className="w-2.5 h-2.5" />}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={["w-full h-[54px] rounded-full text-[15.5px] font-semibold tracking-wide flex items-center justify-center gap-2 mt-1", loading ? "bg-[#9de6ee] text-white cursor-wait" : "bg-[#00b8d4] hover:bg-[#0099b2] text-white", "transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,184,212,0.3)] hover:shadow-[0_6px_28px_rgba(0,184,212,0.4)] active:translate-y-0"].join(" ")}
                >
                  {loading ? "Sending…" : "Book My Free Counselling"} <span className="text-[17px] leading-none">→</span>
                </button>

                <div className="flex items-center justify-center gap-2 py-3 px-4">
                  <PhoneIcon className="w-4 h-4 text-[#00b8d4] shrink-0" />
                  <p className="text-[13px] font-medium text-[#56687a]">Our team will call you soon</p>
                </div>

              </form>
            </div>

        </div>

        {/* ── STATS ROW ───────────────────────────── */}
        <div className="flex w-full max-w-[880px] mt-6 bg-white rounded-[20px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] overflow-hidden flex-wrap">
          {STATS.map((s, i) => (
            <div key={s.val + s.bold} className={["flex-1 min-w-[50%] sm:min-w-0 py-5 px-3 text-center", i < STATS.length - 1 ? "border-r border-[#e2e8ed]" : "", i < 2 ? "border-b sm:border-b-0 border-[#e2e8ed]" : ""].join(" ")}>
              <div className="text-[10.5px] text-[#56687a] tracking-wide mb-1">
                {s.label} <strong className="font-semibold text-[#2c3e50]">{s.bold}</strong>
              </div>
              <div className="font-serif text-[28px] text-[#0d1c2e] leading-none">
                {s.star ? <>{s.val}<span className="text-[#00b8d4] text-[20px]">★</span></> : s.val}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="py-6 text-center border-t border-[#e2e8ed] mt-5">
        <p className="text-[12.5px] text-[#a0b0bc]">
          © 2025 Kins Diabetes — The Sugar Experts · Siliguri, North Bengal{" "}
          <span className="mx-1">|</span>{" "}
          <a href="https://www.kinsdiabetes.com" className="text-[#00b8d4] font-medium hover:underline">
            kinsdiabetes.com
          </a>
        </p>
      </footer>
    </div>
  );
}
