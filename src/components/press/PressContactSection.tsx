
import React from 'react';

const PressContactSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-[#B22234]/5 p-8 rounded-lg border border-[#B22234]/20">
          <h2 className="text-2xl font-bold mb-4 text-center">Media Inquiries</h2>
          <p className="text-center mb-6">
            For press and media inquiries, please contact Dr. Williams' media relations team.
          </p>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-medium">Email: <a href="mailto:press@legalsmarts.net" className="text-blue-600 hover:underline">press@legalsmarts.net</a></p>
            <p className="font-medium mt-2">Phone: (615) 547-9563</p>
            <button className="mt-6 bg-[#B22234] hover:bg-[#8B1A29] text-white py-2 px-6 rounded-md transition-colors">
              Download Press Kit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressContactSection;
