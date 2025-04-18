
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WorkHistory from "@/components/WorkHistory";
import YouTubeSection from "@/components/YouTubeSection";
import SocialLinks from "@/components/SocialLinks";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <NavBar />
      <main>
        <HeroSection />
        <WorkHistory />
        <YouTubeSection />
        <SocialLinks />
      </main>
    </div>
  );
};

export default Index;
