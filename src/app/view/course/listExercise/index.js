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
import {Icon, Picker, Textarea} from 'native-base';
import {i18n} from '../../../../i18n';

import {Header} from '../../../components/header';
import {Data} from './data';
import {RenderItem} from './renderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AppRouter} from '../../../navigation/AppRouter';

export const ListExercise = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params.item;

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
    if (params !== 'all') {
      for (var i = 0; i < Data.length; i++) {
        if (params.MaMonHoc === Data[i].MaChuDe) {
          x.push(Data[i]);
        }
      }
      setData(x);
    } else {
      setData(Data);
    }
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
      <Header />

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
                  DANH SÁCH CÂU HỎI MÔN {params.TenMonHoc}
                </Text>
              </View>
            }
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            keyExtractor={item => item.id}
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
                setModal(true);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="rgba(0,0,0,1)"
          hidden={false}
          animated={true}
        />
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Text
            onPress={() => {
              setModal(false);
            }}
            style={{flex: 1}}
          />
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <Text
              onPress={() => {
                setModal(false);
              }}
              style={{flex: 1}}
            />
            <View
              style={{
                width: '90%',
                backgroundColor: '#fff',
                height: 400,
                borderRadius: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: settings.colors.colorGreen,
                    fontSize: 16,
                    fontWeight: 'bold',
                    flex: 1,
                  }}>
                  THÊM BÀI TẬP
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                  }}
                  style={{
                    height: '100%',
                    paddingLeft: 20,
                  }}>
                  <Icon
                    type="AntDesign"
                    name="close"
                    style={{
                      fontSize: 24,
                      color: settings.colors.colorGreen,
                      marginBottom: -2,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <Text
                  style={{
                    marginTop: 10,
                    color: settings.colors.colorGreen,
                    marginLeft: 10,
                  }}>
                  CÂU HỎI
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: settings.colors.colorBoderDark,
                    borderRadius: 12,
                  }}>
                  <Textarea
                    rowSpan="3"
                    placeholder="Nhập câu hỏi"
                    placeholderTextColor="#B0BEC5"
                    style={{fontSize: 14}}
                    value={cauHoi}
                    onChangeText={t => {
                      setCauHoi(t);
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: settings.colors.colorGreen,
                    marginLeft: 10,
                  }}>
                  ĐÁP ÁN A
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: settings.colors.colorBoderDark,
                    height: 45,
                    borderRadius: 12,
                  }}>
                  <TextInput
                    placeholder="Nhập đáp án A"
                    placeholderTextColor="#B0BEC5"
                    value={A}
                    onChangeText={t => {
                      setA(t);
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginVertical: 2,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: settings.colors.colorGreen,
                    marginLeft: 10,
                  }}>
                  ĐÁP ÁN B
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: settings.colors.colorBoderDark,
                    height: 45,
                    borderRadius: 12,
                  }}>
                  <TextInput
                    placeholder="Nhập đáp án B"
                    placeholderTextColor="#B0BEC5"
                    value={B}
                    onChangeText={t => {
                      setB(t);
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginVertical: 2,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: settings.colors.colorGreen,
                    marginLeft: 10,
                  }}>
                  ĐÁP ÁN C
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: settings.colors.colorBoderDark,
                    height: 45,
                    borderRadius: 12,
                  }}>
                  <TextInput
                    placeholder="Nhập đáp án C"
                    placeholderTextColor="#B0BEC5"
                    value={C}
                    onChangeText={t => {
                      setC(t);
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginVertical: 2,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: settings.colors.colorGreen,
                    marginLeft: 10,
                  }}>
                  ĐÁP ÁN D
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: settings.colors.colorBoderDark,
                    height: 45,
                    borderRadius: 12,
                  }}>
                  <TextInput
                    placeholder="Nhập đáp án D"
                    placeholderTextColor="#B0BEC5"
                    value={D}
                    onChangeText={t => {
                      setD(t);
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginVertical: 2,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: settings.colors.colorGreen,
                    marginLeft: 10,
                  }}>
                  ĐÁP ÁN ĐÚNG
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: settings.colors.colorBoderDark,
                    height: 45,
                    borderRadius: 12,
                  }}>
                  <TextInput
                    placeholder="Nhập đáp án đúng"
                    placeholderTextColor="#B0BEC5"
                    value={dapAn}
                    onChangeText={t => {
                      setDapAn(t);
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginVertical: 2,
                    }}
                  />
                </View>
                <View style={{height: 50}} />
              </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  handleAddQuest();
                }}
                activeOpacity={0.5}
                style={{
                  height: 45,
                  backgroundColor: settings.colors.colorGreen,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#ffF', fontSize: 14, fontWeight: 'bold'}}>
                  THÊM CÂU HỎI
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              onPress={() => {
                setModal(false);
              }}
              style={{flex: 1}}
            />
          </View>
          <Text
            onPress={() => {
              setModal(false);
            }}
            style={{flex: 1}}
          />
        </View>
      </Modal>
    </View>
  );
};
