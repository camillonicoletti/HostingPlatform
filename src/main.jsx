import React from 'react';
import { createRoot } from 'react-dom/client';

function ProjectStartingPoint() {
  return <main>Guest guide</main>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectStartingPoint />
  </React.StrictMode>,
);
