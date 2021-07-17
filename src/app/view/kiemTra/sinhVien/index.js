import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import {settings} from '../../../config';
import {Icon} from 'native-base';
import {RenderItem} from './renderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../navigation/AppRouter';
import {useIsFocused} from '@react-navigation/native';
import {Header} from '../../../components/header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NumericInput from 'react-native-numeric-input';

// API
import {getCTLopHP} from '../../../../server/LopHP/getCTLopHP';
// import {createBaiKT} from '../../../../server/BaiKiemTra/createBaiKT';
import {deleteSV} from '../../../../server/LopHP/deleteSV';

export const SinhVien = ({}) => {
  const nav = useNavigation();
  const focus = useIsFocused();
  const route = useRoute();
  const params = route.params;
  const LopHP = params.LopHP;
  const user = params.user;

  const [showModal, setModal] = useState(false);
  const [tenBaiKT, setTenBaiKT] = useState('');
  const [ngay, setNgay] = useState(new Date());
  const [thoiGian, setThoiGian] = useState(0);

  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const [datePicker, setDatePicker] = useState(false);

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

  // Gọi api lấy thông tin bài kiểm tra
  const getData = async () => {
    try {
      const res = await getCTLopHP(LopHP.MaLopHP);
      setData(res.data);
    } catch (error) {
      //
    }
  };

  // Xóa bài kiểm tra
  const del = async data => {
    try {
      const res = await deleteSV(LopHP.MaLopHP, data);
      console.log('res: ', res);
      onRefresh();
    } catch (error) {
      //
    }
  };

  // Nhấn vô
  const handlePressItem = data => {
    nav.navigate(AppRouter.INFO, {
      item: data,
      TenMH: item.TenMonHoc,
      MaMH: item.MaMH,
      user: route.params.user,
    });
  };

  // Nhấn nút delete
  const deleteQuest = item => {
    console.log(item);
    del(item.MaSV);
  };

  // Gọi api tạo mới
  const postData = async () => {
    try {
      const res = await createBaiKT(
        tenBaiKT,
        getDate(ngay),
        user[0]?.MaGV,
        MaLopPH,
        minToTime(thoiGian),
      );
      onRefresh();
    } catch (error) {
      //
    }
  };

  // vậy đó
  const getNum = num => {
    return num < 10 ? '0' + num : num;
  };

  // Lấy ra dạng ngay-tháng-năm
  const getStrDate = date => {
    const newDate = new Date(date);
    return (
      getNum(newDate.getDate()) +
      '-' +
      getNum(newDate.getMonth() + 1) +
      '-' +
      newDate.getFullYear()
    );
  };

  // Lấy ra dạng năm-tháng-ngày
  const getDate = date => {
    const newDate = new Date(date);
    return (
      newDate.getFullYear() +
      '-' +
      getNum(newDate.getMonth() + 1) +
      '-' +
      getNum(newDate.getDate())
    );
  };

  // num to time
  const minToTime = n => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return getNum(rhours) + ':' + getNum(rminutes) + ':' + '00';
  };

  // Render screen
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />

      <View>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: '3%',
            color: settings.colors.colorThumblr,
            fontWeight: 'bold',
            marginBottom: -5,
            fontSize: 14,
            zIndex: 999,
            marginTop: 10,
          }}>
          Lớp học phần: {LopHP.TenLopHP}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: '3%',
            color: settings.colors.colorThumblr,
            fontWeight: 'bold',
            marginBottom: -5,
            fontSize: 16,
            zIndex: 999,
            marginTop: 10,
          }}>
          DANH SÁCH SINH VIÊN
        </Text>
      </View>

      {data !== '' ? (
        <>
          {data !== undefined && data.length !== 0 ? (
            <View style={{backgroundColor: '#fff', flex: 1}}>
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
                keyExtractor={item => item.MaBaiKT}
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
                nav.navigate(AppRouter.ADDSINHVIEN, {
                  LopHP: LopHP,
                  user: user,
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
