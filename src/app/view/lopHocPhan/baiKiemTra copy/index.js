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
import {getBaiKiemTraGV} from '../../../../server/BaiKiemTra/getBaiKiemTraGV';
import {createBaiKT} from '../../../../server/BaiKiemTra/createBaiKT';
import {deleteBaiKT} from '../../../../server/BaiKiemTra/deleteBaiKT';

export const BaiKiemTra = ({params}) => {
  const nav = useNavigation();
  const focus = useIsFocused();
  const route = useRoute();
  const item = route.params.item;
  const MaLopPH = item.MaLopHP;
  const user = route.params.user;

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
    getData(MaLopPH);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Vừa focus vào là gọi refesh để lấy data
  useEffect(() => {
    if (focus) {
      onRefresh(MaLopPH);
    }
  }, [focus]);

  // Khi lấy data xong khi không load nữa
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // Gọi api lấy thông tin bài kiểm tra
  const getData = async data => {
    try {
      const res = await getBaiKiemTraGV(user[0].MaGV, data);
      setData(res.data);
    } catch (error) {
      //
    }
  };

  // Xóa bài kiểm tra
  const del = async data => {
    try {
      const res = await deleteBaiKT(data);
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
    del(item.MaBaiKT);
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

  // Nhấn nút thêm
  const createKT = () => {
    setModal(false);
    postData();

    setNgay('Chọn ngày');
    setThoiGian('Chọn thời gian');
    setTenBaiKT('');
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
          Lớp học phần: {route.params.item.TenLopHP}
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
          DANH SÁCH BÀI KIỂM TRA
        </Text>
      </View>

      {!loading ? (
        <>
          {data !== '' && data !== undefined && data.length !== 0 ? (
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
                height: 365,
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
                  THÊM BÀI KIỂM TRA
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
                Tên bài kiểm tra
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
                  placeholder="Tên bài kiểm tra"
                  placeholderTextColor="#8a817c"
                  value={tenBaiKT}
                  onChangeText={t => {
                    setTenBaiKT(t);
                  }}
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    marginVertical: 2,
                    color: '#000',
                    fontSize: 14,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: settings.colors.colorGreen,
                  marginLeft: 10,
                }}>
                Chọn ngày
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setDatePicker(true);
                }}
                style={{
                  marginTop: 5,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: settings.colors.colorBoderDark,
                  height: 50,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    height: 20,
                    marginLeft: 15,
                    color: ngay === 'Chọn ngày' ? '#8a817c' : '#000',
                  }}>
                  {ngay !== 'Chọn ngày' ? getStrDate(ngay) : 'Chọn ngày'}
                </Text>
              </TouchableOpacity>

              <View
                style={{marginLeft: 10, marginTop: 10, flexDirection: 'row'}}>
                <Text
                  style={{
                    color: settings.colors.colorGreen,
                  }}>
                  Chọn thời gian{' '}
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                    color: settings.colors.colorYouTube,
                  }}>
                  ( {thoiGian === 0 ? 'tính bằng phút' : minToTime(thoiGian)} )
                </Text>
              </View>

              <View style={{marginLeft: 10, marginTop: 5}}>
                <NumericInput
                  value={thoiGian}
                  onChange={value => {
                    console.log(value);
                    setThoiGian(value);
                  }}
                  minValue={0}
                  maxValue={200}
                  totalWidth={100}
                  totalHeight={40}
                  iconSize={25}
                  step={1}
                  inputStyle={{fontSize: 14}}
                  rounded
                  valueType="real"
                  textColor={settings.colors.colorThumblr}
                  iconStyle={{color: settings.colors.colorThumblr}}
                />
              </View>

              <View style={{height: 10}} />

              <TouchableOpacity
                onPress={() => {
                  createKT();
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
                  THÊM BÀI KIỂM TRA
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

      {datePicker && (
        <DateTimePickerModal
          isVisible={datePicker}
          mode="date"
          onConfirm={date => {
            setNgay(date);
            setDatePicker(false);
          }}
          onCancel={() => {
            setDatePicker(false);
          }}
        />
      )}
    </View>
  );
};
