import React from 'react';
import {AppRouter} from '../../navigation/AppRouter';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ListObject} from '../../view/course/listObject';
import {ListExercise} from '../../view/course/listExercise';
import {InfomationQuestion} from '../../view/course/listExercise/infoQuest';
import {AddExercise} from '../../view/course/listExercise/addExercise';
import {AddAnswer} from '../../view/course/listExercise/addExercise/addAnswer';
import {AddTest} from './listTest/addTest';
import {QuestToTest} from './listTest/addTest/addQestToTest';
import {TabHeader} from './Tab';
import {EditQuest} from './listExercise/infoQuest/editQuest';
import {EditAnswer} from './listExercise/infoQuest/editQuest/editAnswer';

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
        component={TabHeader}
      />
      <Stack.Screen
        name={AppRouter.INFO}
        options={{title: AppRouter.INFO, headerShown: false}}
        component={InfomationQuestion}
      />
      <Stack.Screen
        name={AppRouter.AddExercise}
        options={{title: AppRouter.AddExercise, headerShown: false}}
        component={AddExercise}
      />
      <Stack.Screen
        name={AppRouter.AddAnswer}
        options={{title: AppRouter.AddAnswer, headerShown: false}}
        component={AddAnswer}
      />
      <Stack.Screen
        name={AppRouter.AddTest}
        options={{title: AppRouter.AddExercise, headerShown: false}}
        component={AddTest}
      />
      <Stack.Screen
        name={AppRouter.QuestToTest}
        options={{title: AppRouter.AddAnswer, headerShown: false}}
        component={QuestToTest}
      />
      <Stack.Screen
        name={AppRouter.EditQuest}
        options={{title: AppRouter.AddAnswer, headerShown: false}}
        component={EditQuest}
      />
      <Stack.Screen
        name={AppRouter.EditAnswer}
        options={{title: AppRouter.AddAnswer, headerShown: false}}
        component={EditAnswer}
      />
    </Stack.Navigator>
  );
}

export {CourseNav};
