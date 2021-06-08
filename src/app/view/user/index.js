import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {settings} from '../../config';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-async-storage/async-storage';

import 'intl';
import 'intl/locale-data/jsonp/en';

export const UserScreen = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    if (isFocus) {
      getAccount();
    }
  }, []);

  useEffect(() => {
    if (user !== '') {
      setLoading(false);
    }
  }, [user]);

  const getAccount = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const getAvatar = async () => {
    console.log(user[0]);
    if (user[0].avatar !== '' && user[0].avatar !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {!loading ? (
        <ScrollView style={{width: '100%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 10,
                textAlign: 'left',
              }}>
              {user[0].name}
            </Text>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
              }}>
              <Icon
                type="Entypo"
                name="log-out"
                style={{
                  fontSize: 22,
                  color: '#000',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{height: 100, backgroundColor: 'red', marginTop: 10}}>
            {getAvatar() ? (
              <Image
                source={require('../../asset/images/bg-login.jpg')}
                style={{width: 50, height: 50}}
              />
            ) : (
              <Image
                source={require('../../asset/images/bg-login.jpg')}
                style={{width: 50, height: 50}}
              />
            )}
          </View>

          <View style={{flex: 1}} />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(244,245,246)',
          }}>
          <Image
            source={require('../../asset/gif/loading-super.gif')}
            style={{
              width: '100%',
              height: undefined,
              resizeMode: 'contain',
              aspectRatio: 1.5,
            }}
          />
        </View>
      )}
    </View>
  );
};
