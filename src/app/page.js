import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import WhatWeDo from "./components/WhatWeDo";
import HowWeDiffer from "./components/HowWeDiffer";
import Differentiators from "./components/Differentiators";
import USPs from "./components/USPs";
import Testimonials from "./components/Testimonials";
import VideoTestimonials from "./components/VideoTestimonials";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import UrgencyTimer from "./components/UrgencyTimer";
import WhatMakesUsDifferent from "./components/WhatMakesUsDifferent";

export default function Home() {
  return (
    <>
    <UrgencyTimer/>
      <Navbar />
      <Hero />
      <WhoAreWe />
      <WhatMakesUsDifferent/>
      <WhatWeDo />
      <Differentiators/>
      <USPs/>
      <Testimonials/>
      <VideoTestimonials/>
      <FAQ/>
      <ContactForm/>
    </>
  );
}
