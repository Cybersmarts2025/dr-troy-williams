
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone } from "lucide-react";

const PressContactSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#B22234]/5 to-[#3C3B6E]/5 p-8 rounded-lg border border-[#B22234]/20 shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Media Inquiries</h2>
          <p className="text-center mb-8 text-lg">
            For press interviews, speaking engagement requests, or expert commentary on artificial intelligence, 
            cybersecurity, or national security technology matters, please contact Dr. Williams' media relations team.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#B22234]" />
                Contact Information
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Media Relations:</span>
                  <a href="mailto:press@legalsmarts.net" className="text-blue-600 hover:underline">press@legalsmarts.net</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Office Phone:</span>
                  <a href="tel:+16155479563" className="text-blue-600 hover:underline">(615) 547-9563</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Response Time:</span>
                  <span>24-48 hours</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-[#3C3B6E]" />
                Media Resources
              </h3>
              <p className="mb-4">
                Our press kit includes high-resolution photos, biography, areas of expertise, 
                and recent publication details.
              </p>
              <Button className="bg-[#3C3B6E] hover:bg-[#2d2c54] text-white flex items-center gap-2 w-full justify-center">
                <Download className="h-4 w-4" />
                Download Press Kit
              </Button>
            </div>
          </div>
          
          <div className="bg-[#3C3B6E]/10 p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Featured Topics for Expert Commentary</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Artificial Intelligence in National Defense</li>
              <li>Emerging Cybersecurity Threats and Countermeasures</li>
              <li>Digital Investigation Methodologies</li>
              <li>Technology Sovereignty and National Security</li>
              <li>Ethical AI Development and Implementation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressContactSection;
