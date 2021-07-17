import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {settings} from '../../../config';
import {Icon, Fab} from 'native-base';
import {AppRouter} from '../../../navigation/AppRouter';
import {Header} from '../../../components/header';
import {RenderItem} from './renderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getCD} from '../../../../server/ChuDe/getCD';
import {createCD} from '../../../../server/ChuDe/createCD';
import {deleteCD} from '../../../../server/ChuDe/deleteCD';
import {getMH} from '../../../../server/MonHoc/getMH';

export const ListChuDe = () => {
  const nav = useNavigation();
  const route = useRoute();
  const MonHoc = route.params.item;
  const user = route.params.user;

  const [data, setData] = useState('');
  const [resPOST, setResPOST] = useState('');
  const [showModal, setModal] = useState(false);
  const [tenCD, setTenCD] = useState('');
  const [monHoc, setMonHoc] = useState(MonHoc.MaMH);
  const [listMonHoc, setListMonHoc] = useState('');

  // Lấy thông tin tài khoản đang đăng nhập vs danh sách môn học
  // Bất đồng bộ ---
  useEffect(() => {
    console.log('user: ', user);
    getMonHoc();
    getData();
  }, []);

  // Khi thêm thành công thì sẽ refesh lại
  useEffect(() => {
    if (resPOST !== '') {
      getData();
    }
  }, [resPOST]);

  // Lấy danh sách chủ đề
  const getData = async () => {
    try {
      const res = await getCD(user[0]?.MaGV, MonHoc.MaMH);
      console.log('data : ', res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy danh sách chủ đề
  const getMonHoc = async () => {
    try {
      const res = await getMH();
      setListMonHoc(res.data);
      console.log('Mon hoc: ', listMonHoc);
    } catch (error) {
      console.log(error);
    }
  };

  // Tạo môn chủ đề
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
    nav.navigate(AppRouter.QUESTION, {
      item: item,
      monHoc: MonHoc,
      user: user,
    });
  };

  // Nhấn nút thêm chủ đề
  const createChuDe = () => {
    setModal(false);
    postData();
    setMonHoc('Chọn môn học');
    setTenCD('');
  };

  // Nhấn nút xóa chủ đề
  const del = item => {
    postDel(item?.MaCD);
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: settings.colors.colorMain}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: '#CFD8DC',
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            marginLeft: '3%',
            color: settings.colors.colorThumblr,
            fontWeight: 'bold',
            marginBottom: 5,
            fontSize: 16,
            marginTop: 10,
          }}>
          DANH SÁCH CHỦ ĐỀ
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

      {data !== '' ? (
        <>
          {data.length !== 0 ? (
            <View style={{backgroundColor: '#fff', flex: 1}}>
              <FlatList
                data={data}
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
                style={{flex: 1, backgroundColor: '#fff'}}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}>
              <Text style={{fontSize: 14, color: 'red'}}>Không có chủ đề</Text>
            </View>
          )}

          {user[0]?.isAdmin !== undefined && (
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
        // -------------------
        // -------------------------- SHOW MODAL
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
                height: 195,
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
                Tên chủ đề
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

              <View style={{height: 5}} />

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
