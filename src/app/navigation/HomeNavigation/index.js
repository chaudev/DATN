import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import {HomeScreen} from '../../view/home/homeScreen';
import {CourseNav} from '../../view/course';
import {ListExercise} from '../../view/course/listExercise';
import {TabHeader} from '../../view/course/Tab';
import {ChuDeNav} from '../../view/chuDe';
import {User} from '../../view/user';

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
      <Stack.Screen
        name={AppRouter.TAB}
        component={TabHeader}
        options={{title: AppRouter.TAB, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.USER}
        component={User}
        options={{title: AppRouter.USER, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.LISTCD}
        component={ChuDeNav}
        options={{title: AppRouter.LISTCD, headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
