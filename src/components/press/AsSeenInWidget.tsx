import React from 'react';
import { Helmet } from 'react-helmet-async';

const AsSeenInWidget = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://pressranger.com/css/as-seen-in-widget.css" />
      </Helmet>
      <div className="as-seen-in-widget">
        <h3>As Seen In</h3>
        <div className="as-seen-in-logos-container">
          <div className="as-seen-in-rail"></div>
          <div className="as-seen-in-logos">
            <div className="as-seen-in-logo">
              <a href="https://markets.businessinsider.com/news/stocks/cybersmarts-ai-llc-founder-dr-troy-williams-issues-national-warning-on-business-email-compromise-and-financial-fraud-1035148827" target="_blank" rel="noopener">
                <img src="https://pressranger.s3.us-west-1.amazonaws.com/2568852/NYLtGCeSk2eUFDxzqf55PW9MYbJhB8hGOe8BOgLw.png" alt="Markets Insider" />
              </a>
            </div>
            <div className="as-seen-in-logo">
              <a href="https://finance.yahoo.com/news/cybersmarts-ai-llc-founder-dr-200100588.html" target="_blank" rel="noopener">
                <img src="https://pressranger.s3.us-west-1.amazonaws.com/2569636/Nv7hfiNFNGQVmQSTxEIuFjEHwI3K0AmvXtQDn827.png" alt="Yahoo! Finance" />
              </a>
            </div>
            <div className="as-seen-in-logo">
              <a href="https://www.marketwatch.com/press-release/cybersmarts-ai-llc-founder-dr-troy-williams-issues-national-warning-on-business-email-compromise-and-financial-fraud-27cc56a6?mod=search_headline" target="_blank" rel="noopener">
                <img src="https://pressranger.s3.us-west-1.amazonaws.com/2569637/PdU1uY3Jsg5TlF1XoCsGvTUXeYqSwdoHhMyVujhh.png" alt="MarketWatch" />
              </a>
            </div>
            <div className="as-seen-in-logo">
              <a href="https://apple.news/TzgDuq0U2RBOYM3-_d2KkQg" target="_blank" rel="noopener">
                <img src="https://pressranger.s3.us-west-1.amazonaws.com/2569640/ax1uqW5DRsICCULfTu3lvwXwOzQjKzJ8WVMhZ3GZ.png" alt="Apple News" />
              </a>
            </div>
          </div>
          <div className="as-seen-in-rail right"></div>
        </div>
      </div>
    </>
  );
};

export default AsSeenInWidget;