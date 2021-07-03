import React from 'react';
import {LogBox} from 'react-native';
import AppNavigator from './src/app/navigation/AppNavigation';
import store from './store';
import {Provider} from 'react-redux';

LogBox.ignoreAllLogs();

const MyApp = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default MyApp;
