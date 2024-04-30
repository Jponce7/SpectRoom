import React from 'react';
import ExitButton from '../components/ExitButton'; 



function RevealthePath() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}> {/* Ensuring the parent has a relative position */}
    <ExitButton />
      <h1>Reveal the Path</h1>
      <p>This is the Reveal the Path activity.</p>
    </div>
  );
}

export default RevealthePath;