import React from 'react';
import AppNavigator from './src/app/navigation/AppNavigation';
import store from './store';
import {Provider} from 'react-redux';

const MyApp = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default MyApp;
