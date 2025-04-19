
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WorkHistory from "@/components/WorkHistory";
import YouTubeSection from "@/components/YouTubeSection";
import SocialLinks from "@/components/SocialLinks";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B22234]/5 via-white to-[#3C3B6E]/5">
      <NavBar />
      <main>
        <HeroSection />
        <div className="section-divider"></div>
        <WorkHistory />
        <div className="section-divider"></div>
        <YouTubeSection />
        <div className="section-divider"></div>
        <SocialLinks />
      </main>
    </div>
  );
};

export default Index;
