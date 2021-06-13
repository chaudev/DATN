import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import {CalendarScreen} from '../../view/calendar';

const Stack = createStackNavigator();

const CalendarNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.HISTORY}
        component={CalendarScreen}
        options={{title: AppRouter.HISTORY, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigation;
