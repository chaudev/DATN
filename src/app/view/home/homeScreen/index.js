import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {settings} from '../../../config';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DialogInput from '../components/Popup';

import {styles, mainStyles, body} from './homeStyle';

import {getHistory} from '../../../../server/loadMoney';
import {updateCurrentMoney} from '../../../../server/updateCurrentMoney';
import {addMoney} from '../../../../server/addMoney';

import 'intl';
import 'intl/locale-data/jsonp/en';

export const HomeScreen = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [currentMoney, setCurrentMoney] = useState(0);

  const [data, setData] = useState('');
  const [updateStatus, setStatus] = useState('');
  const [homeStatus, setHomeStatus] = useState('');

  const [refreshing, setRefreshing] = React.useState(false);

  const [isInput, setInput] = React.useState(false);
  const [inputHome, setInputHome] = React.useState(false);
  const [useFor, setUseFor] = React.useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData(getAccount());
    setStatus('');
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    setCurrentMoney(formatMoney(currentMoney));
    if (isFocus) {
      getAccount();
    }
  }, []);

  useEffect(() => {
    if (user !== '' && user !== undefined) {
      console.log(user);
      setPhone(user[0].phone);
      getData(user[0].phone);
    }
  }, [user]);

  useEffect(() => {
    if (data !== '' && data !== undefined) {
      console.log(data);
      setLoading(false);
      setCurrentMoney(formatMoney(parseInt(data[0]?.currentMoney)));
    }
  }, [data]);

  useEffect(() => {
    console.log(currentMoney);
    if (currentMoney === 'NaN') {
      setCurrentMoney(0);
    }
  }, [currentMoney]);

  useEffect(() => {
    if (updateStatus !== '' && updateStatus !== undefined) {
      Toast.show('Th??nh c??ng r???i nha', Toast.SHORT);
      onRefresh();
    }
  }, [updateStatus]);

  useEffect(() => {
    if (homeStatus !== '' && homeStatus !== homeStatus) {
      Toast.show('Th??nh c??ng r???i nha', Toast.SHORT);
      onRefresh();
    }
  }, [homeStatus]);

  const getData = async phone => {
    try {
      const data = await getHistory(phone);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurMon = async (phone, id, newMoney) => {
    try {
      const data = await updateCurrentMoney(phone, id, newMoney);
      setStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addHistory = async (
    phone,
    currentMoney,
    usedMoney,
    useFor,
    comment,
  ) => {
    try {
      const data = await addMoney(
        phone,
        currentMoney,
        usedMoney,
        useFor,
        comment,
      );
      setStatus(data);
    } catch (error) {
      console.log(error);
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

  const formatMoney = number => {
    return new Intl.NumberFormat('vn-VN').format(parseInt(number));
  };

  const getNum = num => {
    let newNum = num + '';
    if (newNum.length === 1) {
      return '0' + num;
    } else {
      return num;
    }
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <View
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor="#000"
            hidden={false}
          />
          <View style={styles.imgBackground}>
            <View style={styles.viewButton}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.topBtn, {paddingLeft: 10}]}>
                <Icon
                  type="AntDesign"
                  name="contacts"
                  style={{
                    fontSize: 22,
                    color: '#fff',
                  }}
                />
                <View style={{flex: 1, backgroundColor: 'blue'}} />
              </TouchableOpacity>
              <View style={{flex: 1}} />
              <Text style={styles.topTitle}>SUPER MONEY</Text>
              <View style={{flex: 1}} />
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.topBtn, {paddingRight: 10}]}>
                <Icon
                  type="Ionicons"
                  name="mail-unread-outline"
                  style={{
                    fontSize: 26,
                    color: '#fff',
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1, marginTop: -70}}>
            <View style={mainStyles.mainContainer}>
              <View>
                <View style={mainStyles.currenTitle}>
                  <Text style={mainStyles.title}>S??? ti???n hi???n t???i</Text>
                  <View style={{flex: 1}} />
                  <Icon
                    type="MaterialCommunityIcons"
                    name="card-account-details-star-outline"
                    style={mainStyles.cardIcon}
                  />
                </View>
                <View style={mainStyles.botContainer}>
                  <View style={mainStyles.botContainerX}>
                    <Text style={mainStyles.curMoney}>{currentMoney}??</Text>
                    <View style={{flex: 1}} />

                    <TouchableOpacity
                      onPress={() => {
                        setInput(true);
                      }}
                      style={{
                        height: 30,
                        justifyContent: 'flex-end',
                      }}>
                      <Icon
                        type="MaterialCommunityIcons"
                        name="heart-plus-outline"
                        style={{
                          fontSize: 24,
                          color: settings.colors.colorMain,
                          marginLeft: 15,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n nh??');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon
                    type="FontAwesome5"
                    name="house-damage"
                    style={body.icon}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  {' '}
                  Ti???n nh??{' '}
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n ??n');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon
                    type="Ionicons"
                    name="fast-food-outline"
                    style={body.icon}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n ??n
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n u???ng');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon type="Entypo" name="drink" style={body.icon} />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n u???ng
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n x??ng');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name="bike"
                    style={body.icon}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n x??ng
                </Text>
              </View>
              <View style={{flex: 1}} />
            </View>

            <View style={body.container}>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n n?????c');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon type="Ionicons" name="water" style={body.icon} />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n n?????c
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n ??i???n');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon
                    type="Ionicons"
                    name="logo-electron"
                    style={body.icon}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n ??i???n
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n m???ng');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon type="Ionicons" name="ios-wifi" style={body.icon} />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n m???ng
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setUseFor('Ti???n kh??c');
                    setInputHome(true);
                  }}
                  activeOpacity={0.5}
                  style={body.button}>
                  <Icon
                    type="MaterialIcons"
                    name="more-horiz"
                    style={body.icon}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#546E7A', marginTop: 5}}>
                  Ti???n kh??c
                </Text>
              </View>
              <View style={{flex: 1}} />
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(244,245,246)',
          }}>
          <Image
            source={require('../../../asset/gif/loading-super.gif')}
            style={{
              width: '100%',
              height: undefined,
              resizeMode: 'contain',
              aspectRatio: 1.5,
            }}
          />
        </View>
      )}

      <DialogInput
        isDialogVisible={isInput}
        title={'S??? ti???n m???i'}
        hintInput={'VD: 200000'}
        submitInput={input => {
          setInput(false);
          addHistory(phone, parseInt(input), 0, 'T???o m???i', 'Kh??ng c?? comment');
        }}
        closeDialog={() => {
          setInput(false);
        }}
        inputText={'xxxxxxx'}
      />

      <DialogInput
        isDialogVisible={inputHome}
        title={useFor}
        hintInput={'VD: 990000'}
        submitInput={input => {
          setInputHome(false);
          console.log(input);
          addHistory(
            phone,
            parseInt(parseInt(data[0]?.currentMoney) - parseInt(input)),
            parseInt(input),
            useFor,
            'Kh??ng c?? comment',
          );
        }}
        closeDialog={() => {
          setInputHome(false);
        }}
        inputText={'xxxxxxx'}
      />
    </View>
  );
};
