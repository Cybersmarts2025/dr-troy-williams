
import React, { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, PersonSchema } from "@/utils/schemaMarkup";
import { SectionTitle } from "@/components/social/SectionTitle";
import { Newspaper, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import UrlMetadataFetcher from "@/components/press/UrlMetadataFetcher";
import { useToast } from "@/hooks/use-toast";

// Types for our data
interface MediaFeature {
  outlet: string;
  title: string;
  date: string;
  description: string;
  link: string;
  logo: string;
}

interface Recognition {
  title: string;
  organization: string;
  year: string;
  description: string;
  logo: string;
}

const Press = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [features, setFeatures] = useState<MediaFeature[]>([{
    outlet: "USA Today",
    title: "AI in National Defense: The Next Frontier",
    date: "March 15, 2024",
    description: "Dr. Troy Williams discusses the implications of artificial intelligence technologies in national defense systems.",
    link: "#",
    logo: "https://placehold.co/200x100/cccccc/333333?text=USA+Today"
  }, {
    outlet: "The Cybersecurity Journal",
    title: "Emerging Threats in Digital Security",
    date: "February 2, 2024",
    description: "An in-depth interview covering advanced persistent threats and evolving defense mechanisms.",
    link: "#",
    logo: "https://placehold.co/200x100/cccccc/333333?text=Cybersecurity+Journal"
  }, {
    outlet: "American Investigator",
    title: "Digital Forensics: The New Frontier",
    date: "December 12, 2023",
    description: "How digital investigative techniques are revolutionizing private investigation and law enforcement.",
    link: "#",
    logo: "https://placehold.co/200x100/cccccc/333333?text=American+Investigator"
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
    title: "Top 50 Cybersecurity Experts",
    organization: "Security Magazine",
    year: "2023",
    description: "Recognized for innovative approaches to national cybersecurity policy.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=Award"
  }, {
    title: "Distinguished AI Researcher",
    organization: "National Defense Technology Institute",
    year: "2022",
    description: "For contributions to ethical AI development in defense applications.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=Award"
  }, {
    title: "Technology Leader of the Year",
    organization: "Tennessee Technology Association",
    year: "2021",
    description: "Recognized for leadership in advancing technology education and innovation.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=Award"
  }];

  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>Press & Media | Dr. Troy Williams - AI & Cybersecurity Expert</title>
        <meta name="description" content="Press releases, interviews, and media appearances of Dr. Troy Williams - trusted authority in AI, cybersecurity, and digital investigation technology." />
      </Helmet>
      
      {/* Schema.org markup */}
      <WebPageSchema name="Press & Media | Dr. Troy Williams" description="Media appearances, interviews and press coverage featuring Dr. Troy Williams, AI and cybersecurity expert." />
      
      <PersonSchema name="Dr. Troy Williams" jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority" description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation." alumniOf={["Capitol Technology University", "Western Governors University"]} sameAs={["https://www.linkedin.com/in/troywilliams", "https://twitter.com/troywilliams"]} />
      
      <NavBar />
      
      <main className="pt-20">
        <PageBreadcrumb pageName="Press & Media" />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#f8f8f8] to-white py-12 mb-10">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mb-4">Press & Media Coverage</h1>
              <p className="text-lg text-gray-700 mb-6">
                Dr. Troy Williams is a recognized authority frequently featured in national media coverage 
                on topics related to artificial intelligence, cybersecurity, and digital investigation.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Featured Press Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <SectionTitle icon={Newspaper} title="Media Features" />
            
            {/* Add the URL Metadata Fetcher component */}
            <UrlMetadataFetcher onMetadataFetched={handleMetadataFetched} />
            
            <Card className="mb-6 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>How to Edit Media Features</span>
                </CardTitle>
                <CardDescription>
                  To add or remove media features, modify the <code>features</code> array in the <code>src/pages/Press.tsx</code> file. 
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><code>outlet</code></TableCell>
                      <TableCell>Name of the media outlet</TableCell>
                      <TableCell>"USA Today"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>title</code></TableCell>
                      <TableCell>Title of the article or feature</TableCell>
                      <TableCell>"AI in National Defense"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>date</code></TableCell>
                      <TableCell>Date of publication</TableCell>
                      <TableCell>"March 15, 2024"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>description</code></TableCell>
                      <TableCell>Short description of the content</TableCell>
                      <TableCell>"Dr. Troy Williams discusses..."</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>link</code></TableCell>
                      <TableCell>URL to the article</TableCell>
                      <TableCell>"https://example.com/article"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>logo</code></TableCell>
                      <TableCell>URL to the outlet's logo image</TableCell>
                      <TableCell>"https://example.com/logo.png"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                  <div className="p-4 bg-gray-100 flex items-center justify-center h-32">
                    <img src={item.logo} alt={`${item.outlet} logo`} className="max-h-20 max-w-full object-contain" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-[#B22234]">{item.outlet}</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <a href={item.link} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      Read Article
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>
        
        {/* Awards Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle icon={Award} title="Awards & Recognition" />
            
            <Card className="mb-6 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>How to Edit Awards & Recognitions</span>
                </CardTitle>
                <CardDescription>
                  To add or remove awards and recognitions, modify the <code>recognitions</code> array in the <code>src/pages/Press.tsx</code> file.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><code>title</code></TableCell>
                      <TableCell>Title of the award</TableCell>
                      <TableCell>"Top 50 Cybersecurity Experts"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>organization</code></TableCell>
                      <TableCell>Organization giving the award</TableCell>
                      <TableCell>"Security Magazine"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>year</code></TableCell>
                      <TableCell>Year received</TableCell>
                      <TableCell>"2023"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>description</code></TableCell>
                      <TableCell>Brief description of the award</TableCell>
                      <TableCell>"Recognized for innovative approaches..."</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>logo</code></TableCell>
                      <TableCell>URL to award image/logo</TableCell>
                      <TableCell>"https://example.com/award.png"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recognitions.map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="shrink-0">
                    <img src={item.logo} alt={item.title} className="w-16 h-16 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#B22234]">{item.organization}</span>
                      <span className="text-xs text-gray-500">{item.year}</span>
                    </div>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>
        
        {/* Press Contact Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-[#B22234]/5 p-8 rounded-lg border border-[#B22234]/20">
              <h2 className="text-2xl font-bold mb-4 text-center">Media Inquiries</h2>
              <p className="text-center mb-6">
                For press and media inquiries, please contact Dr. Williams' media relations team.
              </p>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-medium">Email: <a href="mailto:press@legalsmarts.net" className="text-blue-600 hover:underline">press@legalsmarts.net</a></p>
                <p className="font-medium mt-2">Phone: (615) 547-9563</p>
                <button className="mt-6 bg-[#B22234] hover:bg-[#8B1A29] text-white py-2 px-6 rounded-md transition-colors">
                  Download Press Kit
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Press;
