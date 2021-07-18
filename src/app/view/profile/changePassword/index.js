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
import {Icon} from 'native-base';
import {settings} from '../../../../app/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateGV} from '../../../../server/GiangVien/updateGV';
import {updateSV} from '../../../../server/SinhVien/updateSV';
import Toast from 'react-native-simple-toast';

export const ChangePassword = () => {
  const nav = useNavigation();
  const focused = useIsFocused();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAgainPassword, setShowAgainPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState('');

  // Focus vo thi chay
  useEffect(() => {
    if (focused) {
      getAccount();
    }
  }, [focused]);

  useEffect(() => {
    console.log(user.xxx);
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
          user.TenGV,
          parseInt(user.GIoiTinh),
          user.DiaChi,
          newPassword,
        );
        setLoading(false);
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
          user.TenSV,
          parseInt(user.GioiTinh),
          user.DiaChi,
          newPassword,
        );
        setLoading(false);
        res.status === 'Thành công'
          ? Toast.show('Thành công', Toast.SHORT)
          : Toast.show('Không thành công', Toast.SHORT);
        nav.goBack();
      } catch (e) {
        //
      }
    }
  };

  // RENDER
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
      <View style={{flex: 2, alignItems: 'center', backgroundColor: '#aaedad'}}>
        <Image
          source={require('../../../asset/images/chau-at-password.png')}
          resizeMode="contain"
          style={{width: '90%', height: undefined, aspectRatio: 1}}
        />
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: '#fff',
          borderRadius: 20,
          marginTop: -20,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'SVN-Ready',
            marginLeft: 10,
            marginTop: 10,
            color: settings.colors.colorGreen,
          }}>
          Đổi mật khẩu
        </Text>
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
            placeholder="Mật khẩu cũ"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={t => {
              setCurrentPassword(t);
            }}
            style={{
              borderRadius: 10,
              flex: 1,
              paddingLeft: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowCurrentPassword(!showCurrentPassword);
            }}
            style={{
              height: '100%',
              width: 50,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 10,
            }}>
            <Icon
              type="FontAwesome5"
              name={showCurrentPassword ? 'eye' : 'eye-slash'}
              style={{color: '#607D8B', fontSize: 14}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 45,
            borderWidth: 0.5,
            borderColor: '#CFD8DC',
            marginHorizontal: 10,
            marginTop: 20,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="Mật khẩu mới"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={t => {
              setNewPassword(t);
            }}
            style={{
              borderRadius: 10,
              flex: 1,
              paddingLeft: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowNewPassword(!showNewPassword);
            }}
            style={{
              height: '100%',
              width: 50,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 10,
            }}>
            <Icon
              type="FontAwesome5"
              name={showNewPassword ? 'eye' : 'eye-slash'}
              style={{color: '#607D8B', fontSize: 14}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 45,
            borderWidth: 0.5,
            borderColor: '#CFD8DC',
            marginHorizontal: 10,
            marginTop: 20,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={!showAgainPassword}
            value={againPassword}
            onChangeText={t => {
              setAgainPassword(t);
            }}
            style={{
              borderRadius: 10,
              flex: 1,
              paddingLeft: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowAgainPassword(!showAgainPassword);
            }}
            style={{
              height: '100%',
              width: 50,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 10,
            }}>
            <Icon
              type="FontAwesome5"
              name={showAgainPassword ? 'eye' : 'eye-slash'}
              style={{color: '#607D8B', fontSize: 14}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}} />

        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              setLoading(true);
              console.log(currentPassword.trim());
              if (currentPassword.trim() === '') {
                Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu cũ');
              } else {
                if (newPassword.trim() === '') {
                  Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu mới');
                } else {
                  if (againPassword.trim() === '') {
                    Alert.alert('Thông báo', 'Vui lòng xác nhận nhập mật');
                  } else {
                    if (newPassword.trim() !== againPassword.trim()) {
                      Alert.alert('Thông báo', 'Xác nhận mật khẩu không đúng');
                    } else {
                      postData();
                    }
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
          <Text style={{color: '#fff', fontSize: 14}}>ĐỔI MẬT KHẨU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
