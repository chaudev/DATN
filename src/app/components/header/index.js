import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {settings} from '../../config';
import {Icon} from 'native-base';
import {i18n} from '../../../i18n';
import {useNavigation} from '@react-navigation/native';
import {mainStyles, QLMH, styleTK} from '../../view/home/homeScreen/styles';

export const Header = ({GOTO, user}) => {
  const nav = useNavigation();

  return (
    <View
      style={{
        height: 60,
        width: '100%',
        backgroundColor: settings.colors.colorMain,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={settings.colors.colorMain}
        hidden={false}
      />
      <TouchableOpacity
        onPress={() => {
          if (GOTO !== undefined && GOTO !== null) {
            nav.naigate(GOTO);
          } else {
            nav.goBack();
          }
        }}
        activeOpacity={0.5}
        style={{
          backgroundColor: settings.colors.colorMain,
          borderRadius: 500,
          width: 27,
          height: 27,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#fff',
        }}>
        <Icon
          type="MaterialIcons"
          name="keyboard-arrow-left"
          style={{color: '#fff', fontSize: 24, marginLeft: -2}}
        />
      </TouchableOpacity>
      <View style={{flex: 1, height: 60, justifyContent: 'center'}}>
        <Text style={[mainStyles.title, {fontWeight: 'bold', fontSize: 10}]}>
          {user[0]?.TenGV !== undefined ? 'Giáo viên' : 'Sinh viên'}
        </Text>
        <Text style={[mainStyles.title, {marginTop: 2, fontSize: 14}]}>
          {user[0]?.TenGV} {user[0]?.TenSV}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          height: 60,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingLeft: 15,
        }}>
        <Icon
          type="Ionicons"
          name="ios-notifications-circle"
          style={{
            fontSize: 32,
            color: '#fff',
            marginRight: -3,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
