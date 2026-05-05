 'use client';

import React from 'react';

export default function Home() {
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <iframe
        src="/legacy_dashboard.html"
        title="Legacy Dashboard"
        style={{width: '100%', height: '100%', border: 'none'}}
      />
    </div>
  );
}
