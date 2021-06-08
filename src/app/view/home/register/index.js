import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Alert} from 'react-native';

import {Icon} from 'native-base';

// import {settings} from '~/app/config';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {AppRouter} from '~/app/navigation/AppRouter';

// const colors = settings.colors;

export const Register = ({navigation, route}) => {
  const [account, setAccount] = useState('');
  const [passWord, setPassWord] = useState('');
  const [rePassWord, setRePassWord] = useState('');

  const [response, setResponse] = useState('');

  const onChangeAccount = text => {
    setAccount(text);
  };

  const onChangePassWord = text => {
    setPassWord(text);
  };

  const onChangeRePassWord = text => {
    setRePassWord(text);
  };

  const handleRegister = () => {
    if (account.trim() === '' || passWord.trim() === '') {
      Alert.alert('Lỗi 70', 'Vui lòng nhập đầy đủ');
    } else {
      if (passWord === rePassWord) {
        Alert.alert('Register', 'Mail: ' + account + '\nPassword: ' + passWord);
      } else {
        Alert.alert('Lỗi 69', 'Mật khẩu đéo khớp');
      }
    }
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.mainScreen}>
        <Image
          source={require('../../../asset/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.viewInput}>
          <Icon
            type="FontAwesome5"
            name="user-alt"
            style={{fontSize: 16, color: colors.colorTwitter, marginLeft: 15}}
          />
          <TextInput
            keyboardType="phone-pad"
            placeholder={'Số điện thoại'}
            value={account}
            onChangeText={text => {
              onChangeAccount(text);
            }}
            style={styles.inputAccount}
          />
        </View>
        <View style={styles.viewInput}>
          <Icon
            type="FontAwesome5"
            name="lock"
            style={{fontSize: 16, color: colors.colorTwitter, marginLeft: 15}}
          />
          <TextInput
            secureTextEntry={true}
            placeholder={'Mật khẩu'}
            value={passWord}
            onChangeText={text => {
              onChangePassWord(text);
            }}
            style={styles.inputAccount}
          />
        </View>
        <View style={styles.viewInput}>
          <Icon
            type="FontAwesome5"
            name="lock"
            style={{fontSize: 16, color: colors.colorTwitter, marginLeft: 15}}
          />
          <TextInput
            secureTextEntry={true}
            placeholder={'Nhập lại mật khẩu'}
            value={rePassWord}
            onChangeText={text => {
              onChangeRePassWord(text);
            }}
            style={styles.inputAccount}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleRegister();
          }}
          style={[
            styles.viewInput,
            {backgroundColor: colors.colorTwitter, borderWidth: 0},
          ]}>
          <Text style={styles.textLogin}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', width: '65%', alignItems: 'center'}}>
          <View style={{flex: 1}} />
          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginLeft: 10,
            }}>
            <Text style={{color: colors.colorWeChat}}>Quay lại đăng nhập?</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainScreen: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: '65%',
    height: undefined,
    resizeMode: 'center',
    aspectRatio: 2.5,
  },
  viewInput: {
    backgroundColor: '#fff',
    width: '65%',
    height: 45,
    marginTop: 15,
    borderRadius: 500,
    borderWidth: 1,
    // borderColor: colors.colorTwitter,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAccount: {
    borderRadius: 500,
    flex: 1,
    marginLeft: 5,
    marginRight: 20,
    fontSize: 14,
  },
  textLogin: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});
