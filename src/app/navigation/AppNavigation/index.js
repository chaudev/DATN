import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from '../TabNavigation/index';
import {Login} from '../../view/home/login';
import {Register} from '../../view/home/register';
import {AppRouter} from '../AppRouter';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={AppRouter.LOGIN}
          options={{title: AppRouter.LOGIN, headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name={AppRouter.REGISTER}
          options={{title: AppRouter.REGISTER, headerShown: false}}
          component={Register}
        />
        <Stack.Screen
          name={AppRouter.TAB}
          options={{title: AppRouter.TAB, headerShown: false}}
          component={HomeNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
