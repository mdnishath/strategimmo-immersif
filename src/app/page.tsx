import Nav from "@/components/ui/Nav";
import SideNav from "@/components/ui/SideNav";
import Cursor from "@/components/ui/Cursor";
import StickyMobileBar from "@/components/ui/StickyMobileBar";
import Marquee from "@/components/ui/Marquee";
import Loader from "@/components/Loader";
import Hero from "@/components/sections/Hero";
import Biens from "@/components/sections/Biens";
import Vendre from "@/components/sections/Vendre";
import Agences from "@/components/sections/Agences";
import Estimation from "@/components/sections/Estimation";
import Avis from "@/components/sections/Avis";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <SideNav />
      <Cursor />
      <main>
        <Hero />
        <Marquee />
        <Biens />
        <Vendre />
        <Agences />
        <Estimation />
        <Avis />
        <Contact />
      </main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
