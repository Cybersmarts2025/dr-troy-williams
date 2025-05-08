
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CrossPostingSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Follow on Other Platforms</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Dr. Williams regularly publishes content on these professional platforms.
          Follow to stay connected and join the discussion.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 h-8 w-8">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <CardTitle>LinkedIn</CardTitle>
            <CardDescription>
              Professional insights and industry updates
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-2">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <a href="https://www.linkedin.com/in/troywilliams" target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 h-8 w-8">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <CardTitle>ResearchGate</CardTitle>
            <CardDescription>
              Academic publications and research findings
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-2">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer">
                Follow on ResearchGate
              </a>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 h-8 w-8">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <CardTitle>Medium</CardTitle>
            <CardDescription>
              In-depth articles and expert commentary
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-2">
            <Button variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-50">
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
                Read on Medium
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default CrossPostingSection;
