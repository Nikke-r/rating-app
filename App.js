import React, {useEffect, useState} from 'react';
import Navigator from './navigators/Navigator';
import {MediaProvider} from './contexts/MediaContext';
import * as Expo from "expo";
import * as Font from 'expo-font';

export default function App() {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    setFontReady(true);
  }
  useEffect(() => {
   loadFonts();
  }, []);

  if (!fontReady) {
    console.log('Waiting for fonts...');
    return (
      <Expo.AppLoading />
    );
  }

  return (
    <MediaProvider>
      <Navigator />
    </MediaProvider>
  );
}

