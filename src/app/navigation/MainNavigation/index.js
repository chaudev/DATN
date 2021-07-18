import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import TabNavigator from '../TabNavigation/index';
import {ChangePassword} from '../../view/profile/changePassword';
import {UpdateProfile} from '../../view/profile/updateProfile';

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={AppRouter.TAB}
      headerMode="none"
      screenOptions={{
        headerTransparent: true,
      }}>
      <Stack.Screen
        name={AppRouter.TAB}
        options={{title: AppRouter.TAB, headerShown: false}}
        component={TabNavigator}
      />
      <Stack.Screen
        name={AppRouter.CHANGEPASS}
        options={{title: AppRouter.CHANGEPASS, headerShown: false}}
        component={ChangePassword}
      />
      <Stack.Screen
        name={AppRouter.PROFILE}
        options={{title: AppRouter.PROFILE, headerShown: false}}
        component={UpdateProfile}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
