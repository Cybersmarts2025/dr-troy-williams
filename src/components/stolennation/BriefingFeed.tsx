import React, { useState } from 'react';
import AudioBriefingCard from './AudioBriefingCard';
import { Button } from '@/components/ui/button';
import { Mail, Loader2 } from 'lucide-react';
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
import { useBriefings } from '@/hooks/useBriefings';
import { format } from 'date-fns';

const BriefingFeed = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // Fetch briefings from database
  const { data: briefings, isLoading, error } = useBriefings();

  // Fallback demo data if database is empty
  const demoBriefings = [
    {
      id: '1',
      title: 'Critical: 6 AI Tools Weaponized by Cybercriminals in 2025',
      summary: 'Criminal networks leverage AI tools to automate fraud, impersonation and credential compromise at unprecedented scale. Generative-AI platforms weaponized to produce phishing texts, clone voices, and crack passwords with minimal human oversight.',
      content: `(Geo: Tennessee, United States; Lebanon TN; Nashville TN; Memphis TN)

Threat Summary

Criminal networks are increasingly leveraging artificial intelligence tools to automate fraud, impersonation and credential compromise at a scale unseen before. According to the Federal Bureau of Investigation's 2024 IC3 report, cyber-enabled fraud accounted for 83% of reported losses. That trend is now evolving: generative-AI platforms—some derived from open-source models—are being weaponized to produce phishing texts, clone voices, and crack passwords with little human oversight. The warning is clear: businesses and households face a new breed of automated fraud that moves faster than traditional defenses.

Key Developments

• Dark-web marketplaces now list LLM variants embedded with phishing-malware delivery modules. Security research has documented "WormGPT"-style tools used to craft tailored email lures.

• The FBI and Cybersecurity and Infrastructure Security Agency (CISA) report that voice cloning is facilitating "emergency" impersonation calls, where victims perceive a loved one in distress.

• Password-cracking efforts scaled by AI, with tools such as PassGAN (a generative adversarial network built for password patterns) being used in credential stuffing attacks.

• Fraud researchers note that time-to-exploit is now measured in minutes rather than hours, as AI chains automate reconnaissance, content generation and delivery.

National Impact

The shift from manual to machine-driven fraud means the public's exposure multiplies. For small-business owners, fraud losses are no longer rare—they are inevitable unless defenses adapt. According to TransUnion's 2025 Global Fraud Report, U.S. businesses lost on average 9.8% of annual revenue to fraud systems in the past year—an increase of 46% over 2024.

Households are also vulnerable: automated phishing and voice impersonation erode trust, blur identity boundaries, and enable fast money extraction before detection. The criminal advantage lies not just in technology—but in speed and volume.

Proactive Defense Blueprint

Phishing-Resistant Authentication: Move beyond SMS and soft-token MFA. Deploy hardware security keys supporting the FIDO2/WebAuthn standard for all high-risk roles (finance, payroll, payables).

AI-Aware Email Gateways: Employ tools that detect AI-generated writing style anomalies, zero-hour phishing variants, and embed simulated attack drills using voice-clone scenarios.

Voice & Video Verification Protocols: Create internal process procedure requiring known "silent" passphrase verification or out-of-band confirmation for any request beyond normal authorization.

Behavioral Dwell Analytics: Monitor credential reuse, unusual login patterns, geo-temporal anomalies. Artificial intelligence should be used defensively to spot attacker automation.

Threat-Hunting for Fraud-LLM Chains: Your security team or vendor should monitor dark-web chatter, identify newly sold models built for fraud, and apply rapid rule updates to your perimeter.

Incident Readiness: Establish an audit-ready trail. Treat voice-clone or AI-generated fraud attempts like national-security events: document, hash evidence, alert the fraud desk and law enforcement promptly.

Strategic Outlook

The era of "manual phishing" is ending. Criminals now treat fraud as code-deployable infrastructure. For the U.S. public, this means a shift from reacting to incidents to defending against capabilities. Businesses and households positioned only with legacy email filters, SMS codes, and manual checks are rapidly becoming targets of opportunity.

As your civilian intelligence front, I advise that your defensive architecture must evolve to a machine-vs-machine stance. If you do not adopt automation-aware controls, you cede first-mover advantage to adversaries who have already built the playbooks.

Governments and institutional trade-groups will struggle to keep pace. That leaves American citizens and small business owners with a vital choice: become the first line of their own defense.

Attribution & Closing

Protecting America Through Technology™
I am not ahead of the curve. I am building the curve™
Author: Troy Williams, PhD
Built in Tennessee. By Americans. For Americans.`,
      date: '2025-11-12',
      category: 'AI Threats'
    },
    {
      id: '2',
      title: 'Fake DMV Text Scams Targeting Tennessee Residents',
      summary: 'Sophisticated SMS phishing campaign impersonating State DMV offices with fake traffic ticket notices. Scammers use urgency tactics and fraudulent payment links—always verify at official STATE.GOV website.',
      date: '2025-11-11',
      category: 'Consumer Fraud'
    },
    {
      id: '3',
      title: 'Business Email Compromise (BEC) Attacks Up 47% This Quarter',
      summary: 'BEC attacks targeting small businesses reach crisis levels with average losses exceeding $120,000 per incident. Attackers impersonate executives or vendors to authorize fraudulent wire transfers—implement verbal verification protocols.',
      content: `For the past decade, business email compromise — known in law enforcement circles as BEC — has quietly evolved from a nuisance into one of America's most financially devastating cyber crimes. In 2025, the Federal Bureau of Investigation reported a 47 percent quarterly increase in confirmed incidents nationwide. Losses now exceed $3.2 billion per quarter.

What makes this alarming is not only the scale, but the precision. BEC today is powered by artificial intelligence — deepfake voices, cloned faces, and context-aware language models that can mimic executives in real time.

How Modern BEC Works

Traditional scams relied on fake invoices and typo-squatted domains. Now, threat actors combine three technologies:
1. Generative LLMs to craft flawless emails written in an executive's style.
2. Deepfake audio/video to reinforce trust in urgent requests.
3. Automated workflow scripts to bypass multi-person approval chains.

A recent case in Memphis involved a deepfake video call impersonating a CEO requesting an immediate $25 million transfer to a "vendor in Hong Kong." The fraud succeeded because the impersonation matched his voice tone and office background perfectly. Investigators found the attackers had trained a voice model on public conference footage and LinkedIn videos.

Why Small Businesses Are at Risk

While headlines focus on large corporations, the real damage is occurring inside small and mid-sized companies across the Southeast. These firms often use cloud email without dedicated security operations centers. Once an attacker gains access to a single account, they monitor payment schedules, vendor names, and invoice patterns. Then they strike at the moment funds move.

In Tennessee alone, reported losses jumped by 61 percent year-over-year according to the state ICAC cyber task force. The average loss per case exceeds $120,000, and less than 20 percent is ever recovered.

The AI Factor — Deepfake and Data Fusion

The 2025 threat landscape introduced a new term: "synthetic identity impersonation." Attackers blend leaked data, social media biometrics, and generative AI to fabricate a digital twin of a CEO or vendor. This is not science fiction; it's an industrialized service sold on dark web forums for as little as $300 per target. Some kits even offer subscription packages with AI-generated voice mails and email templates.

According to the FBI's Internet Crime Complaint Center, more than 90 percent of BEC cases now involve some form of social engineering aided by AI. The tools once reserved for nation-state actors are now in the hands of criminal syndicates.

National and Economic Impact

Every fraudulent wire transfer funds larger operations — identity theft, narcotics, and even foreign intelligence campaigns. The American Bankers Association estimates that for every $1 lost to BEC, another $4 is lost to follow-on fraud using the same credentials.

The U.S. Secret Service now operates a national BEC task force with real-time fund recall capabilities, yet most cases are reported too late. Speed is the difference between recovery and loss.

Proactive Defense Blueprint

To every business owner reading this: reactive security is no longer enough. BEC requires proactive verification culture. Adopt these six layers:

1. Dual Approval – No wire or ACH over $2,000 should ever be approved by one person.
2. Out-of-Band Verification – Confirm requests by phone using pre-defined numbers not listed in the email.
3. Email Authentication – Implement DMARC, DKIM, and SPF to validate sender domains.
4. AI Anomaly Detection – Use platforms that flag changes in writing style or signature timing.
5. Account Segmentation – Limit finance team access to funds; create "view only" roles for vendors.
6. Incident Response Plan – Draft a playbook with bank contacts and law enforcement numbers ready.

The Human Layer

Technology can assist but cannot replace judgment. Teach staff to trust their instincts. If a request feels off, pause. One Tennessee controller saved her company $400,000 by noticing that her CEO suddenly signed emails with a period instead of a dash. That subtle difference was the tell.

What Comes Next

In the next 12 months, expect voice deepfake integration into real-time Zoom and Teams meetings. Adversaries are testing audio overlay bots that simulate executives during calls. Every business should develop a private code word for authorization or adopt zero-trust meeting protocols that require secondary sign-offs for financial decisions.

CISA has already published new guidelines on AI threat readiness.

Final Assessment

BEC is no longer just a cyber issue; it is a national economic threat. As The AI PI, I see a direct connection between these attacks and the erosion of trust in digital commerce. The only effective counter measure is proactive intelligence—training machines and humans to detect deception before it costs another payroll, another contract, another American job.

---

Protecting America Through Technology™
I am not ahead of the curve. I am building the curve™
Author: Troy Williams, PhD
Built in Tennessee. By Americans. For Americans.`,
      date: '2025-11-10',
      category: 'Business Fraud'
    },
    {
      id: '4',
      title: 'Bank Link Phishing: Unicode Confusables Bypass Security',
      summary: 'Criminals deploy advanced phishing sites using mixed scripts and Unicode characters appearing identical to legitimate bank URLs. Example: "уоurbank.com" uses Cyrillic characters—always type URLs manually and enable multi-factor authentication.',
      date: '2025-11-09',
      category: 'Financial Fraud'
    },
    {
      id: '5',
      title: 'Check Fraud Prevention: New Blueprint for Businesses',
      summary: 'Check fraud losses exceed $24 billion—businesses must adopt 6-layer defense: Payment Hardening, Chain of Custody, Secure Check Design, Traceability, Dual Control, and Continuous Monitoring. Paper checks remain critical vulnerability.',
      date: '2025-11-08',
      category: 'Business Security'
    },
    {
      id: '6',
      title: 'Stop Using SMS Codes: Transition to FIDO2 Security Keys',
      summary: 'SMS-based two-factor authentication no longer secure against SIM swap attacks and SS7 exploits. FIDO2 cryptographic security keys provide phishing-resistant authentication—critical infrastructure must mandate hardware keys immediately.',
      date: '2025-11-07',
      category: 'Authentication'
    },
    {
      id: '7',
      title: 'AI-Powered Romance Scams Surge 300% in Q1 2025',
      summary: 'Generative AI tools enable sophisticated romance scams targeting Americans over 50. Perpetrators use AI-generated photos, voice cloning, and personalized messaging to build trust before extracting funds.',
      date: '2025-11-05',
      category: 'Consumer Fraud'
    },
    {
      id: '8',
      title: 'Deepfake CEO Fraud Nets $25M from Tennessee Manufacturing Firm',
      summary: 'Memphis-based manufacturer falls victim to sophisticated deepfake video call impersonating their CEO, resulting in unauthorized wire transfers. Incident highlights growing threat of AI-enabled business email compromise attacks.',
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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#3C3B6E]" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Error loading briefings</p>
          </div>
        ) : briefings && briefings.length > 0 ? (
          briefings.map((briefing) => (
            <AudioBriefingCard 
              key={briefing.id} 
              briefing={{
                id: briefing.id,
                title: briefing.title,
                summary: briefing.summary,
                content: briefing.content,
                date: format(new Date(briefing.published_at || briefing.created_at), 'MMMM d, yyyy'),
                category: briefing.category,
                slug: briefing.slug
              }} 
            />
          ))
        ) : demoBriefings.length > 0 ? (
          demoBriefings.map((briefing) => (
            <AudioBriefingCard key={briefing.id} briefing={briefing} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No briefings available</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>More briefings coming soon • Updated regularly</p>
      </div>
    </div>
  );
};

export default BriefingFeed;
