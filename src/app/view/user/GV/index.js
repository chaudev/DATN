import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {settings} from '../../../config';
import {Icon} from 'native-base';
import {RenderItem} from './renderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../navigation/AppRouter';
import {useIsFocused} from '@react-navigation/native';
import {getGiangVien} from '../../../../server/User/getGiangVien';
import {deleteCH} from '../../../../server/MonHoc/deleteCH';

export const ListGV = () => {
  const nav = useNavigation();
  const focus = useIsFocused();
  const route = useRoute();
  const par = route.params;

  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Vừa focus vào là gọi refesh để lấy data
  useEffect(() => {
    if (focus) {
      onRefresh();
    }
  }, [focus]);

  // Khi lấy data xong khi không load nữa
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // Gọi api lấy danh sách câu hỏi theo mã môn học
  const getData = async () => {
    try {
      const res = await getGiangVien();
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
    //
  };

  // Nhấn nút delete
  const deleteQuest = item => {
    del(item.MaCH);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {!loading ? (
        <>
          {data !== '' && data !== undefined && data.length !== 0 ? (
            <View style={{backgroundColor: '#fff', flex: 1}}>
              <View>
                <Text
                  style={{
                    marginLeft: '3%',
                    color: settings.colors.colorThumblr,
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginTop: 10,
                  }}>
                  DANH SÁCH GIẢNG VIÊN
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
                keyExtractor={item => item.MaGV}
                style={{flex: 1, paddingTop: 10, backgroundColor: '#fff'}}
              />
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
                    // ----------------------------------------
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
