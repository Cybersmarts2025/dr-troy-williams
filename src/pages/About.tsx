
import { Book, GraduationCap, Briefcase, Flag, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Dr. Troy Williams</h1>
            <p className="text-xl text-gray-600 italic">"I'm not ahead of the curve — I am the curve."</p>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none mb-16">
            <p className="text-lg mb-8">
              With over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation, I've built my career on one mission: protecting America through technology.
            </p>
            <p className="text-lg mb-8">
              I'm Dr. Troy Williams — a Ph.D. in Artificial Intelligence, a licensed private investigator, a published author, and the founder of Cybersmarts.ai, a nonprofit organization advancing national AI security, ethical tech development, and digital sovereignty.
            </p>
          </div>

          {/* Education */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Professional Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">My journey began in electronics and evolved into cybersecurity and AI architecture. I hold degrees in:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ph.D. in Artificial Intelligence – Capitol Technology University</li>
                <li>Master's in IT Management – Western Governors University</li>
                <li>Bachelor's in Cybersecurity & Information Assurance – WGU</li>
                <li>Associate's in Electronics</li>
              </ul>
              <p className="mt-4">
                Over three decades, I've led private investigations, developed digital forensics protocols, conducted fraud detection at scale, and now — I build AI systems designed to outthink cyber adversaries before they strike.
              </p>
            </CardContent>
          </Card>

          {/* Cybersmarts.ai */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                Founder of Cybersmarts.ai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                As Founder and Chief Intelligence Architect at Cybersmarts.ai, I designed the Autonomous Intelligence Security Framework (AISF™) and Proactive Prevention Platform (PPP™) — two groundbreaking systems that power PatriotProof™, our U.S.-only fraud defense SaaS platform built for agencies, law enforcement, and enterprise clients.
              </p>
              <p>
                Cybersmarts.ai is more than a nonprofit — it's a national movement for ethical, secure, and sovereign artificial intelligence.
              </p>
            </CardContent>
          </Card>

          {/* Publications */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6" />
                Author & Thought Leader
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">I've authored multiple books on AI, cybersecurity, and investigative ethics — including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Unveiling Privacy</li>
                <li>The Quantum Guard</li>
                <li>Zero Trust Proactive Cybersecurity</li>
                <li>CyberPsychology and Our Children</li>
                <li>Stolen Nation: How to Protect Your Money, Credit, and Identity from Hackers, Scammers, and Foreign Exploiters (Coming Soon)</li>
              </ul>
              <p className="mt-4">These works reflect my belief that knowledge should not just inform — it should defend.</p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-6 w-6" />
                Built for America. By Americans.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                My work is not for sale to foreign governments or corporations. Everything I build is protected, patented, and distributed only within the United States. I work privately — no public appearances — for the protection of the people and systems I serve.
              </p>
              <p className="mb-4">
                I mentor veterans, students, and professionals through the Tennessee Promise, WGU Alumni Network, and personal outreach — with the singular focus of developing the next generation of digital defenders.
              </p>
              <p className="italic text-lg text-gray-600 mt-6">
                "I'm not just leading. I'm rewriting the playbook."
              </p>
              <p className="mt-4 text-center font-semibold">
                Welcome to the future of national security. Welcome to my legacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
