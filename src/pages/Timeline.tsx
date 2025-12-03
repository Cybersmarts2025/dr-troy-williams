import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Briefcase, 
  Shield, 
  Award,
  BookOpen,
  Cpu,
  Target,
  Globe,
  Rocket,
  Flag
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  phase: string;
  title: string;
  description: string;
  icon: React.ElementType;
  type: 'education' | 'career' | 'achievement' | 'technology' | 'publication';
}

const Timeline = () => {
  const timelineData: TimelineItem[] = [
    // Phase 1: Foundation (1993-2000)
    {
      year: "1993",
      phase: "Foundation",
      title: "Career Launch",
      description: "Began investigative career in fraud detection and prevention, establishing foundational expertise in criminal investigation methodologies.",
      icon: Briefcase,
      type: "career"
    },
    {
      year: "1995",
      phase: "Foundation",
      title: "Field Operations",
      description: "Expanded field investigation capabilities, developing specialized techniques for evidence collection and witness interviews.",
      icon: Shield,
      type: "career"
    },
    {
      year: "1998",
      phase: "Foundation",
      title: "Corporate Investigations",
      description: "Transitioned into corporate fraud investigations, handling complex financial crimes and asset recovery cases.",
      icon: Briefcase,
      type: "career"
    },
    // Phase 2: Expansion (2000-2010)
    {
      year: "2000",
      phase: "Expansion",
      title: "Advanced Fraud Detection",
      description: "Expanded into corporate fraud investigations and asset recovery, developing proprietary investigation methodologies.",
      icon: Target,
      type: "career"
    },
    {
      year: "2003",
      phase: "Expansion",
      title: "Licensed Private Investigator",
      description: "Obtained Tennessee Private Investigator license, establishing official credentials for professional investigations.",
      icon: Award,
      type: "achievement"
    },
    {
      year: "2005",
      phase: "Expansion",
      title: "SBI Seminars Training",
      description: "Completed continuing legal education through SBI Seminars, enhancing investigative and legal expertise.",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2008",
      phase: "Expansion",
      title: "Digital Forensics Integration",
      description: "Began integrating digital forensics into investigation practices, recognizing the shift toward cyber-enabled crimes.",
      icon: Cpu,
      type: "career"
    },
    // Phase 3: Digital Transformation (2010-2018)
    {
      year: "2010",
      phase: "Digital Transformation",
      title: "Cybersecurity Pivot",
      description: "Transitioned to cybersecurity and digital identity protection, focusing on emerging cyber threats and vulnerabilities.",
      icon: Shield,
      type: "career"
    },
    {
      year: "2012",
      phase: "Digital Transformation",
      title: "Bachelor's Degree - Cybersecurity",
      description: "Earned Bachelor of Science in Cybersecurity and Information Assurance from Western Governors University.",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2014",
      phase: "Digital Transformation",
      title: "Master's Degree - IT Management",
      description: "Completed Master of Science in IT Management from Western Governors University, combining technical expertise with strategic leadership.",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2015",
      phase: "Digital Transformation",
      title: "Synthetic Identity Research",
      description: "Developed foundational concepts for synthetic identity detection, recognizing emerging fraud patterns.",
      icon: Target,
      type: "technology"
    },
    {
      year: "2017",
      phase: "Digital Transformation",
      title: "AI Security Research",
      description: "Initiated research into AI-driven security solutions and autonomous threat detection systems.",
      icon: Cpu,
      type: "technology"
    },
    // Phase 4: Innovation (2018-2023)
    {
      year: "2018",
      phase: "Innovation",
      title: "PhD Studies Commenced",
      description: "Began doctoral studies focusing on Artificial Intelligence and Information Technology, pursuing advanced research.",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2020",
      phase: "Innovation",
      title: "AI Fraud Prevention Research",
      description: "Launched AI-driven fraud prevention research initiatives, developing machine learning models for threat detection.",
      icon: Cpu,
      type: "technology"
    },
    {
      year: "2021",
      phase: "Innovation",
      title: "Publication: Inspiring Conversations",
      description: "Published 'Inspiring Conversations with Dr Troy Williams PhD' on SSRN, contributing to academic discourse.",
      icon: BookOpen,
      type: "publication"
    },
    {
      year: "2022",
      phase: "Innovation",
      title: "Vanderbilt Prompt Engineering",
      description: "Completed specialized training in Prompt Engineering at Vanderbilt University, mastering AI interaction methodologies.",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2023",
      phase: "Innovation",
      title: "PatriotProof™ & FraudDNA™",
      description: "Established PatriotProof™ identity verification and FraudDNA™ fraud detection frameworks as proprietary technologies.",
      icon: Shield,
      type: "technology"
    },
    // Phase 5: National Impact (2024-2027)
    {
      year: "2024",
      phase: "National Impact",
      title: "AISF™ Framework Launch",
      description: "Introduced Autonomous Intelligence Security Framework (AISF™) and quantum-secure architecture for national defense.",
      icon: Cpu,
      type: "technology"
    },
    {
      year: "2024",
      phase: "National Impact",
      title: "PhD Completion",
      description: "Completed doctoral studies in AI and IT, achieving the highest academic credentials in the field.",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2025",
      phase: "National Impact",
      title: "National Fraud Defense Grid",
      description: "Expanded National Fraud Defense Grid deployment, establishing interconnected protection across jurisdictions.",
      icon: Globe,
      type: "technology"
    },
    {
      year: "2025",
      phase: "National Impact",
      title: "Job Ready 360 Program",
      description: "Launched comprehensive career readiness and professional development program for cybersecurity professionals.",
      icon: Target,
      type: "achievement"
    },
    {
      year: "2026",
      phase: "National Impact",
      title: "Quantum Security Implementation",
      description: "Deployed post-quantum cryptographic systems using NIST-approved Kyber and Dilithium algorithms.",
      icon: Shield,
      type: "technology"
    },
    {
      year: "2027",
      phase: "National Impact",
      title: "Sovereign Defense Infrastructure",
      description: "Target completion of full sovereign defense infrastructure protecting American citizens and institutions.",
      icon: Flag,
      type: "achievement"
    }
  ];

  const typeColors = {
    education: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    career: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    achievement: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    technology: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    publication: "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30"
  };

  const phases = [...new Set(timelineData.map(item => item.phase))];

  return (
    <>
      <Helmet>
        <title>Lifetime Timeline | Dr. Troy Williams, PhD</title>
        <meta name="description" content="Complete professional timeline of Dr. Troy Williams from 1993 to 2027 - education, career milestones, technology innovations, and national impact achievements." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="Lifetime Timeline" />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">1993 – 2027</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Lifetime Timeline
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A 34-year journey from investigative foundations to national cybersecurity leadership 
              and sovereign technology development.
            </p>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Badge variant="outline" className={typeColors.education}>Education</Badge>
            <Badge variant="outline" className={typeColors.career}>Career</Badge>
            <Badge variant="outline" className={typeColors.achievement}>Achievement</Badge>
            <Badge variant="outline" className={typeColors.technology}>Technology</Badge>
            <Badge variant="outline" className={typeColors.publication}>Publication</Badge>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-1/2" />

            {phases.map((phase, phaseIndex) => (
              <div key={phase} className="mb-12">
                {/* Phase Header */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * phaseIndex }}
                  className="relative z-10 flex justify-center mb-8"
                >
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                    {phase}
                  </div>
                </motion.div>

                {/* Phase Items */}
                {timelineData
                  .filter(item => item.phase === phase)
                  .map((item, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <motion.div
                        key={`${item.year}-${item.title}`}
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`relative flex items-start gap-4 mb-8 ${
                          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 mt-6 z-10" />

                        {/* Content card */}
                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                        }`}>
                          <div className={`p-5 rounded-lg border bg-card hover:shadow-lg transition-shadow ${
                            isEven ? 'md:mr-4' : 'md:ml-4'
                          }`}>
                            {/* Year and Type */}
                            <div className={`flex items-center gap-2 mb-2 flex-wrap ${
                              isEven ? 'md:justify-end' : 'md:justify-start'
                            }`}>
                              <Badge variant="secondary" className="font-bold">
                                {item.year}
                              </Badge>
                              <Badge variant="outline" className={typeColors[item.type]}>
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </Badge>
                            </div>

                            {/* Icon and Title */}
                            <div className={`flex items-center gap-3 mb-2 ${
                              isEven ? 'md:flex-row-reverse' : ''
                            }`}>
                              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <item.icon className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Spacer for alternating layout */}
                        <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                      </motion.div>
                    );
                  })}
              </div>
            ))}

            {/* End marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="relative flex justify-center"
            >
              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                <Rocket className="h-3 w-3 text-primary-foreground" />
              </div>
            </motion.div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary">34+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Degrees & Certs</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary">6+</div>
              <div className="text-sm text-muted-foreground">Proprietary Systems</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Career Phases</div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Timeline;
