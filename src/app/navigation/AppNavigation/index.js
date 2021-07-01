import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from '../TabNavigation/index';
import {Login} from '../../view/home/login';
import {Loading} from '../../view/loading';
import {AppRouter} from '../AppRouter';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {activate} from '../../../../store/reducers/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function AppNavigation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector(state => state.user.isActivated);

  useEffect(() => {
    loadOption();
  }, []);

  const loadOption = async () => {
    setLoading(true);
    getAccount();
    await new Promise(a => setTimeout(a, 500));
    setLoading(false);
  };

  const getAccount = async () => {
    try {
      const res = await AsyncStorage.getItem('currentUser');
      console.log('user: ', res);
      if (res !== undefined && res !== '' && res !== null) {
        dispatch(activate(true));
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          headerTransparent: true,
        }}>
        {loading ? (
          <Stack.Screen
            name={AppRouter.LOADING}
            options={{title: AppRouter.LOGIN, headerShown: false}}
            component={Loading}
          />
        ) : !isAuth ? (
          <Stack.Screen
            name={AppRouter.LOGIN}
            options={{
              title: AppRouter.LOGIN,
              headerShown: false,
              headerTransparent: true,
            }}
            component={Login}
          />
        ) : (
          <Stack.Screen
            name={AppRouter.TAB}
            options={{title: AppRouter.TAB, headerShown: false}}
            component={HomeNavigation}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
