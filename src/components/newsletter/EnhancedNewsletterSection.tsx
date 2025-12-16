
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Users, TrendingUp, Shield } from "lucide-react";
import { useNewsletter } from "@/hooks/useNewsletter";

const newsletterTopics = [
  { id: 'cybersecurity', label: 'Cybersecurity Updates', icon: Shield },
  { id: 'ai', label: 'AI & Technology News', icon: TrendingUp },
  { id: 'policy', label: 'Policy & Governance', icon: Users },
  { id: 'research', label: 'Research Publications', icon: Mail },
];

const EnhancedNewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { subscribe, isSubmitting } = useNewsletter();

  const handleTopicChange = (topicId: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics(prev => [...prev, topicId]);
    } else {
      setSelectedTopics(prev => prev.filter(id => id !== topicId));
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const preferences = {
      topics: selectedTopics,
      frequency: 'weekly' // Default frequency
    };
    
    await subscribe(email, name, preferences);
    if (!isSubmitting) {
      setEmail("");
      setName("");
      setSelectedTopics([]);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="h-8 w-8 text-[#3C3B6E]" />
              <h2 className="text-4xl font-bold text-[#3C3B6E]">Intelligence Briefings</h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join over 10,000 cybersecurity professionals receiving expert insights on AI security, 
              digital sovereignty, and emerging threats.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newsletter Benefits */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#3C3B6E]">What You'll Receive</CardTitle>
                <CardDescription>Exclusive content delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {newsletterTopics.map((topic) => {
                    const IconComponent = topic.icon;
                    return (
                      <div key={topic.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <IconComponent className="h-5 w-5 text-[#3C3B6E]" />
                        <span className="font-medium">{topic.label}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-[#3C3B6E] mb-2">Subscriber Benefits:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Weekly intelligence briefings</li>
                    <li>• Early access to research papers</li>
                    <li>• Exclusive webinar invitations</li>
                    <li>• Priority booking for consultations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Form */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#3C3B6E]">Subscribe Now</CardTitle>
                <CardDescription>Customize your intelligence feed</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Input 
                        type="text" 
                        placeholder="Your name (optional)" 
                        className="h-12"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                    
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Your email address" 
                        className="h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Select your interests:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {newsletterTopics.map((topic) => {
                        const IconComponent = topic.icon;
                        return (
                          <div key={topic.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={topic.id}
                              checked={selectedTopics.includes(topic.id)}
                              onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                            />
                            <label 
                              htmlFor={topic.id} 
                              className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                            >
                              <IconComponent className="h-4 w-4 text-[#3C3B6E]" />
                              {topic.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#B22234] hover:bg-[#9B0000] text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe to Intelligence Briefings"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Unsubscribe at any time. 
                    Your data is protected and never shared with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedNewsletterSection;
