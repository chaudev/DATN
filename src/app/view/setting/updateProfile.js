import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';

import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';

import {launchImageLibrary} from 'react-native-image-picker';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

import {settings} from '../../config';

let colors = settings.colors;

export const ProfileUpdate = () => {
  let url = 'https://bom.to/02HE45bT9BR2M';

  const [link, setLink] = useState('');

  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
  }, []);

  useEffect(() => {
    if (link !== '') {
      console.log(link);
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

    // launchImageLibrary({ options }, response => {
    //   if (!response.didCancel) {
    //     setLink(response.uri);
    //   }
    // });
  };

  const handleUpdate = () => {
    console.log('Update Profile');
  };

  const handleChangePassword = () => {
    console.log('Change Password');
  };

  const handleLogOut = () => {
    console.log('Log out');
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
      <Text>Run</Text>
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
  },
  headerView: {
    height: 125,
    width: '100%',
    backgroundColor: colors.mainColor,
  },
  btnAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    alignItems: 'flex-end',
  },
  fakeView: {
    width: 250,
    height: 250,
    borderRadius: 500,
    marginTop: -170,
    marginLeft: -200,
    backgroundColor: colors.mainColor,
  },
  fakeViewA: {
    width: 100,
    height: 100,
    marginTop: -100,
    borderRadius: 500,
    marginLeft: 200,
    backgroundColor: colors.mainColor,
  },
  fakeViewB: {
    width: '100%',
    height: 10,
    backgroundColor: '#F5F5F5',
    opacity: 0.5,
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
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 5,
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
