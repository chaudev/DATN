import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {settings} from '../../../config';
import {HeaderMenu} from './headerMenu';
import {Icon, Picker} from 'native-base';
import ModalSelector from 'react-native-modal-selector';
import {mainStyles, QLMH, styleTK} from './styles';

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

export const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

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
    Alert.alert('Qua màn hình', 'Quản lý môn học');
  };

  const handleQLBaiKT = () => {
    console.log('quan ly bai kiem tra');
    Alert.alert('Qua màn hình', 'Quản lý bài kiểm tra');
  };

  const handleHSG = () => {
    console.log('Hoc sinh gioi');
    Alert.alert('Qua màn hình', 'Danh sách học sinh giỏi');
  };

  const handleHSK = () => {
    console.log('Hoc sinh kha');
    Alert.alert('Qua màn hình', 'Danh sách học sinh khá');
  };

  const handleHSTB = () => {
    console.log('Hoc sinh trung binh');

    Alert.alert('Qua màn hình', 'Danh sách học sinh trung bình');
  };

  const handleHSY = () => {
    console.log('Hoc sinh trung yeu');
    Alert.alert('Qua màn hình', 'Danh sách học sinh yếu');
  };

  return (
    <SafeAreaView style={mainStyles.saveArea}>
      {/* Thay đổi màu, màu chứ cửa thanh trạng thái */}
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#000"
        hidden={false}
      />

      {/* Bắt đầu screen */}
      <Animated.ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
          <View style={styleTK.pickerContainer}>
            <ModalSelector
              data={data}
              style={{flex: 1}}
              cancelStyle={styleTK.pickerCancel}
              selectStyle={styleTK.pickerSelect}
              optionContainerStyle={styleTK.pickerOption}
              cancelText="CANCLE"
              initValue="Select object"
              onChange={option => {
                //
              }}
            />
            <Icon
              type="MaterialIcons"
              name="keyboard-arrow-down"
              style={styleTK.iconPicker}
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
          mainStyles.topBar,
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
          mainStyles.topBar,
          {
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <View style={{flex: 1, height: 60, justifyContent: 'center'}}>
          <Text style={[mainStyles.title, {fontWeight: 'bold', fontSize: 10}]}>
            Giáo viên
          </Text>
          <Text style={[mainStyles.title, {marginTop: 2, fontSize: 14}]}>
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
