import React, {useEffect, useState} from 'react';
import {View, LogBox} from 'react-native';
import AppNavigation from './app/navigation/AppNavigation';

LogBox.ignoreAllLogs();

export function App() {
  return (
    <View style={{flex: 1}}>
      <AppNavigation />
    </View>
  );
}
