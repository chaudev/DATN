import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../../config';
import {useNavigation} from '@react-navigation/native';

const MAX_HEIGHT = Platform.OS === 'ios' ? 290 : 240;

const mainColor = settings.colors.colorMain;

export const HeaderMenu = ({headerY, imageOpacity, imageY, Handle}) => {
  const HeaderHandle = value => {
    Handle(value);
  };

  return (
    <Animated.View
      style={[styles.header, {transform: [{translateY: headerY}]}]}>
      <SafeAreaView />
      <Animated.Image
        style={[
          styles.headerBackground,
          {
            opacity: imageOpacity,
            transform: [{translateY: imageY}],
          },
        ]}
        source={require('../../../asset/images/bg-header.jpg')}
      />
      <Animated.View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 50,
          padding: 15,
          opacity: imageOpacity,
          transform: [{translateY: imageY}],
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 20 : 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Môn học');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="Ionicons"
                name="book-outline"
                style={{
                  fontSize: 20,
                  color: mainColor,
                  marginRight: -1,
                }}
              />
            </View>
            <Text style={items.textTitle}>Môn học</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Bài kiểm tra');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="FontAwesome"
                name="file-text-o"
                style={{
                  fontSize: 18,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>Bài kiểm tra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Bài kết thúc');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="Ionicons"
                name="checkmark-done-circle-outline"
                style={{
                  fontSize: 24,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>Đã kết thúc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Sắp diễn ra');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="Ionicons"
                name="stopwatch-outline"
                style={{
                  fontSize: 26,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>Sắp diễn ra</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Đổi mật khẩu');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="FontAwesome"
                name="lock"
                style={{
                  fontSize: 22,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Chủ đề');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="MaterialCommunityIcons"
                name="theme-light-dark"
                style={{
                  fontSize: 24,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>Chủ đề</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('Lớp học phần');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="MaterialCommunityIcons"
                name="google-classroom"
                style={{
                  fontSize: 20,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>Lớp học phần</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HeaderHandle('About');
            }}
            activeOpacity={0.5}
            style={items.container}>
            <View style={items.button}>
              <Icon
                type="FontAwesome5"
                name="info-circle"
                style={{
                  fontSize: 22,
                  color: mainColor,
                }}
              />
            </View>
            <Text style={items.textTitle}>About</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: mainColor,
    overflow: 'hidden',
    height: MAX_HEIGHT,
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
});

const items = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  textTitle: {
    marginTop: -5,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
