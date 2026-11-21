
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
    title: "College & Career Mentor",
    organization: "Tennessee Achieves",
    description: "Helping Tennessee students access higher education opportunities and build successful career pathways.",
    icon: Award,
    url: "https://www.tnachieves.org/",
  },
];
