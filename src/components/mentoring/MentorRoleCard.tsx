
import React from 'react';
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MentorRoleProps {
  title: string;
  organization: string;
  description: string;
  icon: LucideIcon;
  url: string;
  index: number;
}

const MentorRoleCard = ({ title, organization, description, icon: Icon, url, index }: MentorRoleProps) => {
  return (
    <motion.div
      key={title}
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
            {title}
          </h3>
          <p className="text-[#3C3B6E] font-semibold text-center mb-4">
            {organization}
          </p>
          <p className="text-gray-600 text-center">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button
            variant="outline"
            className="border-[#3C3B6E] hover:bg-[#3C3B6E] hover:text-white"
            onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
          >
            Visit Program
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MentorRoleCard;
