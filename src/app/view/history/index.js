import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  onRefresh,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  Picker,
} from 'react-native';
import {Icon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {settings} from '../../config';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHistory} from '../../../server/loadMoney';
import {getHistoryOldToNew} from '../../../server/loadMoneyOldToNew';

import 'intl';
import 'intl/locale-data/jsonp/en';

export const HistoryScreen = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [oldData, setOldData] = useState('');
  const [data, setData] = useState('');

  const [showPicker, setShowPicker] = useState(true);
  const [pickerValue, setPickerValue] = useState('');
  const [pickerNewValue, setPickerNewValue] = useState('');

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
    console.log(pickerValue);
    // setData([]);
    let a = [];
    if (pickerValue === 'Tất cả') {
      setData(oldData);
    } else {
      for (var i = 0; i < oldData.length; i++) {
        console.log(i);
        if (oldData[i].useFor === pickerValue) {
          console.log('bang ne');
          a.push(oldData[i]);
        }
      }
      setData(a);
    }
  }, [pickerValue]);

  useEffect(() => {
    console.log(pickerNewValue);
    if (pickerNewValue === 'Mới đến cũ') {
      getData(phone);
    } else {
      getDataOldToNew(phone);
    }
  }, [pickerNewValue]);

  useEffect(() => {
    if (data !== '' && data !== undefined) {
      console.log('data thay doi: ', data);
      setLoading(false);
    }
  }, [data]);

  const getData = async phone => {
    try {
      const data = await getHistory(phone);
      setData(data);
      setOldData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataOldToNew = async phone => {
    try {
      const data = await getHistoryOldToNew(phone);
      setData(data);
      setOldData(data);
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

  const getDateString = date => {
    let newDate = new Date(date);
    return (
      getNum(newDate.getDate()) +
      '-' +
      getNum(newDate.getMonth() + 1) +
      '-' +
      newDate.getFullYear()
    );
  };

  const getNum = num => {
    let newNum = num + '';
    if (newNum.length === 1) {
      return '0' + num;
    } else {
      return num;
    }
  };

  const renderItem = ({item}) => {
    const getMarginTop = () => {
      if (item.id === data[0].id) {
        return 5;
      } else {
        return 0;
      }
    };

    const marginBottom = () => {
      if (item.id === data[data.length - 1].id) {
        return 25;
      } else {
        return 15;
      }
    };
    return (
      <View
        style={{
          marginTop: getMarginTop(),
          marginHorizontal: 10,
          marginBottom: marginBottom(),
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}>
        <Text
          style={{
            flex: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 3,
            color: '#1b4332',
          }}>
          {item.useFor}
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <Icon
              type="MaterialIcons"
              name="date-range"
              style={{
                fontSize: 24,
                color: settings.colors.colorMain,
              }}
            />
          </View>
          <Text style={{flex: 10, fontSize: 14}}>
            Ngày: {getDateString(item.date)}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <Icon
              type="MaterialCommunityIcons"
              name="emoticon-confused-outline"
              style={{
                fontSize: 24,
                color: settings.colors.colorMain,
              }}
            />
          </View>
          <Text style={{flex: 10, fontSize: 14}}>
            Số tiền: {formatMoney(item.usedMoney)}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <View style={{flex: 1}}>
            <Icon
              type="MaterialCommunityIcons"
              name="currency-usd-circle-outline"
              style={{
                fontSize: 24,
                color: settings.colors.colorMain,
              }}
            />
          </View>
          <Text style={{flex: 10, fontSize: 14}}>
            Còn lại: {formatMoney(item.currentMoney)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      {!loading ? (
        <>
          <View
            style={{
              width: '100%',
              height: 45,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: 100,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <Icon
                type="Ionicons"
                name="chevron-back"
                style={{
                  fontSize: 24,
                  color: settings.colors.colorMain,
                }}
              />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: settings.colors.colorMain,
              }}>
              LỊCH SỬ
            </Text>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{
                width: 100,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: 10,
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="sort"
                style={{
                  fontSize: 22,
                  color: settings.colors.colorMain,
                }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
              width: '100%',
              paddingHorizontal: 10,
              flex: 0.1,
              marginTop: 1,
              paddingVertical: 5,
              backgroundColor: '#fff',
              shadowColor: '#000',
              marginBottom: -5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <Picker
              mode="dialog"
              selectedValue={showPicker}
              style={{height: 25, width: 160}}
              onValueChange={(itemValue, itemIndex) =>
                setPickerValue(itemValue)
              }>
              <Picker.Item label="Tất cả" value="Tất cả" />
              <Picker.Item label="Tạo mới" value="Tạo mới" />
              <Picker.Item label="Tiền nhà" value="Tiền nhà" />
              <Picker.Item label="Tiền ăn" value="Tiền ăn" />
              <Picker.Item label="Tiền uống" value="Tiền uống" />
              <Picker.Item label="Tiền xăng" value="Tiền xăng" />
              <Picker.Item label="Tiền nước" value="Tiền nước" />
              <Picker.Item label="Tiền điện" value="Tiền điện" />
              <Picker.Item label="Tiền mạng" value="Tiền mạng" />
              <Picker.Item label="Tiền khác" value="Tiền khác" />
            </Picker>

            <Picker
              mode="dialog"
              selectedValue={showPicker}
              style={{height: 25, width: 160}}
              onValueChange={(itemValue, itemIndex) =>
                setPickerNewValue(itemValue)
              }>
              <Picker.Item label="Mới đến cũ" value="Mới đến cũ" />
              <Picker.Item label="Cũ đến mới" value="Cũ đến mới" />
            </Picker>
          </ScrollView>
          <View style={{flex: 25, width: '100%'}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{flex: 1, paddingTop: 10}}
            />
          </View>
        </>
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
            source={require('../../asset/gif/loading-super.gif')}
            style={{
              width: '100%',
              height: undefined,
              resizeMode: 'contain',
              aspectRatio: 1.5,
            }}
          />
        </View>
      )}
    </View>
  );
};
