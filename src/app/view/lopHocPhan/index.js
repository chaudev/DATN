import React from 'react';
import {AppRouter} from '../../navigation/AppRouter';
import {createStackNavigator} from '@react-navigation/stack';
import {ListLopHP} from '../lopHocPhan/listLopPH';
import {BaiKiemTra} from '../lopHocPhan/baiKiemTra';
import {InfomationQuestion} from './baiKiemTra/infoQuest';
import {EditQuest} from './baiKiemTra/infoQuest/editQuest';
import {EditAnswer} from './baiKiemTra/infoQuest/editQuest/editAnswer';
import {ThemCauHoi} from './baiKiemTra/addQuestion';
import {SinhVien} from './sinhVien';
import {ThemSinhvVien} from './sinhVien/addSinhVien';

const Stack = createStackNavigator();

function LopHocPhanNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRouter.LISTCD}
        options={{headerShown: false}}
        component={ListLopHP}
      />
      <Stack.Screen
        name={AppRouter.QUESTION}
        options={{headerShown: false}}
        component={BaiKiemTra}
      />
      <Stack.Screen
        name={AppRouter.INFO}
        options={{title: AppRouter.INFO, headerShown: false}}
        component={InfomationQuestion}
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
      <Stack.Screen
        name={AppRouter.ADDQUEST}
        options={{title: AppRouter.AddAnswer, headerShown: false}}
        component={ThemCauHoi}
      />
      <Stack.Screen
        name={AppRouter.SINHVIEN}
        options={{title: AppRouter.SINHVIEN, headerShown: false}}
        component={SinhVien}
      />
      <Stack.Screen
        name={AppRouter.ADDSINHVIEN}
        options={{title: AppRouter.ADDSINHVIEN, headerShown: false}}
        component={ThemSinhvVien}
      />
    </Stack.Navigator>
  );
}

export {LopHocPhanNav};
