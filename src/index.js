import React, {useEffect, useState} from 'react';
import {View, LogBox, SafeAreaView} from 'react-native';
import AppNavigation from './app/navigation/AppNavigation';

LogBox.ignoreAllLogs();

export function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNavigation />
    </SafeAreaView>
  );
}
