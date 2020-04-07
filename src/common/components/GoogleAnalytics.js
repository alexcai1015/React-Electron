import React from 'react';

const injectGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', 'G-S51LX5T9LF');
};

export const GoogleAnalytics = () => {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-S51LX5T9LF"></script>
      <script>{injectGA()}</script>
    </>
  );
};