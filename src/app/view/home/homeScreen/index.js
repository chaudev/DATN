import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {settings} from '../../../config';
import {HeaderMenu} from './headerMenu';

import {Icon, Picker, Form} from 'native-base';

import ModalSelector from 'react-native-modal-selector';

// import {Picker} from '@react-native-picker/picker';

const MAX_HEIGHT = 240;
const MIN_HEIGHT = 84;
const SCROLL_DISTANCE = MAX_HEIGHT - MIN_HEIGHT;
const mainColor = settings.colors.colorMain;

const data = [
  {key: '01', section: true, label: 'SELECT OBJECT'},
  {key: '02', label: 'Java'},
  {key: '03', label: 'Hệ quản trị cơ sở dữ liệu'},
  {key: '04', label: 'Cơ sở dữ liệu'},
  {key: '05', label: 'Thiết kế website'},
  {key: '06', label: 'Lập trình hướng đối tượng'},
];

export const HomeScreen = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [thongKe, setThongKe] = useState('Chọn bài kiểm tra');

  const [showPicker, setShowPicker] = useState(true);
  const [pickerValue, setPickerValue] = useState('');
  const [pickerNewValue, setPickerNewValue] = useState('');

  const [soHocSinhGioi, setHocSinhGioi] = useState(15);
  const [soHocSinhKha, setHocSinhKha] = useState(35);
  const [soHocSinhTrungBinh, setHocSinhTrungBinh] = useState(8);
  const [soHocSinhYeu, setHocSinhYeu] = useState(2);

  const headerY = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, -SCROLL_DISTANCE],
    extrapolate: 'extend',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE / 2, SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageY = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const HeaderHandle = value => {
    console.log('HeaderHandle: ', value);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const handleQLMonHoc = () => {
    console.log('quan ly mon hoc');
  };

  const handleQLBaiKT = () => {
    console.log('quan ly bai kiem tra');
  };

  const handleHSG = () => {
    console.log('Hoc sinh gioi');
  };

  const handleHSK = () => {
    console.log('Hoc sinh kha');
  };

  const handleHSTB = () => {
    console.log('Hoc sinh trung binh');
  };

  const handleHSY = () => {
    console.log('Hoc sinh trung yeu');
  };

  return (
    <SafeAreaView
      style={styles.saveArea}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#000"
        hidden={false}
      />

      {/* Bắt đầu screen */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: MAX_HEIGHT - 32,
          backgroundColor: '#fff',
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View style={{width: '100%', height: 32}} />
        <TouchableOpacity
          onPress={() => {
            handleQLMonHoc();
          }}
          activeOpacity={0.5}
          style={[
            QLMH.container,
            {backgroundColor: settings.colors.colorPinteres},
          ]}>
          <View style={QLMH.viewIcon}>
            <Icon
              type="MaterialCommunityIcons"
              name="book-open-page-variant"
              style={QLMH.iconBook}
            />
          </View>
          <View>
            <Text style={QLMH.textTitle}>Quản lý môn học</Text>
            <Text style={QLMH.textSubTitle}>
              Môn học, bài kiểm tra, câu hỏi, học sinh..
            </Text>
          </View>
          <View style={{flex: 1}} />
          <Icon
            type="MaterialIcons"
            name="keyboard-arrow-right"
            style={QLMH.iconArrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleQLBaiKT();
          }}
          activeOpacity={0.5}
          style={QLMH.container}>
          <View style={QLMH.viewIcon}>
            <Icon
              type="FontAwesome"
              name="address-book-o"
              style={QLMH.iconBook}
            />
          </View>
          <View>
            <Text style={QLMH.textTitle}>Quản lý bài kiểm tra</Text>
            <Text style={QLMH.textSubTitle}>Câu hỏi, học sinh, điểm..</Text>
          </View>
          <View style={{flex: 1}} />
          <Icon
            type="MaterialIcons"
            name="keyboard-arrow-right"
            style={QLMH.iconArrow}
          />
        </TouchableOpacity>

        <View
          style={{
            height: 450,
            width: '100%',
            marginTop: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#CFD8DC',
            paddingBottom: 50,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: mainColor,
              marginVertical: 5,
              marginLeft: 10,
            }}>
            THỐNG KÊ
          </Text>
          <View
            style={{
              height: 40,
              marginHorizontal: 10,
              backgroundColor: '#fff',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: mainColor,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <ModalSelector
              data={data}
              style={{flex: 1}}
              cancelStyle={{
                marginTop: -8,
                borderRadius: 0,
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderColor: '#CFD8DC',
              }}
              selectStyle={{
                borderWidth: 0,
                borderColor: '#fff',
                alignItems: 'flex-start',
              }}
              optionContainerStyle={{
                marginTop: -8,
                borderRadius: 0,
                backgroundColor: '#fff',
              }}
              cancelText="CANCLE"
              initValue="Select object"
              onChange={option => {
                //
              }}
            />
            <Icon
              type="MaterialIcons"
              name="keyboard-arrow-down"
              style={{
                fontSize: 26,
                color: '#90A4AE',
                marginRight: 0,
              }}
            />
          </View>

          <View style={{flex: 1, marginTop: 10, paddingHorizontal: 10}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[
                  styleTK.container,
                  {
                    backgroundColor: settings.colors.colorGreen,
                  },
                ]}>
                <Text style={styleTK.textTitle}>HỌC SINH GIỎI</Text>
                <View style={styleTK.fakeView} />
                <Text style={styleTK.number}>{soHocSinhGioi}</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleHSG();
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styleTK.textDetail}>Xem</Text>
                    <Text style={styleTK.textTitle}>chi tiết</Text>
                  </View>
                  <View style={styleTK.button}>
                    <Icon
                      type="MaterialIcons"
                      name="keyboard-arrow-right"
                      style={styleTK.btnIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: 10, height: '100%'}} />
              <View
                style={[
                  styleTK.container,
                  {
                    backgroundColor: settings.colors.colorBlue,
                  },
                ]}>
                <Text style={styleTK.textTitle}>HỌC SINH KHÁ</Text>
                <View style={styleTK.fakeView} />
                <Text style={styleTK.number}>{soHocSinhKha}</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleHSK();
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styleTK.textDetail}>Xem</Text>
                    <Text style={styleTK.textTitle}>chi tiết</Text>
                  </View>
                  <View style={styleTK.button}>
                    <Icon
                      type="MaterialIcons"
                      name="keyboard-arrow-right"
                      style={styleTK.btnIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flex: 1, marginTop: 10, paddingHorizontal: 10}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[
                  styleTK.container,
                  {
                    backgroundColor: settings.colors.colorRed,
                  },
                ]}>
                <Text style={styleTK.textTitle}>HỌC SINH TRUNG BÌNH</Text>
                <View style={styleTK.fakeView} />
                <Text style={[styleTK.number, {marginVertical: -10}]}>
                  {soHocSinhTrungBinh}
                </Text>
                <View style={styleTK.fakeView} />
                <TouchableOpacity
                  onPress={() => {
                    handleHSTB();
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styleTK.textDetail}>Xem</Text>
                    <Text style={styleTK.textTitle}>chi tiết</Text>
                  </View>
                  <View style={styleTK.button}>
                    <Icon
                      type="MaterialIcons"
                      name="keyboard-arrow-right"
                      style={styleTK.btnIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: 10, height: '100%'}} />
              <View
                style={[
                  styleTK.container,
                  {
                    backgroundColor: settings.colors.colorThumblr,
                  },
                ]}>
                <Text style={styleTK.textTitle}>HỌC SINH YẾU</Text>
                <View style={styleTK.fakeView} />
                <Text style={styleTK.number}>{soHocSinhYeu}</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleHSY();
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styleTK.textDetail}>Xem</Text>
                    <Text style={styleTK.textTitle}>chi tiết</Text>
                  </View>
                  <View style={styleTK.button}>
                    <Icon
                      type="MaterialIcons"
                      name="keyboard-arrow-right"
                      style={styleTK.btnIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Kết thúc screen */}

      <Animated.View
        style={[
          styles.topBar,
          {
            backgroundColor: mainColor,
          },
        ]}>
        <View
          style={{
            height: 60,
            backgroundColor: mainColor,
            width: '100%',
          }}
        />
      </Animated.View>

      <HeaderMenu
        headerY={headerY}
        imageOpacity={imageOpacity}
        imageY={imageY}
        Handle={HeaderHandle}
      />

      <Animated.View
        style={[
          styles.topBar,
          {
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <View style={{flex: 1, height: 60, justifyContent: 'center'}}>
          <Text style={[styles.title, {fontWeight: 'bold', fontSize: 10}]}>
            Giáo viên
          </Text>
          <Text style={[styles.title, {marginTop: 2, fontSize: 14}]}>
            Nguyễn Phúc Bảo Châu
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <Icon
            type="Ionicons"
            name="ios-notifications-circle"
            style={{
              fontSize: 32,
              color: '#fff',
              marginRight: -3,
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#eff3fb',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const QLMH = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: '5%',
    backgroundColor: mainColor,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    marginLeft: -5,
  },
  iconBook: {
    fontSize: 20,
    color: '#fff',
    marginRight: -1,
  },
  textTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textSubTitle: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 10,
  },
  iconArrow: {
    fontSize: 30,
    color: '#fff',
    marginRight: -10,
  },
});

const styleTK = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderRadius: 12,
  },
  textTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },
  fakeView: {
    flex: 1,
  },
  number: {
    fontSize: 38,
    color: '#fff',
    marginLeft: 10,
  },
  textDetail: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: -10,
  },
  button: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    borderRadius: 500,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
