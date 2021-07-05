import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBarPropsIOS,
} from 'react-native';
import {settings} from '../../../config';
import {Icon, Fab, Picker} from 'native-base';
import {AppRouter} from '../../../navigation/AppRouter';
import {Header} from '../../../components/header';
import {RenderItem} from './renderItem';
import {useNavigation} from '@react-navigation/native';

import {getCD} from '../../../../server/ChuDe/getCD';
import {createCD} from '../../../../server/ChuDe/createCD';
import {deleteCD} from '../../../../server/ChuDe/deleteCD';

import {getMH} from '../../../../server/MonHoc/getMH';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Picker} from '@react-native-picker/picker';

const {width: dW, height: dH} = Dimensions.get('window');

export const ListChuDe = () => {
  const nav = useNavigation();
  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [resPOST, setResPOST] = useState('');
  const [showModal, setModal] = useState(false);

  const [tenCD, setTenCD] = useState('');
  const [monHoc, setMonHoc] = useState('Chọn môn học');
  const [tiet, setTiet] = useState('');
  const [user, setUser] = useState('');

  const [listMonHoc, setListMonHoc] = useState('');

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMonHoc();
    getData();
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Lấy thông tin tài khoản đang đăng nhập vs danh sách môn học
  // Bất đồng bộ ---
  useEffect(() => {
    getAccount();
    getMonHoc();
    getData();
  }, []);

  useEffect(() => {
    if (user !== '') {
      console.log('user: ', user);
      getMonHoc();
      getData();
    }
  }, [user]);

  // Khi thêm thành công thì sẽ refesh lại
  useEffect(() => {
    if (resPOST !== '') {
      getData();
    }
  }, [resPOST]);

  // Khi lấy data xong thì không load nữa
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // Lấy thông tin tài khoản đang đăng nhập
  const getAccount = async () => {
    try {
      const res = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(res));
    } catch (e) {
      // error reading value
    }
  };

  // Lấy danh sách chủ đề
  const getData = async () => {
    try {
      const res = await getCD(user[0]?.MaGV);
      setData(res.data);
    } catch (error) {
      console.log(error);
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

  // Tạo môn học mới
  const postData = async () => {
    try {
      const res = await createCD(tenCD, monHoc, user[0]?.MaGV);
      setResPOST(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Xóa chủ đề
  const postDel = async data => {
    try {
      const res = await deleteCD(data);
      console.log('res: ', res);
    } catch (error) {
      console.log(error);
    }
  };

  // Nhấn vô item
  const handlePressItem = item => {
    console.log(item);
    nav.navigate(AppRouter.LISTEXERCISE, {
      item: item,
      user: user,
    });
  };

  // Nhấn nút thêm môn học
  const createChuDe = () => {
    setModal(false);
    postData();

    setMonHoc('Chọn môn học');
    setTenCD('');
  };

  // Nhấn nút xóa môn học
  const del = item => {
    postDel(item?.MaCD);
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: settings.colors.colorMain}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />

      {!loading ? (
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
                        fontSize: 16,
                      }}>
                      DANH SÁCH CHỦ ĐỀ
                    </Text>
                  </View>
                }
                data={data}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <RenderItem
                    item={item}
                    data={data}
                    handle={handlePressItem}
                    del={del}
                    user={user}
                  />
                )}
                keyExtractor={item => item.MaCD}
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
              <Text style={{fontSize: 14, color: 'red'}}>Không có data</Text>
            </View>
          )}

          {user[0]?.isAdmin !== undefined && parseInt(user[0]?.isAdmin) === 1 && (
            <Fab
              containerStyle={{}}
              style={{backgroundColor: settings.colors.colorMain}}
              position="bottomRight"
              onPress={() => {
                setModal(true);
              }}>
              <Icon name="plus" type="AntDesign" />
            </Fab>
          )}
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
                height: 280,
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
                  THÊM CHỦ ĐỀ
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
              <Text
                style={{
                  marginTop: 10,
                  color: settings.colors.colorGreen,
                  marginLeft: 10,
                }}>
                Tên môn học
              </Text>
              <View
                style={{
                  height: 50,
                  marginTop: 5,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: settings.colors.colorBoderDark,
                  borderRadius: 12,
                }}>
                <TextInput
                  placeholder="Tên chủ đề"
                  placeholderTextColor="#8a817c"
                  value={tenCD}
                  onChangeText={t => {
                    setTenCD(t);
                  }}
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    marginVertical: 2,
                    color: '#000',
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: settings.colors.colorGreen,
                  marginLeft: 10,
                }}>
                Số tín chỉ
              </Text>

              <View
                style={{
                  marginTop: 5,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: settings.colors.colorBoderDark,
                  height: 45,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    height: 20,
                    marginLeft: 10,
                    color: monHoc === 'Chọn môn học' ? '#8a817c' : '#000',
                  }}>
                  {monHoc === 'Chọn môn học' ? monHoc : ''}
                </Text>
                {listMonHoc !== '' && (
                  <Picker
                    selectedValue={monHoc}
                    mode="dialog"
                    style={{height: 45, width: dW - 65, marginLeft: -15}}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log('cac');
                      setMonHoc(itemValue);
                    }}>
                    {listMonHoc?.map(i => (
                      <Picker.Item label={i.TenMonHoc} value={i.MaMH} />
                    ))}
                  </Picker>
                )}
              </View>

              <View style={{height: 10}} />

              <TouchableOpacity
                onPress={() => {
                  createChuDe();
                }}
                activeOpacity={0.5}
                style={{
                  height: 50,
                  backgroundColor: settings.colors.colorGreen,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#ffF', fontSize: 14, fontWeight: 'bold'}}>
                  THÊM CHỦ ĐỀ
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
    </SafeAreaView>
  );
};
