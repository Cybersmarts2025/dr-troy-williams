
import React from 'react';

interface FooterCopyrightProps {
  companyName: string;
}

const FooterCopyright = ({ companyName }: FooterCopyrightProps) => {
  return (
    <div className="text-center">
      <p className="text-sm mb-2 text-white/90">
        © {new Date().getFullYear()} {companyName}. All Rights Reserved.
      </p>
      
      <p className="text-xs text-white/85 max-w-md mx-auto">
        All content, designs, and intellectual property are protected by copyright and other intellectual property laws. 
        Unauthorized reproduction or distribution is strictly prohibited.
      </p>
    </div>
  );
};

export default FooterCopyright;
