import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {settings} from '../../../config';
import {AppRouter} from '../../../navigation/AppRouter';
import {Header} from '../../../components/header';
import {RenderItem} from './renderItem';
import {useNavigation} from '@react-navigation/native';
import {getMH} from '../../../../server/MonHoc/getMH';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const MonHoc = () => {
  const nav = useNavigation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [listMonHoc, setListMonHoc] = useState('');

  // Lấy thông tin tài khoản đang đăng nhập vs danh sách môn học
  // Bất đồng bộ ---
  useEffect(() => {
    getAccount();
  }, []);

  // Khi user thay đổi
  useEffect(() => {
    if (user !== '') {
      getMonHoc();
    }
  }, [user]);

  // Khi lấy data xong thì không load nữa
  useEffect(() => {
    if (listMonHoc !== '') {
      setLoading(false);
    }
  }, [listMonHoc]);

  // Lấy thông tin tài khoản đang đăng nhập
  const getAccount = async () => {
    try {
      const res = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(res));
    } catch (e) {
      // error reading value
    }
  };

  // Lấy danh sách môn học
  const getMonHoc = async () => {
    try {
      const res = await getMH();
      setListMonHoc(res.data);
      console.log('Mon hoc: ', listMonHoc);
    } catch (error) {
      console.log(error);
    }
  };

  // Nhấn vô item
  const handlePressItem = item => {
    console.log(item);
    nav.navigate(AppRouter.LISTCD, {
      item: item,
      user: user,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: settings.colors.colorMain}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />

      {!loading ? (
        <>
          <View style={{backgroundColor: '#fff', flex: 1}}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', height: 45}}>
              <Text
                style={{
                  flex: 1,
                  marginLeft: '3%',
                  color: settings.colors.colorThumblr,
                  fontWeight: 'bold',
                  marginBottom: 5,
                  fontSize: 16,
                  marginTop: 10,
                }}>
                DANH SÁCH CHỦ ĐỀ
              </Text>
            </View>

            <FlatList
              data={listMonHoc}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              numColumns={2}
              renderItem={({item}) => (
                <RenderItem
                  item={item}
                  data={listMonHoc}
                  handle={handlePressItem}
                  user={user}
                />
              )}
              keyExtractor={item => item.MaMH}
              style={{flex: 1, backgroundColor: '#fff', marginTop: -5}}
            />
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <Image
            source={require('../../../asset/gif/load321.gif')}
            resizeMode="contain"
            style={{width: 100, height: 100}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
