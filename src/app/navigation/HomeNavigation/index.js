import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import {HomeScreen} from '../../view/home/homeScreen';
import {CourseNav} from '../../view/course';
import {ListExercise} from '../../view/course/listExercise';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.HOME}
        component={HomeScreen}
        options={{title: AppRouter.HOME, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.COURSE}
        component={CourseNav}
        options={{title: AppRouter.COURSE, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.ALLEXERCISE}
        component={ListExercise}
        options={{title: AppRouter.ALLEXERCISE, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
