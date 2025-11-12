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

  // Demo data - Updated regularly with current threats
  const briefings: Briefing[] = [
    {
      id: '1',
      title: 'Critical: 6 AI Tools Weaponized by Cybercriminals in 2025',
      summary: 'Intelligence confirms widespread use of Poisongpt, Wormgpt, Speechif.ai, Deepl.ai, Freedom.ai, and Passgan.ai by threat actors. These tools enable automated phishing, voice cloning, and password cracking at unprecedented scale. Businesses must implement AI-aware security protocols immediately.',
      date: '2025-11-12',
      category: 'AI Threats'
    },
    {
      id: '2',
      title: 'Fake DMV Text Scams Targeting Tennessee Residents',
      summary: 'Sophisticated SMS phishing campaign impersonating State DMV offices with fake traffic ticket notices. Scammers use urgency tactics and fraudulent payment links. Always verify at your official STATE.GOV website—never click links in unsolicited texts.',
      date: '2025-11-11',
      category: 'Consumer Fraud'
    },
    {
      id: '3',
      title: 'Business Email Compromise (BEC) Attacks Up 47% This Quarter',
      summary: 'BEC attacks targeting small businesses have reached crisis levels, with average losses exceeding $120,000 per incident. Attackers impersonate executives or vendors to authorize fraudulent wire transfers. Implement verbal verification for all payment requests.',
      date: '2025-11-10',
      category: 'Business Fraud'
    },
    {
      id: '4',
      title: 'Bank Link Phishing: Unicode Confusables Bypass Security',
      summary: 'Criminals deploying advanced phishing sites using mixed scripts and Unicode characters that appear identical to legitimate bank URLs. Example: "уоurbank.com" uses Cyrillic characters. Always type URLs manually and enable multi-factor authentication.',
      date: '2025-11-09',
      category: 'Financial Fraud'
    },
    {
      id: '5',
      title: 'Check Fraud Prevention: New Blueprint for Businesses',
      summary: 'With check fraud losses exceeding $24 billion, businesses must adopt the 6-layer defense: Payment Hardening, Chain of Custody, Secure Check Design, Traceability & Analytics, Dual Control, and Continuous Monitoring. Paper checks remain a vulnerability.',
      date: '2025-11-08',
      category: 'Business Security'
    },
    {
      id: '6',
      title: 'Stop Using SMS Codes: Transition to FIDO2 Security Keys',
      summary: 'SMS-based two-factor authentication is no longer secure against SIM swap attacks and SS7 exploits. FIDO2 cryptographic security keys provide phishing-resistant authentication. Critical infrastructure and financial institutions must mandate hardware keys.',
      date: '2025-11-07',
      category: 'Authentication'
    },
    {
      id: '7',
      title: 'AI-Powered Romance Scams Surge 300% in Q1 2025',
      summary: 'New generative AI tools are enabling sophisticated romance scams targeting Americans over 50. Perpetrators use AI-generated photos, voice cloning, and personalized messaging to build trust before requesting financial assistance.',
      date: '2025-11-05',
      category: 'Consumer Fraud'
    },
    {
      id: '8',
      title: 'Deepfake CEO Fraud Nets $25M from Tennessee Manufacturing Firm',
      summary: 'A Memphis-based manufacturer fell victim to a sophisticated deepfake video call impersonating their CEO, resulting in unauthorized wire transfers. The incident highlights the growing threat of AI-enabled business email compromise attacks.',
      date: '2025-11-03',
      category: 'Business Fraud'
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
