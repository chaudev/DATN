import React from 'react';
import {View, Text} from 'react-native';
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
          if (route.name === 'HISTORY') {
            iconName = 'history';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Fontisto
                  name={iconName}
                  size={18}
                  color={color}
                  style={{marginBottom: -2}}
                />
                <Text style={{color: color, fontSize: 12}}>Home 2</Text>
              </View>
            );
          }
          if (route.name === 'USER') {
            iconName = 'settings-outline';
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{marginBottom: -2}}
                />
                <Text style={{color: color, fontSize: 12}}>Home 2</Text>
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
      <Tab.Screen name="HISTORY" component={HistoryNavigation} />
      <Tab.Screen name="USER" component={UserNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
