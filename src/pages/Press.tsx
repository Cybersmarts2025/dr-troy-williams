
import React, { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { WebPageSchema, PersonSchema, NewsArticleSchema } from "@/utils/schemaMarkup";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import PressHero from "@/components/press/PressHero";
import AsSeenInWidget from "@/components/press/AsSeenInWidget";
import FeaturedPressRelease from "@/components/press/FeaturedPressRelease";
import MediaFeaturesSection, { MediaFeature } from "@/components/press/MediaFeaturesSection";
import AwardsSection, { Recognition } from "@/components/press/AwardsSection";
import PressContactSection from "@/components/press/PressContactSection";

const Press = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [features, setFeatures] = useState<MediaFeature[]>([{
    outlet: "Nashville Voyager Magazine",
    title: "Inspiring Conversations with Dr. Troy Williams, PhD — Founder of Cybersmarts.ai LLC",
    date: "October 14, 2025",
    description: "Dr. Troy Williams shares the story behind Cybersmarts.ai LLC and his proprietary U.S.-built systems — PatriotProof™, FraudDNA™, AISF™, and PPP™ — engineered to Protect America Through Technology™.",
    link: "https://nashvillevoyager.com/interview/inspiring-conversations-with-dr-troy-williams-of-cybersmarts-ai-llc",
    logo: "https://nashvillevoyager.com/wp-content/uploads/2025/09/nashvillevoyager-logo.png"
  }, {
    outlet: "CNN",
    title: "AI in National Defense: Securing America's Digital Borders",
    date: "April 15, 2024",
    description: "Dr. Troy Williams addresses how artificial intelligence is revolutionizing national security measures and protecting critical infrastructure from foreign threats.",
    link: "#",
    logo: "https://via.placeholder.com/200x100/cccccc/333333?text=CNN"
  }, {
    outlet: "Forbes",
    title: "The Future of Cybersecurity: Interview with Dr. Troy Williams",
    date: "March 3, 2024",
    description: "An in-depth discussion on proactive cybersecurity strategies and the evolving landscape of digital threats facing American businesses.",
    link: "#",
    logo: "https://via.placeholder.com/200x100/cccccc/333333?text=Forbes"
  }, {
    outlet: "The National Security Journal",
    title: "Digital Sovereignty: America's Technology Independence",
    date: "February 21, 2024",
    description: "Expert analysis on how domestic technology development is crucial for national security and economic prosperity in an increasingly connected world.",
    link: "#",
    logo: "https://via.placeholder.com/200x100/cccccc/333333?text=NSJ"
  }, {
    outlet: "60 Minutes",
    title: "The AI Revolution: Security Implications",
    date: "January 12, 2024",
    description: "Dr. Williams explains the national security implications of advanced AI systems and the importance of ethical frameworks in technology development.",
    link: "#",
    logo: "https://via.placeholder.com/200x100/cccccc/333333?text=60+Minutes"
  }, {
    outlet: "Cybersecurity Today",
    title: "Proactive Prevention: The New Paradigm in Digital Defense",
    date: "December 3, 2023",
    description: "A feature on Dr. Williams' Proactive Prevention Platform and its application in protecting critical infrastructure from advanced cyber threats.",
    link: "#",
    logo: "https://via.placeholder.com/200x100/cccccc/333333?text=Cybersecurity+Today"
  }]);
  
  // Handle metadata fetched from the URL
  const handleMetadataFetched = (metadata: { title: string; description: string; outlet?: string }) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const newFeature: MediaFeature = {
      outlet: metadata.outlet || "Media Outlet",
      title: metadata.title,
      date: formattedDate,
      description: metadata.description || "No description available",
      link: "#",
      logo: `https://placehold.co/200x100/cccccc/333333?text=${encodeURIComponent(metadata.outlet || "Media")}`
    };
    
    setFeatures(prevFeatures => [newFeature, ...prevFeatures]);
    
    toast({
      title: "Feature Added",
      description: `Added "${metadata.title}" to your media features`,
    });
  };
  
  // Awards and recognitions data
  const recognitions: Recognition[] = [{
    title: "Tennessee State Certificate of Appreciation",
    organization: "State of Tennessee - Governor Bill Lee",
    year: "2025",
    description: "Formally recognized by Governor Bill Lee for outstanding service and contributions in cybersecurity, fraud prevention, and artificial intelligence innovation. This certificate acknowledges a career dedicated to advancing technologies that strengthen trust, privacy, and resilience in the digital age.",
    logo: "/assets/troy-williams-headshot-transparent.png"
  }, {
    title: "National Cybersecurity Excellence Award",
    organization: "Department of Homeland Security",
    year: "2024",
    description: "Recognized for outstanding contributions to the field of national cybersecurity infrastructure and policy development.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=DHS"
  }, {
    title: "Distinguished AI Researcher of the Year",
    organization: "American Association for Artificial Intelligence",
    year: "2023",
    description: "For groundbreaking research in ethical AI deployment for national security applications and critical infrastructure protection.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=AAAI"
  }, {
    title: "Technology Leadership Medal",
    organization: "Tennessee Technology Council",
    year: "2023",
    description: "Recognized for exceptional leadership in advancing technology education and innovation throughout Tennessee.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=TTC"
  }, {
    title: "Digital Investigation Innovation Award",
    organization: "International Association of Digital Investigators",
    year: "2022",
    description: "For pioneering new methodologies in digital forensic investigation and evidence collection techniques.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=IADI"
  }, {
    title: "National Security Technology Pioneer",
    organization: "Defense Technology Institute",
    year: "2021",
    description: "Honored for developing innovative defense technologies that enhance American security posture against evolving threats.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=DTI"
  }];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Press & Media | Dr. Troy Williams - AI & Cybersecurity Expert</title>
        <meta name="description" content="Press releases, interviews, and media appearances of Dr. Troy Williams - trusted authority in AI, cybersecurity, and digital investigation technology." />
      </Helmet>
      
      {/* Schema.org markup */}
      <WebPageSchema name="Press & Media | Dr. Troy Williams" description="Media appearances, interviews and press coverage featuring Dr. Troy Williams, AI and cybersecurity expert." />
      
      <PersonSchema 
        name="Dr. Troy Williams" 
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority" 
        description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation." 
        alumniOf={["Capitol Technology University", "Western Governors University"]} 
        sameAs={["https://www.linkedin.com/in/cybersmarts/", "https://twitter.com/troywilliams"]} 
      />

      {/* Add schema markup for Nashville Voyager feature */}
      <NewsArticleSchema
        headline="Inspiring Conversations with Dr. Troy Williams, PhD — Founder of Cybersmarts.ai LLC"
        description="Exclusive Nashville Voyager interview with Dr. Troy Williams, PhD — Founder and President of Cybersmarts.ai LLC — published October 14, 2025, covering AI ethics, cybersecurity innovation, and America's technological resilience."
        image="https://nashvillevoyager.com/wp-content/uploads/2025/09/nashvillevoyager-logo.png"
        datePublished="October 14, 2025"
        author="Dr. Troy Williams"
        publisher={{
          name: "Nashville Voyager Magazine",
          logo: "https://nashvillevoyager.com/wp-content/uploads/2025/09/nashvillevoyager-logo.png"
        }}
        url="https://nashvillevoyager.com/interview/inspiring-conversations-with-dr-troy-williams-of-cybersmarts-ai-llc"
      />
      
      {/* Add schema markup for the press release */}
      <NewsArticleSchema
        headline="Dr. Troy Williams, PhD, Pledges to Complete the Unfinished Work of AI and Cybersecurity Pioneers"
        description="Tennessee-based AI scientist and cybersecurity expert commits to advancing the work of technology pioneers through sovereign, ethical innovation."
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
        datePublished="June 18, 2025"
        publisher={{
          name: "Cybersmarts.ai LLC"
        }}
        url="#"
      />
      
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <PressHero />
        
        {/* As Seen In Widget */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <AsSeenInWidget />
          </div>
        </section>
        
        {/* Featured Press Release */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <FeaturedPressRelease />
          </div>
        </section>
        
        {/* Featured Press Section */}
        <MediaFeaturesSection 
          features={features}
          onMetadataFetched={handleMetadataFetched}
        />
        
        {/* Awards Section */}
        <AwardsSection recognitions={recognitions} />
        
        {/* Press Contact Section */}
        <PressContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Press;
