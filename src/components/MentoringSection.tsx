
import { GraduationCap, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SectionTitle } from "@/components/social/SectionTitle";

interface MentorRole {
  title: string;
  organization: string;
  description: string;
  icon: React.ElementType;
  url: string;
}

const mentorRoles: MentorRole[] = [
  {
    title: "Doctoral Mentor",
    organization: "University of the Cumberlands",
    description: "Guiding doctoral candidates through research and dissertation development in cybersecurity and information technology.",
    icon: GraduationCap,
    url: "https://cumberlandsconnect.com/user/782494",
  },
  {
    title: "Alumni Mentor",
    organization: "Western Governors University",
    description: "Supporting WGU graduates as they navigate early career challenges and professional development opportunities.",
    icon: Users,
    url: "https://wguconnect.wgu.edu/profile/troywilliams2/",
  },
  {
    title: "College & Career Mentor",
    organization: "Tennessee Achieves",
    description: "Helping Tennessee students access higher education opportunities and build successful career pathways.",
    icon: Award,
    url: "https://www.tnachieves.org/",
  },
];

const MentoringSection = () => {
  return (
    <section className="py-20 relative overflow-hidden shield-bg">
      <div className="container mx-auto px-4">
        <SectionTitle icon={GraduationCap} title="Mentoring the Next Generation of American Innovators" />
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-700"
        >
          Investing in America's future by guiding students and professionals in cybersecurity, 
          technology leadership, and ethical innovation.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mentorRoles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="h-full border border-[#B22234]/20 hover:shadow-md transition-all duration-300 card-hover">
                  <CardContent className="pt-6">
                    <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-1">
                      {role.title}
                    </h3>
                    <p className="text-[#3C3B6E] font-semibold text-center mb-4">
                      {role.organization}
                    </p>
                    <p className="text-gray-600 text-center">
                      {role.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <Button
                      variant="outline"
                      className="border-[#3C3B6E] hover:bg-[#3C3B6E] hover:text-white"
                      onClick={() => window.open(role.url, "_blank", "noopener,noreferrer")}
                    >
                      Visit Program
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-[#B22234]/10 border border-[#B22234]/20 rounded-lg p-8 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-3 text-[#3C3B6E]">
            Want to connect or collaborate?
          </h3>
          <p className="mb-6 text-gray-700">
            Contact Dr. Williams for mentoring, speaking, or student support.
          </p>
          <Button 
            variant="usaRed" 
            size="lg"
            onClick={() => window.location.href = 'mailto:verifiedsafe8@gmail.com'}
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MentoringSection;
