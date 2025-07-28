
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  organization: z.string().min(2, { message: "Organization must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const PressContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      message: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you would send this to your backend
      console.log("Form data submitted:", values);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inquiry Sent",
        description: "Your press inquiry has been received. We'll respond within 24-48 hours.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    try {
      // Create download link for press kit
      const link = document.createElement('a');
      link.href = '/press-kit-dr-troy-williams.txt';
      link.download = 'Dr-Troy-Williams-Press-Kit.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Press Kit Downloaded",
        description: "Dr. Troy Williams press kit has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was a problem downloading the press kit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-12" id="media-contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#B22234]/5 to-[#3C3B6E]/5 p-6 md:p-8 rounded-lg border border-[#B22234]/20 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center">Media Inquiries</h2>
          <p className="text-center mb-6 md:mb-8 text-base md:text-lg">
            For press interviews, speaking engagement requests, or expert commentary on artificial intelligence, 
            cybersecurity, or national security technology matters, please contact Dr. Williams' media relations team.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-md shadow-sm border border-gray-100">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#B22234]" />
                Contact Information
              </h3>
              <ul className="space-y-3">
                <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="font-medium">Media Relations:</span>
                  <a href="mailto:support@cybersmarts.ai" className="text-blue-600 hover:underline break-all">support@cybersmarts.ai</a>
                </li>
                <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="font-medium">Office Phone:</span>
                  <a href="tel:+16155479563" className="text-blue-600 hover:underline">(615) 547-9563</a>
                </li>
                <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="font-medium">Response Time:</span>
                  <span>24-48 hours</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-md shadow-sm border border-gray-100">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-[#3C3B6E]" />
                Media Resources
              </h3>
              <p className="mb-4">
                Our press kit includes high-resolution photos, biography, areas of expertise, 
                and recent publication details.
              </p>
              <Button 
                className="bg-[#3C3B6E] hover:bg-[#2d2c54] text-white flex items-center gap-2 w-full justify-center"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <CheckCircle className="h-4 w-4 animate-pulse" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Press Kit
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-md shadow-sm border border-gray-100 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Send Press Inquiry</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Your organization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your inquiry or interview request"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#B22234] hover:bg-[#8a1a28]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="bg-[#3C3B6E]/10 p-4 md:p-6 rounded-md">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Featured Topics for Expert Commentary</h3>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
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
