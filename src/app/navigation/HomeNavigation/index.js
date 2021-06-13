import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import {HomeScreen} from '../../view/home/homeScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.HOME}
        component={HomeScreen}
        options={{title: AppRouter.HOME, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
