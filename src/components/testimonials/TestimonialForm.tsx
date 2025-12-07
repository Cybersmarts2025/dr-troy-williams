
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, isValidEmail } from '@/utils/security';

interface TestimonialFormData {
  name: string;
  email: string;
  title: string;
  organization: string;
  testimonial: string;
  rating: string;
  category: string;
}

const TestimonialForm = () => {
  const { toast } = useToast();
  const form = useForm<TestimonialFormData>();

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      // Validate email
      if (!isValidEmail(data.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }

      // Sanitize all text inputs
      const sanitizedData = {
        name: sanitizeInput(data.name).slice(0, 100),
        email: data.email.trim().toLowerCase().slice(0, 255),
        title: sanitizeInput(data.title).slice(0, 100),
        organization: data.organization ? sanitizeInput(data.organization).slice(0, 100) : null,
        testimonial: sanitizeInput(data.testimonial).slice(0, 2000),
        rating: parseInt(data.rating),
        category: data.category,
        is_approved: false
      };

      const { error } = await supabase
        .from('testimonials')
        .insert(sanitizedData);

      if (error) throw error;

      toast({
        title: "Testimonial submitted!",
        description: "Thank you for your feedback. Your testimonial will be reviewed and published soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Share Your Experience</CardTitle>
        <CardDescription>
          Help others by sharing your experience working with Dr. Troy Williams or using his resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required", maxLength: { value: 100, message: "Name must be less than 100 characters" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "Email is required",
                  maxLength: { value: 255, message: "Email must be less than 255 characters" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Job title is required", maxLength: { value: 100, message: "Title must be less than 100 characters" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                rules={{ maxLength: { value: 100, message: "Organization must be less than 100 characters" } }}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="speaking">Speaking</SelectItem>
                        <SelectItem value="mentoring">Mentoring</SelectItem>
                        <SelectItem value="writing">Writing/Books</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 Stars - Excellent</SelectItem>
                        <SelectItem value="4">4 Stars - Good</SelectItem>
                        <SelectItem value="3">3 Stars - Average</SelectItem>
                        <SelectItem value="2">2 Stars - Below Average</SelectItem>
                        <SelectItem value="1">1 Star - Poor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="testimonial"
              rules={{ 
                required: "Testimonial is required",
                minLength: { value: 50, message: "Testimonial must be at least 50 characters" },
                maxLength: { value: 2000, message: "Testimonial must be less than 2000 characters" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Testimonial</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your experience working with Dr. Troy Williams..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Testimonial
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;
