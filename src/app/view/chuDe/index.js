import React from 'react';
import {AppRouter} from '../../navigation/AppRouter';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ListChuDe} from '../chuDe/ListChuDe';

const Stack = createStackNavigator();

function ChuDeNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.LISTCD}
        options={{headerShown: false}}
        component={ListChuDe}
      />
    </Stack.Navigator>
  );
}

export {ChuDeNav};
