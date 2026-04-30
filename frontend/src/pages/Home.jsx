import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import IdentityAssets from "@/components/sections/IdentityAssets";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main data-testid="home-page" className="relative bg-[var(--zn-bg)] text-[var(--zn-ink)] overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Pricing />
      <IdentityAssets />
      <Portfolio />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
