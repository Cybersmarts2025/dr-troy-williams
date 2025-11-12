import React, { useState } from 'react';
import AudioBriefingCard from './AudioBriefingCard';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Briefing {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
}

const BriefingFeed = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Demo data - will be replaced with real data
  const briefings: Briefing[] = [
    {
      id: '1',
      title: 'AI-Powered Romance Scams Surge 300% in Q1 2025',
      summary: 'New generative AI tools are enabling sophisticated romance scams targeting Americans over 50. Perpetrators use AI-generated photos, voice cloning, and personalized messaging to build trust before requesting financial assistance.',
      date: '2025-01-15',
      category: 'AI Fraud'
    },
    {
      id: '2',
      title: 'Critical Infrastructure Under Coordinated Cyber Attack',
      summary: 'Intelligence indicates coordinated attempts to compromise regional power grid control systems across six states. Attribution analysis points to state-sponsored actors using advanced persistent threat techniques.',
      date: '2025-01-12',
      category: 'Cyber Warfare'
    },
    {
      id: '3',
      title: 'Deepfake CEO Fraud Costs American Businesses $47M',
      summary: 'Video deepfake technology used to impersonate C-suite executives in wire transfer authorization schemes. Real-time video manipulation now indistinguishable from legitimate video calls without advanced detection.',
      date: '2025-01-08',
      category: 'Corporate Fraud'
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Placeholder - will integrate with newsletter system
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Subscription Pending",
      description: "Newsletter subscription system will be activated soon. Your interest has been noted.",
    });
    
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#1A1F2C]">National Intelligence Briefings</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#B22234] hover:bg-[#8B1A28]">
              <Mail className="h-4 w-4 mr-2" />
              Subscribe to Briefings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subscribe to National Briefings</DialogTitle>
              <DialogDescription>
                Receive critical intelligence updates directly to your inbox. Independent civilian intelligence to protect Americans.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-[#3C3B6E] hover:bg-[#2d2c54]"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {briefings.map((briefing) => (
          <AudioBriefingCard key={briefing.id} briefing={briefing} />
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>More briefings coming soon • Updated regularly</p>
      </div>
    </div>
  );
};

export default BriefingFeed;
