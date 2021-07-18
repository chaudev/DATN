import React, {useEffect, useState} from 'react';

import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {settings} from '../../config';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import {activate} from '../../../../store/reducers/userSlice';

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

import {AppRouter} from '../../navigation/AppRouter';

let colors = settings.colors;

export const UserScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [link, setLink] = useState('');
  const [url, setURL] = useState('https://bom.to/02HE45bT9BR2M');

  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
  }, []);

  useEffect(() => {
    if (link !== '') {
      console.log('link: ', link);
      setURL(link);
    }
  }, [link]);

  const handleChangeAvatar = () => {
    console.log('Change Avatar');

    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
      didCancel: true,
    };

    launchImageLibrary({options}, response => {
      if (!response?.didCancel) {
        setLink(response?.assets[0]?.uri);
      }
    });
  };

  const handleUpdate = () => {
    navigation.navigate(AppRouter.PROFILE);
  };

  const handleChangePassword = () => {
    navigation.navigate(AppRouter.CHANGEPASS);
  };

  const handleLogOut = () => {
    deleteAccount();
    dispatch(activate(false));
  };

  const deleteAccount = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
    } catch (e) {
      console.log('Khong xoa duoc');
    }
  };

  const getImage = () => {
    if (url !== '') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnBack}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: 'flex-start',
          }}>
          <Icon
            type="Ionicons"
            name="arrow-undo-sharp"
            style={{
              fontSize: 30,
              color: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.fakeView} />
      <View style={styles.fakeViewA} />
      <View style={styles.fakeViewC} />
      <View style={styles.viewImageContainer}>
        <View style={styles.viewImage}>
          {getImage() ? (
            <Image source={{uri: url}} style={styles.imgAvatar} />
          ) : (
            <Image
              source={require('../../asset/images/bg-header.jpg')}
              style={styles.imgAvatar}
            />
          )}
        </View>
      </View>
      <View style={body.containerX}>
        <View style={body.fakeView} />
        <View style={styles.infoContainer}>
          <View style={{width: '65%'}}>
            <Text numberOfLines={1} style={styles.textName}>
              Nguyễn Phúc Bảo Châu
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                type="Ionicons"
                name="mail-unread-outline"
                style={{
                  fontSize: 20,
                  color: '#000',
                  marginRight: 5,
                }}
              />
              <Text numberOfLines={1} style={styles.textMail}>
                baochau@gmail.com
              </Text>
            </View>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity
            onPress={() => {
              handleChangeAvatar();
            }}
            activeOpacity={0.4}
            style={styles.btnAvatar}>
            <Icon
              type="MaterialIcons"
              name="cloud-upload"
              style={{
                fontSize: 30,
                color: '#fff',
                marginRight: 5,
              }}
            />
            <Text style={styles.txtAvatar}>Avatar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fakeViewB} />
      <ScrollView style={body.xBody}>
        <View style={{marginTop: 5}}>
          <View style={body.container}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[body.button, {paddingTop: 0}]}
              onPress={() => {
                handleUpdate();
              }}>
              <View style={body.viewIcon}>
                <Icon
                  type="AntDesign"
                  name="profile"
                  style={{
                    fontSize: 18,
                    color: '#fff',
                  }}
                />
              </View>
              <Text style={{fontSize: 14, marginLeft: 10, flex: 10}}>
                Update profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={body.button}
              onPress={() => {
                handleChangePassword();
              }}>
              <View
                style={[body.viewIcon, {backgroundColor: colors.colorBlue}]}>
                <Icon
                  type="FontAwesome"
                  name="lock"
                  style={{
                    fontSize: 20,
                    color: '#fff',
                  }}
                />
              </View>
              <Text style={{fontSize: 14, marginLeft: 10, flex: 10}}>
                Change password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={body.button}
              onPress={() => {
                handleChangePassword();
              }}>
              <View
                style={[body.viewIcon, {backgroundColor: colors.colorWeChat}]}>
                <Icon
                  type="Entypo"
                  name="feather"
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    marginRight: -2,
                  }}
                />
              </View>
              <Text style={{fontSize: 14, marginLeft: 10, flex: 10}}>
                Giao diện
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={body.button}
              onPress={() => {
                handleChangePassword();
              }}>
              <View
                style={[
                  body.viewIcon,
                  {backgroundColor: colors.colorFacebook},
                ]}>
                <Icon
                  type="MaterialIcons"
                  name="language"
                  style={{
                    fontSize: 20,
                    color: '#fff',
                  }}
                />
              </View>
              <Text style={{fontSize: 14, marginLeft: 10, flex: 10}}>
                Ngôn ngữ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={body.button}
              onPress={() => {
                handleChangePassword();
              }}>
              <View
                style={[body.viewIcon, {backgroundColor: colors.colorTwitter}]}>
                <Icon
                  type="FontAwesome"
                  name="info"
                  style={{
                    fontSize: 18,
                    color: '#fff',
                  }}
                />
              </View>
              <Text style={{fontSize: 14, marginLeft: 10, flex: 10}}>
                Thông tin ứng dụng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[body.button, {borderBottomWidth: 0, paddingBottom: 0}]}
              onPress={() => {
                handleLogOut();
              }}>
              <View
                style={[body.viewIcon, {backgroundColor: colors.colorThumblr}]}>
                <Icon
                  type="Entypo"
                  name="log-out"
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    marginRight: -5,
                  }}
                />
              </View>
              <Text style={{fontSize: 14, marginLeft: 10, flex: 10}}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  txtAvatar: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  headerView: {
    height: 125,
    width: '100%',
    backgroundColor: colors.mainColor,
  },
  btnAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.colorWhatsApp,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 500,
  },
  viewMaster: {
    flex: 1,
    paddingLeft: 5,
  },
  viewMasterCol: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  imgAvatar: {
    width: 90,
    height: 90,
    borderRadius: 500,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -2,
    marginTop: -2,
  },
  textName: {
    color: '#37474F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textMail: {
    color: '#37474F',
    fontSize: 12,
    marginLeft: 2,
  },
  btnBack: {
    width: '100%',
    height: 70,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fakeView: {
    width: 250,
    height: 250,
    borderRadius: 500,
    marginTop: -170,
    marginLeft: -200,
    backgroundColor: colors.colorGreen,
  },
  fakeViewA: {
    width: 100,
    height: 100,
    marginTop: -100,
    borderRadius: 500,
    marginLeft: 200,
    backgroundColor: colors.colorTwitter,
  },
  fakeViewB: {
    width: '100%',
    height: 10,
    backgroundColor: '#F5F5F5',
    opacity: 0.5,
  },
  fakeViewC: {
    width: 60,
    height: 60,
    marginTop: 0,
    marginBottom: -60,
    borderRadius: 500,
    marginLeft: -50,
    backgroundColor: colors.colorRed,
  },
  viewImage: {
    width: 90,
    height: 90,
    borderRadius: 500,
    borderWidth: 2,
    borderColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  viewImageContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: -50,
  },
});

const body = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 13,
  },
  xBody: {
    flex: 3,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ECEFF1',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  containerX: {
    width: '100%',
    marginTop: 10,
    paddingBottom: 15,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  viewIcon: {
    alignItems: 'flex-start',
    backgroundColor: colors.colorYouTube,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 500,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#CFD8DC',
    paddingVertical: 10,
  },
  fakeView: {
    width: '100%',
    height: 7,
    backgroundColor: '#fff',
    marginTop: -5,
  },
});
