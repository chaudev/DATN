import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import {settings} from '../../../config';
import {Icon} from 'native-base';
import {RenderItem} from './renderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../navigation/AppRouter';
import {useIsFocused} from '@react-navigation/native';
import {getCH} from '../../../../server/MonHoc/getCH';
import {deleteCH} from '../../../../server/MonHoc/deleteCH';
import {Header} from '../../../components/header';

export const CauHoi = ({params}) => {
  const nav = useNavigation();
  const focus = useIsFocused();
  const route = useRoute();
  const MaCD = route.params.item.MaCD;
  const MonHoc = route.params.monHoc;
  const user = route.params.user;

  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData(MaCD);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Vừa focus vào là gọi refesh để lấy data
  useEffect(() => {
    if (focus) {
      console.log('route.params: ', route.params);
      onRefresh(MaCD);
    }
  }, [focus]);

  // Khi lấy data xong khi không load nữa
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // Gọi api lấy danh sách câu hỏi theo mã môn học
  const getData = async data => {
    try {
      const res = await getCH(data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Xóa câu hỏi bằng mã câu hỏi
  const del = async data => {
    try {
      const res = await deleteCH(data);
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  // Nhấn vô item để nhảy qua trang thông tin
  const handlePressItem = item => {
    nav.navigate(AppRouter.INFO, {
      item: item,
      user: route.params.user,
    });
  };

  // Nhấn nút delete
  const deleteQuest = item => {
    del(item.MaCH);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />

      {!loading ? (
        <>
          {data !== '' && data !== undefined && data.length !== 0 ? (
            <View style={{backgroundColor: '#fff', flex: 1}}>
              <View style={{borderBottomWidth: 0.5, borderColor: '#CFD8DC'}}>
                <Text
                  style={{
                    marginLeft: '3%',
                    color: settings.colors.colorThumblr,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  CHỦ ĐỀ: {route.params.item.TenCD}
                </Text>
                <Text
                  style={{
                    marginLeft: '3%',
                    color: settings.colors.colorThumblr,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    fontSize: 14,
                  }}>
                  MÔN HỌC: {MonHoc.TenMonHoc}
                </Text>
              </View>
              <FlatList
                data={data}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <RenderItem
                    item={item}
                    data={data}
                    handle={handlePressItem}
                    handleDelete={deleteQuest}
                  />
                )}
                keyExtractor={item => item.MaCH}
                style={{flex: 1, paddingTop: 10, backgroundColor: '#fff'}}
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: 'red'}}>Không có câu hỏi</Text>
            </View>
          )}
          <View
            style={{
              width: '100%',
              height: 50,
              marginTop: -65,
              alignItems: 'flex-end',
              paddingRight: 15,
              marginBottom: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(AppRouter.AddExercise, {
                  item: route.params,
                  user: route.params.user,
                });
              }}
              activeOpacity={0.5}
              style={{
                width: 55,
                height: 55,
                borderRadius: 500,
                backgroundColor: settings.colors.colorMain,
                borderWidth: 0.5,
                borderColor: settings.colors.colorBoderDark,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="Entypo"
                name="plus"
                style={{fontSize: 24, color: '#fff', marginBottom: -2}}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../../asset/gif/load321.gif')}
            resizeMode="contain"
            style={{width: 100, height: 100}}
          />
        </View>
      )}
    </View>
  );
};
