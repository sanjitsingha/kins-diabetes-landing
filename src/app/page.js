import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import WhatWeDo from "./components/WhatWeDo";
import HowWeDiffer from "./components/HowWeDiffer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhoAreWe />
      <WhatWeDo />
      <HowWeDiffer />
    </>
  );
}
