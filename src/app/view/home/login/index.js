import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppRouter} from '../../../navigation/AppRouter';
import {postLogin} from '../../../../server/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useIsFocused} from '@react-navigation/native';

const colors = settings.colors;

export const Login = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [phone, setPhone] = useState('');
  const [passWord, setPassWord] = useState('');

  const [response, setResponse] = useState('');

  const [textError, setTextError] = useState('');
  const [isShowPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState('');

  useEffect(() => {
    if (isFocus) {
      getAccount();
    }
  }, []);

  useEffect(() => {
    console.log(user);
    if (user !== '' && user !== null) {
      console.log(user);
      setPhone(user[0]?.phone);
      setPassWord(user[0]?.password);
      setLoading(true);
      navigation.navigate(AppRouter.TAB);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (response !== '') {
      setLoading(false);
      if (response.length === 0) {
        setTextError('Sai mail hoặc mật khẩu');
      } else {
        saveAccount(response);
        navigation.navigate(AppRouter.TAB);
        setLoading(false);
      }
    }
  }, [response]);

  const saveAccount = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('currentUser', jsonValue);
    } catch (e) {
      console.log('Khong luu duoc');
    }
  };

  const getAccount = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const onChangePhone = text => {
    setPhone(text);
  };

  const onChangePassWord = text => {
    setPassWord(text);
  };

  const handleLogin = () => {
    setTextError('');
    if (phone.trim() === '') {
      setTextError('Không bỏ trống số điện thoại');
    } else {
      if (passWord.trim() === '') {
        setTextError('Không bỏ trống mật khẩu');
      } else {
        postData();
      }
    }
  };

  const postData = async () => {
    try {
      const data = await postLogin(phone, passWord);
      setResponse(data);
    } catch (error) {
      console.log(error);
    }
  };

  const missPassword = () => {
    Alert.alert('Quên mật khẩu', 'Mail: ' + phone + '\nPassword: ' + passWord);
  };

  const handleRegister = () => {
    navigation.navigate(AppRouter.REGISTER);
  };

  const checkError = () => {
    if (textError === '') {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ImageBackground
      source={require('../../../asset/images/bg-login.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar animated={true} barStyle={'light-content'} hidden={true} />
      <View style={{flex: 1}} />
      <View
        style={{
          width: '100%',
          paddingHorizontal: 15,
          paddingTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 26,
            color: '#fff',
            textAlign: 'left',
            marginBottom: -5,
          }}>
          Super{' '}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 26,
            color: '#fff',
            textAlign: 'left',
            marginBottom: -5,
          }}>
          Money
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}>
        <View
          style={[
            styles.viewInput,
            {borderColor: isLoading ? '#81C784' : colors.colorMain},
          ]}>
          <Icon
            type="FontAwesome5"
            name="phone-alt"
            style={{
              fontSize: 16,
              color: isLoading ? '#81C784' : colors.colorMain,
              marginLeft: 15,
            }}
          />
          <TextInput
            editable={!isLoading}
            keyboardType="phone-pad"
            placeholder={'Số điện thoại'}
            value={phone}
            onChangeText={text => {
              onChangePhone(text);
            }}
            style={styles.inputAccount}
          />
        </View>
        <View
          style={[
            styles.viewInput,
            {borderColor: isLoading ? '#81C784' : colors.colorMain},
          ]}>
          <Icon
            type="FontAwesome5"
            name="lock"
            style={{
              fontSize: 16,
              color: isLoading ? '#81C784' : colors.colorMain,
              marginLeft: 15,
            }}
          />

          <TextInput
            editable={!isLoading}
            secureTextEntry={!isShowPassword}
            placeholder={'Mật khẩu'}
            value={passWord}
            onChangeText={text => {
              onChangePassWord(text);
            }}
            style={styles.inputAccount}
          />
          <TouchableOpacity
            onPress={() => {
              {
                !isLoading ? setShowPassword(!isShowPassword) : '';
              }
            }}
            style={{
              flex: 1,
              paddingRight: 15,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              type="FontAwesome5"
              name={isShowPassword ? 'eye' : 'eye-slash'}
              style={{
                fontSize: 16,
                color: isLoading ? '#81C784' : colors.colorMain,
                marginLeft: 15,
              }}
            />
          </TouchableOpacity>
        </View>
        {checkError() && <Text style={styles.textError}>{textError}</Text>}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setLoading(true);
            handleLogin();
          }}
          style={[
            styles.viewInput,
            {
              backgroundColor: isLoading ? '#81C784' : colors.colorMain,
              borderWidth: 0,
            },
          ]}>
          {isLoading ? (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Image
                source={require('../../../asset/gif/loading.gif')}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </View>
          ) : (
            <Text style={styles.textLogin}>LOGIN</Text>
          )}
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', width: '65%', alignItems: 'center'}}>
          <View style={{flex: 1}} />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Text style={{color: '#fff'}}>Mày chưa có tài khoản?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleRegister();
            }}
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
            }}>
            <Text style={{color: isLoading ? '#81C784' : colors.colorMain}}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(250,250,250,1)',
    borderRadius: 18,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  logo: {
    width: '65%',
    height: undefined,
    resizeMode: 'center',
    aspectRatio: 2.5,
  },
  viewInput: {
    backgroundColor: '#fff',
    height: 45,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAccount: {
    borderRadius: 500,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 14,
  },
  textLogin: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  textError: {
    color: '#ef5350',
    fontSize: 14,
    marginTop: 10,
    width: '65%',
    marginBottom: -5,
  },
});
