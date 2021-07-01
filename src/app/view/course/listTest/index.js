import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Modal,
  Settings,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {settings} from '../../../config';
import {Icon, Tab, Tabs, Textarea} from 'native-base';
import {i18n} from '../../../../i18n';

import {Header} from '../../../components/header';
import {Data} from './data';
import {RenderItem} from './renderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AppRouter} from '../../../navigation/AppRouter';

export const ListTest = ({params}) => {
  const nav = useNavigation();
  const route = useRoute();
  // const params = route.params.item;

  // const params = 'cac';

  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const [showModal, setModal] = useState(false);
  const [cauHoi, setCauHoi] = useState('');
  const [A, setA] = useState('');
  const [B, setB] = useState('');
  const [C, setC] = useState('');
  const [D, setD] = useState('');
  const [dapAn, setDapAn] = useState('');

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    const x = [];

    setData(Data);
  }, []);

  const handlePressItem = item => {
    //
    nav.navigate(AppRouter.INFO, {
      item: item,
    });
  };

  const handleAddQuest = () => {
    if (
      cauHoi === '' ||
      A === '' ||
      B === '' ||
      C === '' ||
      D === '' ||
      dapAn === ''
    ) {
      Alert.alert('Không thể thêm', 'Vui lòng điền đầy đủ thông tin');
    } else {
      setModal(false);
      let x = data;
      let y = {
        MaCauHoi: 'x' + data.length,
        TenCauHoi: cauHoi,
        A: A,
        B: B,
        C: C,
        D: D,
        DapAn: dapAn,
        MaChuDe: params,
        TrangThai: 0,
        MaGV: '0321',
      };
      x.push(y);
      setData(x);
      Toast.show('Thêm thành công', Toast.SHORT);
      initState();
    }
  };

  const initState = () => {
    setCauHoi('');
    setA('');
    setB('');
    setC('');
    setD('');
    setDapAn('');
  };

  const deleteQuest = item => {
    console.log(item);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <Header /> */}

      {params !== undefined && params !== null ? (
        <>
          {data !== '' ? (
            <View style={{backgroundColor: '#fff', flex: 1}}>
              <FlatList
                ListHeaderComponent={
                  <View>
                    <Text
                      style={{
                        marginLeft: '3%',
                        color: settings.colors.colorThumblr,
                        fontWeight: 'bold',
                        marginBottom: 5,
                        fontSize: 14,
                      }}>
                      DANH SÁCH BÀI KIỂM TRA {params.TenMonHoc}
                    </Text>
                  </View>
                }
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
                    nav.navigate(AppRouter.AddTest, {
                      item: params,
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
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: 'red'}}>Không có data</Text>
            </View>
          )}
        </>
      ) : (
        <>
          {data !== '' ? (
            <View style={{backgroundColor: '#fff', flex: 1}}>
              <FlatList
                ListHeaderComponent={
                  <View>
                    <Text
                      style={{
                        marginLeft: '3%',
                        color: settings.colors.colorThumblr,
                        fontWeight: 'bold',
                        marginBottom: 5,
                        fontSize: 14,
                      }}>
                      DANH SÁCH BÀI KIỂM TRA TẤT CẢ MÔN
                    </Text>
                  </View>
                }
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
                    nav.navigate(AppRouter.AddTest, {
                      item: params,
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
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: 'red'}}>Không có data</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};
