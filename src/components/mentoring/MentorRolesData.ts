
import { GraduationCap, Users, Award } from "lucide-react";
import React from 'react';

export interface MentorRole {
  title: string;
  organization: string;
  description: string;
  icon: React.ElementType; // Changed from React.ElementType to match the MentorRoleProps
  url: string;
}

export const mentorRoles: MentorRole[] = [
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
