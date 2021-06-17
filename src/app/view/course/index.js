import React from 'react';
import {AppRouter} from '../../navigation/AppRouter';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ListObject} from '../../view/course/listObject';
import {ListExercise} from '../../view/course/listExercise';
import {InfomationQuestion} from '../../view/course/listExercise/infoQuest';

const Stack = createStackNavigator();

function CourseNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.LISTOBJECT}
        options={{title: AppRouter.LISTOBJECT, headerShown: false}}
        component={ListObject}
      />
      <Stack.Screen
        name={AppRouter.LISTEXERCISE}
        options={{title: AppRouter.LISTEXERCISE, headerShown: false}}
        component={ListExercise}
      />
      <Stack.Screen
        name={AppRouter.INFO}
        options={{title: AppRouter.INFO, headerShown: false}}
        component={InfomationQuestion}
      />
    </Stack.Navigator>
  );
}

export {CourseNav};
