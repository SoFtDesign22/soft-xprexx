import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ColdChain from "@/components/ColdChain";
import MovementPath from "@/components/MovementPath";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main" className="journey"><Hero /><MovementPath /><Services /><ColdChain /></main>
  </>;
}
