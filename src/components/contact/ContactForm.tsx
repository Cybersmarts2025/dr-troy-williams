import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { validateContactForm, sanitizeFormData } from "@/utils/formValidation";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: validation.errors[0],
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sanitize form data before inserting
      const sanitized = sanitizeFormData(formData);
      
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: sanitized.name,
          email: sanitized.email,
          subject: sanitized.subject,
          message: sanitized.message
        });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
        duration: 5000,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-[#3C3B6E]" />
              <h2 className="text-3xl font-bold">Get in Touch</h2>
            </div>
            <p className="text-lg text-gray-600">
              Have questions or want to collaborate? Send us a message and we'll get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-1"
                placeholder="Tell us about your project, question, or how we can help..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#B22234] hover:bg-[#9B0000] text-lg py-3"
            >
              {isSubmitting ? (
                "Sending Message..."
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              You can also reach us directly at{" "}
              <a href="mailto:verifiedsafe8@gmail.com" className="text-[#B22234] hover:underline">
                verifiedsafe8@gmail.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
