import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {settings} from '../../config';

import HomeNavigation from '../HomeNavigation';
import CalendarNavigation from '../CalendarNavigation';
import SettingNavigation from '../SettingNavigation';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'HOME') {
            iconName = 'home';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Entypo
                  name={iconName}
                  size={22}
                  color={color}
                  style={{marginBottom: -2}}
                />
                <Text style={{color: color, fontSize: 12}}>Home</Text>
              </View>
            );
          }
          if (route.name === 'CALENDAR') {
            iconName = 'calendar';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome
                  name={iconName}
                  size={18}
                  color={color}
                  style={{marginBottom: 2}}
                />
                <Text style={{color: color, fontSize: 12}}>Lịch kiểm tra</Text>
              </View>
            );
          }
          if (route.name === 'SETTING') {
            iconName = 'settings-outline';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{marginBottom: -2}}
                />
                <Text style={{color: color, fontSize: 12}}>Cài đặt</Text>
              </View>
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: settings.colors.colorMain,
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name="HOME" component={HomeNavigation} />
      <Tab.Screen name="CALENDAR" component={CalendarNavigation} />
      <Tab.Screen name="SETTING" component={SettingNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
