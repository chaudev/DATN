import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
  StatusBar,
  TextInput,
} from 'react-native';
import {settings} from '../../../../config';
import {Icon, Picker} from 'native-base';
import {Header} from '../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../../navigation/AppRouter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NumericInput from 'react-native-numeric-input';
import {updateBaiKT} from '../../../../../server/BaiKiemTra/updateBaiKT';

export const InfomationQuestion = () => {
  const nav = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  const user = route.params.user;

  const [showModal, setModal] = useState(false);
  const [tenBaiKT, setTenBaiKT] = useState(item.TenBaiKT);
  const [ngay, setNgay] = useState(new Date(item.Ngay));
  const [thoiGian, setThoiGian] = useState(0);
  const [datePicker, setDatePicker] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    console.log('params: ', route.params);
    timeToNumber(item.ThoiGianLam);
  }, []);

  const editBaiKT = async () => {
    try {
      const res = await updateBaiKT(
        item.MaBaiKT,
        tenBaiKT,
        getDate(ngay),
        user[0]?.MaGV,
        minToTime(thoiGian),
      );
      setModal(false);
    } catch (error) {
      //
    }
  };

  const edit = () => {
    setModal(true);
    // nav.navigate(AppRouter.EditQuest, {
    //   item: item,
    //   user: user,
    // });
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

  //
  const timeToNumber = time => {
    console.log(time);
    const num = parseInt(time[0] + time[1]) * 60 + parseInt(time[3] + time[4]);
    setThoiGian(parseInt(num));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header user={user} />

      {item !== undefined ? (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Icon
              type="MaterialCommunityIcons"
              name="book-open-variant"
              style={{
                fontSize: 24,
                color: settings.colors.colorGreen,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                color: settings.colors.colorGreen,
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 10,
              }}>
              CHI TIẾT BÀI KIỂM TRA
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 10,
              borderBottomWidth: 0.5,
              borderColor: '#CFD8DC',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Tên bài:
              </Text>
              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 16}}>
                {tenBaiKT}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Key:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{item.KeyBaiKT}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Lớp học phần:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{item.TenLopHP}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Môn học:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{route.params.TenMH}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Ngày:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{getStrDate(ngay)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
                marginBottom: 10,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Thời gian
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>
                {minToTime(thoiGian)} ({thoiGian} phút)
              </Text>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', marginLeft: 10, marginVertical: 5}}>
            <Text style={{fontSize: 14, color: settings.colors.colorThumblr}}>
              Số câu hỏi: xxx
            </Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
              DANH SÁCH CÂU HỎI
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(AppRouter.ADDQUEST, {
                  MaMH: route.params.MaMH,
                  BaiKiemTra: item,
                  user: user,
                });
              }}
              activeOpacity={0.5}
              style={{
                height: 45,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: settings.colors.colorGreen,
                marginBottom: 10,
                borderRadius: 10,
                flex: 1,
              }}>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                THÊM CÂU HỎI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                edit();
              }}
              activeOpacity={0.5}
              style={{
                width: 80,
                height: 45,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: settings.colors.colorGreen,
                marginBottom: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                SỬA
              </Text>
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
                  editBaiKT();
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
                  LƯU THÔNG TIN
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
