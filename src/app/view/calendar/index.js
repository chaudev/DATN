import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {useIsFocused, useNavigation} from '@react-navigation/native'; // Cái này trong Document của Navigation
import {settings} from '../../config';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {RenderItem} from './renderItem';
import {dataFake} from './data';
import {CalendarTheme, HeaderStyles, MainStyles, LoadingStyles} from './styles';
import {getTestByDate} from '../../../server/calen/getTestByDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRouter} from '../../navigation/AppRouter';
import {getAllTest} from '../../../server/calen/getAllTest';

const {width: dW, height: dH} = Dimensions.get('window'); // Lấy width và height của màn hình điện thoại

export const CalendarScreen = ({navigation}) => {
  const nav = useNavigation();

  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const dateNow = new Date();
  const [dateSelected, setDateSelected] = useState('');
  const [calendarShow, setCalendar] = useState(true);
  const [dataNull, setDataNull] = useState(false);
  const [user, setUser] = useState('');

  const [dataAll, setDataAll] = useState('');
  const [dataMark, setDataMark] = useState('');

  // Định dạng lại thư viện calendar
  LocaleConfig.locales['VN'] = {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th 1',
      'Th 2',
      'Th 3',
      'Th 4',
      'Th 5',
      'Th 6',
      'Th 7',
      'Th 8',
      'Th 9',
      'Th 10',
      'Th 11',
      'Th 12',
    ],
    dayNames: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
  };
  LocaleConfig.defaultLocale = 'VN';

  // Khi vào màn hình thì sẽ chạy
  useEffect(async () => {
    if (isFocus) {
      await setDateSelected(dateNow);
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (user != '') {
      getData(user[0]?.MaGV, getStrDay(dateSelected));
      getAllData(user[0]?.MaGV);
    }
  }, [user]);

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Khi data thay đổi thì sẽ chạy
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // Khi refreshing thay đổi thì sẽ chạy
  useEffect(() => {
    if (refreshing === true) {
      getData(user[0]?.MaGV, getStrDay(dateSelected));
    }
  }, [refreshing]);

  // Khi dateSelected thay đổi thì sẽ chạy
  useEffect(() => {
    getData(user[0]?.MaGV, getStrDay(dateSelected));

    if (dataAll !== '') {
      let temp = dataAll.map(x => x.Ngay);

      let flag = 0;

      let json = {...temp};

      json = Object.assign({}, temp);

      json = temp.reduce((json, value, key) => {
        key = value;
        key = value;
        value != dateSelected
          ? (json[key] = {marked: true, dotColor: 'red'})
          : (json[key] = {
              color: '#000',
              textColor: 'white',
              endingDay: true,
              startingDay: true,
            });

        if (value == dateSelected) {
          flag = 1;
        }

        return json;
      }, {});

      setDataMark(json);

      if (flag == 0) {
        let test = {
          [dateSelected]: {
            color: '#000',
            textColor: 'white',
            endingDay: true,
            startingDay: true,
          },
        };
        var oxo = Object.assign({}, json, test);
        setDataMark(oxo);
      }
    }
  }, [dateSelected]);

  const getStrDay = date => {
    let dax = new Date(date);
    return (
      dax.getFullYear() +
      '-' +
      getNum(parseInt(dax.getMonth()) + 1) +
      '-' +
      getNum(dax.getDate())
    );
  };

  // lấy api chổ này
  const getData = async (MaGV, Ngay) => {
    try {
      const res = await getTestByDate(MaGV, Ngay);
      setData(res?.data);
    } catch (error) {
      //
    }
  };

  // lấy api chổ này
  const getAllData = async MaGV => {
    try {
      const res = await getAllTest(MaGV);
      setDataAll(res?.data);

      let temp = res?.data.map(x => x.Ngay);

      let json = {...temp};

      json = Object.assign({}, temp);

      json = temp.reduce((json, value, key) => {
        key = value;
        key = value;
        value != dateSelected
          ? (json[key] = {marked: true, dotColor: 'red'})
          : (json[key] = {
              color: '#000',
              textColor: 'white',
              endingDay: true,
              startingDay: true,
            });
        return json;
      }, {});

      setDataMark(json);
    } catch (error) {
      //
    }
  };

  const getAccount = async () => {
    try {
      const res = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(res));
    } catch (e) {
      // error reading value
    }
  };

  // Format ngày tháng năm bằng cơm
  const getStringDate = date => {
    let newDate = new Date(date);
    return (
      newDate.getFullYear() +
      '-' +
      getNum(newDate.getMonth() + 1) +
      '-' +
      getNum(newDate.getDate())
    );
  };

  // Nếu số là 4 sẽ thành 04
  const getNum = num => {
    let newNum = num + '';
    if (newNum.length === 1) {
      return '0' + num;
    } else {
      return num;
    }
  };

  // Xử lí khi nhấn vào item
  const handlePressItem = item => {
    nav.navigate(AppRouter.INFO, {
      item: item,
      TenMH: item.TenMonHoc,
      MaMH: item.MaMH,
      user: user,
    });
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
          <View style={HeaderStyles.container}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack(); // Quay về màn hình trước
              }}
              style={HeaderStyles.leftButton}>
              <Icon
                type="MaterialIcons"
                name="keyboard-arrow-left"
                style={HeaderStyles.buttonIcon}
              />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <Text style={HeaderStyles.textTitle}>LỊCH KIỂM TRA</Text>
            <View style={{flex: 1}} />
            <TouchableOpacity
              onPress={() => {
                setCalendar(!calendarShow); // setCalendar = nghịch đảo của calendarShow
              }}
              style={HeaderStyles.rightButton}>
              <Icon
                type="MaterialCommunityIcons"
                name={calendarShow ? 'calendar-remove' : 'calendar-month'}
                style={HeaderStyles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          {calendarShow && ( // Nếu calendarShow = true thì mới hiện
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={MainStyles.container}>
              <Calendar
                style={{width: dW, marginTop: -5}}
                markingType={'period'}
                current={dateNow}
                monthFormat={'MM-yyyy'}
                minDate={'2018-02-02'}
                enableSwipeMonths={true}
                theme={CalendarTheme}
                onDayPress={day => {
                  setDateSelected(day.dateString);
                }}
                markedDates={dataMark}
              />
            </ScrollView>
          )}
          <View style={{flex: 25, width: '100%'}}>
            {!dataNull ? ( // Nếu dataNull nghịch dảo với true thì hiện thằng đầu, bằng true thì hiện thằng sau
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
                  />
                )}
                keyExtractor={item => item.id}
                style={{flex: 1, paddingTop: 10}}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, color: settings.colors.colorYouTube}}>
                  Không có bài kiểm tra
                </Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <View style={LoadingStyles.container}>
          <Image
            source={require('../../asset/gif/loading-super.gif')}
            style={LoadingStyles.image}
          />
        </View>
      )}
    </View>
  );
};
