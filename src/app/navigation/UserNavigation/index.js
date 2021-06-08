import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppRouter} from '../AppRouter';

import {UserScreen} from '../../view/user';

const Stack = createStackNavigator();

const UserNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.USER}
        component={UserScreen}
        options={{title: AppRouter.USER, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
