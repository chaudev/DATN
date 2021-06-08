import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {settings} from '../../config';

import HomeNavigation from '../HomeNavigation';
import HistoryNavigation from '../HistoryNavigation';
import UserNavigation from '../UserNavigation';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'HOME') {
            iconName = 'home';
            return <Entypo name={iconName} size={22} color={color} />;
          }
          if (route.name === 'HISTORY') {
            iconName = 'history';
            return <Fontisto name={iconName} size={18} color={color} />;
          }
          if (route.name === 'USER') {
            iconName = 'settings-outline';
            return <Ionicons name={iconName} size={22} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: settings.colors.colorMain,
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name="HOME" component={HomeNavigation} />
      <Tab.Screen name="HISTORY" component={HistoryNavigation} />
      <Tab.Screen name="USER" component={UserNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
