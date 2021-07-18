import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {settings} from '../../../config';
import {AppRouter} from '../../../navigation/AppRouter';
import {useNavigation} from '@react-navigation/native';
import {HeaderMenu} from './headerMenu';
import {Icon} from 'native-base';
import {mainStyles, QLMH, styleTK} from '../../home/homeScreen/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thongKe} from '../../../../server/LinhTinh';

import {i18n} from '../../../../i18n';

const MAX_HEIGHT = 240;
const MIN_HEIGHT = 84;
const SCROLL_DISTANCE = MAX_HEIGHT - MIN_HEIGHT;
const mainColor = settings.colors.colorMain;

export const HomeScreen = () => {
  const nav = useNavigation();
  const [user, setUser] = useState('');
  const [dataThongKe, setDataThongKe] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (user !== '') {
      console.log('user: ', user);
      getThongKe();
    }
  }, [user]);

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

  // ------ nhấn item trên header
  const HeaderHandle = value => {
    console.log('HeaderHandle: ', value);
    if (value === 'Môn học') {
      nav.navigate(AppRouter.COURSE);
    }

    if (value === 'Câu hỏi') {
      nav.navigate(AppRouter.ALLEXERCISE, {
        item: 'all',
      });
    }

    if (value === 'Chủ đề') {
      nav.navigate(AppRouter.LISTCD);
    }

    if (value === 'Lớp học phần') {
      nav.navigate(AppRouter.LISTLHP);
    }

    if (value === 'Đổi mật khẩu') {
      nav.navigate(AppRouter.CHANGEPASS);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getAccount = async () => {
    try {
      const res = await AsyncStorage.getItem('currentUser');
      setUser(JSON.parse(res));
    } catch (e) {
      // error reading value
    }
  };

  // Get thong ke
  const getThongKe = async () => {
    try {
      const res = await thongKe(user[0]?.MaGV);
      setDataThongKe(res);
    } catch (e) {
      // error reading value
    }
  };

  const handleQLMonHoc = () => {
    nav.navigate(AppRouter.COURSE);
  };

  const handleQLBaiKT = () => {
    nav.navigate(AppRouter.KIEMTRA, {
      user: user,
    });
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
            <Text style={QLMH.textTitle}>{i18n.t('Home.object-manage')}</Text>
            <Text style={QLMH.textSubTitle}>
              {i18n.t('Home.object-manage-sub')}
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
        {user[0]?.isAdmin !== undefined && parseInt(user[0]?.isAdmin) === 1 && (
          <TouchableOpacity
            onPress={() => {
              nav.navigate(AppRouter.USER, {
                user: user,
              });
            }}
            activeOpacity={0.5}
            style={[QLMH.container, {backgroundColor: '#25a244'}]}>
            <View style={QLMH.viewIcon}>
              <Icon
                type="FontAwesome"
                name="address-book-o"
                style={QLMH.iconBook}
              />
            </View>
            <View>
              <Text style={QLMH.textTitle}>Quản lý tài khoản</Text>
              <Text style={QLMH.textSubTitle}>
                Tài khoản giảng viên, sinh viên..
              </Text>
            </View>
            <View style={{flex: 1}} />
            <Icon
              type="MaterialIcons"
              name="keyboard-arrow-right"
              style={QLMH.iconArrow}
            />
          </TouchableOpacity>
        )}
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
              fontSize: 16,
              color: settings.colors.colorThumblr,
              fontWeight: 'bold',
              marginVertical: 5,
              marginLeft: 10,
              marginTop: 10,
            }}>
            THỐNG KÊ
          </Text>

          <View style={{flex: 1, paddingHorizontal: 10, marginTop: 5}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[
                  styleTK.container,
                  {
                    backgroundColor: settings.colors.colorGreen,
                  },
                ]}>
                <Text style={styleTK.textTitle}>BÀI KIỂM TRA HÔM NAY</Text>
                <View style={styleTK.fakeView} />
                <Text style={styleTK.number}>
                  {dataThongKe?.BaiKiemTra?.length}
                </Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate(AppRouter.LISTLHP);
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styleTK.textDetail,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      Xem
                    </Text>
                    <Text
                      style={[
                        styleTK.textTitle,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      chi tiết
                    </Text>
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
                <Text style={styleTK.textTitle}>SỐ LỚP HỌC PHẦN</Text>
                <View style={styleTK.fakeView} />
                <Text style={styleTK.number}>
                  {dataThongKe?.LopHocPhan?.length}
                </Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate(AppRouter.LISTLHP);
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styleTK.textDetail,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      Xem
                    </Text>
                    <Text
                      style={[
                        styleTK.textTitle,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      chi tiết
                    </Text>
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
                <Text style={styleTK.textTitle}>SỐ CHỦ ĐỀ CỦA BẠN</Text>
                <View style={styleTK.fakeView} />
                <Text style={[styleTK.number, {marginVertical: -10}]}>
                  {dataThongKe?.ChuDe?.length}
                </Text>
                <View style={styleTK.fakeView} />
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate(AppRouter.LISTCD);
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styleTK.textDetail,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      Xem
                    </Text>
                    <Text
                      style={[
                        styleTK.textTitle,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      chi tiết
                    </Text>
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
                <Text style={styleTK.textTitle}>SỐ MÔN HỌC</Text>
                <View style={styleTK.fakeView} />
                <Text style={styleTK.number}>{dataThongKe?.MaMH?.length}</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate(AppRouter.COURSE);
                  }}
                  activeOpacity={0.5}
                  style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styleTK.textDetail,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      Xem
                    </Text>
                    <Text
                      style={[
                        styleTK.textTitle,
                        {fontFamily: 'SVN-Grocery Rounded'},
                      ]}>
                      chi tiết
                    </Text>
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
            marginTop: Platform.OS === 'ios' ? 35 : 0,
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
            marginTop: Platform.OS === 'ios' ? 35 : 0,
          },
        ]}>
        <SafeAreaView />
        <View style={{flex: 1, height: 60, justifyContent: 'center'}}>
          <Text style={[mainStyles.title, {fontWeight: 'bold', fontSize: 10}]}>
            {user[0]?.TenGV !== undefined ? 'Giáo viên' : 'Sinh viên'}
          </Text>
          <Text style={[mainStyles.title, {marginTop: 2, fontSize: 14}]}>
            {user[0]?.TenGV} {user[0]?.TenSV}
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
