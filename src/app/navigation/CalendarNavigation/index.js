import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouter} from '../AppRouter';
import {CalendarScreen} from '../../view/calendar';
import {InfomationQuestion} from '../../view/lopHocPhan/baiKiemTra/infoQuest';
import {ThemCauHoi} from '../../view/lopHocPhan/baiKiemTra/addQuestion';

const Stack = createStackNavigator();

const CalendarNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.HISTORY}
        component={CalendarScreen}
        options={{title: AppRouter.HISTORY, headerShown: false}}
      />
      <Stack.Screen
        name={AppRouter.INFO}
        options={{title: AppRouter.INFO, headerShown: false}}
        component={InfomationQuestion}
      />
      <Stack.Screen
        name={AppRouter.ADDQUEST}
        options={{title: AppRouter.AddAnswer, headerShown: false}}
        component={ThemCauHoi}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigation;
