
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="flex items-center justify-center mb-12"
    >
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B22234] to-transparent flex-grow"></div>
      <h2 className="text-3xl font-bold text-center mx-4 text-[#B22234] flex items-center gap-2">
        <Icon className="h-7 w-7" />
        <span>{title}</span>
      </h2>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B22234] to-transparent flex-grow"></div>
    </motion.div>
  );
};
