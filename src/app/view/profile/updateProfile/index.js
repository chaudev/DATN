import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Icon, CheckBox} from 'native-base';
import {settings} from '../../../../app/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateGV} from '../../../../server/GiangVien/updateGV';
import {updateSV} from '../../../../server/SinhVien/updateSV';
import Toast from 'react-native-simple-toast';

export const UpdateProfile = () => {
  const nav = useNavigation();
  const focused = useIsFocused();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [isNam, setIsNam] = useState(false);
  const [isNu, setIsNu] = useState(false);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState('');

  // Focus vo thi chay
  useEffect(() => {
    if (focused) {
      getAccount();
    }
  }, [focused]);

  useEffect(() => {
    console.log(user);
    user.TenGV !== undefined
      ? setFullName(user?.TenGV)
      : setFullName(user?.TenSV);

    if (parseInt(user.GIoiTinh) === 0) {
      setGioiTinh('nam');
    } else {
      setGioiTinh('nu');
    }

    setAddress(user.DiaChi);

    // parseInt(user.GIoiTinh) === 0 ? setIsNam(true) : setIsNu(true);
  }, [user]);

  // Get user in phone
  const getAccount = async () => {
    try {
      const res = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(res)[0]);
    } catch (e) {
      // error reading value
    }
  };

  // Call api
  const postData = async () => {
    if (user.isAdmin !== undefined) {
      try {
        const res = await updateGV(
          user.MaGV,
          fullName,
          parseInt(getNum()),
          address,
          user.Password,
        );
        setLoading(false);
        console.log(res);
        res.status === 'Thành công'
          ? Toast.show('Thành công', Toast.SHORT)
          : Toast.show('Không thành công', Toast.SHORT);
        nav.goBack();
      } catch (e) {
        //
      }
    } else {
      try {
        const res = await updateSV(
          user.MaSV,
          fullName,
          parseInt(getNum()),
          address,
          user.Password,
        );
        setLoading(false);
        console.log(res);
        res.status === 'Thành công'
          ? Toast.show('Thành công', Toast.SHORT)
          : Toast.show('Không thành công', Toast.SHORT);
        nav.goBack();
      } catch (e) {
        //
      }
    }
  };

  //
  const getNum = () => {
    if (isNam === true) {
      return 0;
    } else {
      return 1;
    }
  };

  //
  const setGioiTinh = x => {
    if (x === 'nam') {
      setIsNu(false);
      setIsNam(true);
    } else {
      setIsNu(true);
      setIsNam(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {user !== '' ? (
        <>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              marginBottom: -50,
              zIndex: 999,
            }}>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={{color: '#fff', fontSize: 24}}
            />
          </TouchableOpacity>
          <View
            style={{flex: 2, alignItems: 'center', backgroundColor: '#aaedad'}}>
            <Image
              source={require('../../../asset/images/chau-at-profile.png')}
              resizeMode="contain"
              style={{width: '90%', height: undefined, aspectRatio: 1}}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginTop: -70,
              paddingBottom: 20,
              paddingRight: 10,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'SVN-Ready',
                marginLeft: 10,
                marginTop: 10,
                color: settings.colors.colorGreen,
              }}>
              Đổi thông tin
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: '#fff',
              borderRadius: 20,
              marginTop: -10,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'SVN-Ready',
                marginLeft: 10,
                marginTop: 10,
                color: settings.colors.colorGreen,
              }}>
              Nhập thông tin mới
            </Text>

            <View
              style={{
                height: 45,
                borderWidth: 0.5,
                borderColor: '#CFD8DC',
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="Họ tên"
                value={fullName}
                onChangeText={t => {
                  setFullName(t);
                }}
                style={{
                  borderRadius: 10,
                  flex: 1,
                  paddingLeft: 10,
                }}
              />
            </View>

            <View
              style={{
                marginTop: 15,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setGioiTinh('nam');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  checked={isNam}
                  onPress={() => {
                    setGioiTinh('nam');
                  }}
                  color={
                    isNam
                      ? settings.colors.colorGreen
                      : settings.colors.colorThumblr
                  }
                  style={{width: 14, height: 14, borderRadius: 500}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 17,
                    color: isNam
                      ? settings.colors.colorGreen
                      : settings.colors.colorThumblr,
                  }}>
                  Nam
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGioiTinh('nu');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <CheckBox
                  checked={isNu}
                  onPress={() => {
                    setGioiTinh('nu');
                  }}
                  color={
                    isNu
                      ? settings.colors.colorGreen
                      : settings.colors.colorThumblr
                  }
                  style={{width: 14, height: 14, borderRadius: 500}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 17,
                    color: isNu
                      ? settings.colors.colorGreen
                      : settings.colors.colorThumblr,
                  }}>
                  Nữ
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 45,
                borderWidth: 0.5,
                borderColor: '#CFD8DC',
                marginHorizontal: 10,
                marginTop: 15,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="Địa chỉ"
                value={address}
                onChangeText={t => {
                  setAddress(t);
                }}
                style={{
                  borderRadius: 10,
                  flex: 1,
                  paddingLeft: 10,
                }}
              />
            </View>

            <View style={{flex: 1}} />

            <TouchableOpacity
              onPress={() => {
                if (!loading) {
                  setLoading(true);
                  if (fullName.trim() === '') {
                    Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
                  } else {
                    if (isNam === false && isNu === false) {
                      Alert.alert('Thông báo', 'Vui lòng chọn giới tính');
                    } else {
                      if (address.trim() === '') {
                        Alert.alert('Thông báo', 'Vui lòng xác nhập địa chỉ');
                      } else {
                        postData();
                      }
                    }
                  }
                }

                setLoading(false);
              }}
              style={{
                marginHorizontal: 10,
                marginBottom: 10,
                borderRadius: 12,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: loading
                  ? settings.colors.colorMain
                  : settings.colors.colorGreen,
              }}>
              <Text style={{color: '#fff', fontSize: 14}}>CẬP NHẬT</Text>
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
