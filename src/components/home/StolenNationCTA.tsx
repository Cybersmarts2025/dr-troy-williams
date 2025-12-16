import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StolenNationCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#3C3B6E] to-[#1a1a3a]">
      <div className="container mx-auto px-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-[#B22234] rounded-full flex items-center justify-center">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                  <AlertTriangle className="h-5 w-5 text-[#B22234]" />
                  <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                    New Intelligence Platform
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stolen Nation: National Intelligence Briefings
                </h2>
                
                <p className="text-lg text-white/80 mb-6 max-w-3xl">
                  Access critical intelligence on AI-driven fraud, cyber warfare, and threats targeting American citizens. 
                  Independent civilian intelligence with audio briefings powered by advanced AI.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-[#B22234] hover:bg-[#8B1A28] text-white"
                  >
                    <Link to="/stolennation">
                      Access Briefings
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild
                    size="lg"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#3C3B6E] transition-all"
                  >
                    <Link to="/pledge">
                      Take the Pledge
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StolenNationCTA;
