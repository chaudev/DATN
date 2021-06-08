import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppRouter} from '../AppRouter';

import {HistoryScreen} from '../../view/history';

const Stack = createStackNavigator();

const HistoryNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.HISTORY}
        component={HistoryScreen}
        options={{title: AppRouter.HISTORY, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HistoryNavigator;
