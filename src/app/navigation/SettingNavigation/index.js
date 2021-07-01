import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import {UserScreen} from '../../view/setting';
import {Login} from '../../view/home/login';
import {ProfileUpdate} from '../../view/setting/updateProfile';

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.USER}
        component={UserScreen}
        options={{title: AppRouter.USER, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.UPDATE}
        component={ProfileUpdate}
        options={{title: AppRouter.UPDATE, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.LOGIN}
        options={{
          title: AppRouter.LOGIN,
          headerShown: false,
          headerTransparent: true,
        }}
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
