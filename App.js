import React from 'react';
import Navigator from './navigators/Navigator';
import {MediaProvider} from './contexts/MediaContext';

export default function App() {
  return (
    <MediaProvider>
      <Navigator />
    </MediaProvider>
  );
}

