import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Textarea, CheckBox} from 'native-base';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {settings} from '../../../../../config';
import {Header} from '../../../../../components/header';
import {AppRouter} from '../../../../../navigation/AppRouter';
import {updateCH} from '../../../../../../server/MonHoc/updateCH';

export const EditQuest = () => {
  const nav = useNavigation();
  const route = useRoute();
  const focused = useIsFocused();
  const item = route.params.item;
  const user = route.params.user;
  const MonHoc = route.params.MonHoc;
  const ChuDe = route.params.ChuDe;

  //
  const [cauHoi, setCauHoi] = useState(item?.CauHoi);

  //
  const [A, setA] = useState(item?.A);
  const [B, setB] = useState(item?.B);
  const [C, setC] = useState(item?.C);
  const [D, setD] = useState(item?.D);
  const [dapAn, setDapAn] = useState(item?.DapAn);

  // Check box status
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(false);
  const [checkC, setCheckC] = useState(false);
  const [checkD, setCheckD] = useState(false);

  // Focus this screen
  useEffect(() => {
    if (focused) {
      getCheckBox();
    }
  }, [focused]);

  // Press button
  const handleAddQuest = async () => {
    if (A === '' || B === '' || C === '' || D === '') {
      Alert.alert('Không thể thêm', 'Vui lòng điền đầy đủ thông tin');
    } else {
      if (dapAn === '') {
        Alert.alert('Không thể thêm', 'Vui lòng chọn câu đúng');
      } else {
        postData();
      }
    }
  };

  // Call api add question
  const postData = async () => {
    try {
      Toast.show('Sửa thành công', Toast.SHORT);
      await updateCH(item.MaCH, cauHoi, A, B, C, D, dapAn, item.MaCD);
      nav.navigate(AppRouter.QUESTION);
    } catch (error) {
      console.log(error);
    }
  };

  // Press check box
  const handleCheckBox = async X => {
    if (X === 'A') {
      setDapAn('A');
      setCheckA(true);
      setCheckB(false);
      setCheckC(false);
      setCheckD(false);
    }
    if (X === 'B') {
      setDapAn('B');
      setCheckA(false);
      setCheckB(true);
      setCheckC(false);
      setCheckD(false);
    }
    if (X === 'C') {
      setDapAn('C');
      setCheckA(false);
      setCheckB(false);
      setCheckC(true);
      setCheckD(false);
    }
    if (X === 'D') {
      setDapAn('D');
      setCheckA(false);
      setCheckB(false);
      setCheckC(false);
      setCheckD(true);
    }
  };

  // Get answer check box
  const getCheckBox = () => {
    console.log('item?.DapAn: ', item?.DapAn);
    if (item?.DapAn === 'A') {
      setDapAn('A');
      setCheckA(true);
      setCheckB(false);
      setCheckC(false);
      setCheckD(false);
    }
    if (item?.DapAn === 'B') {
      setDapAn('B');
      setCheckA(false);
      setCheckB(true);
      setCheckC(false);
      setCheckD(false);
    }
    if (item?.DapAn === 'C') {
      setDapAn('C');
      setCheckA(false);
      setCheckB(false);
      setCheckC(true);
      setCheckD(false);
    }
    if (item?.DapAn === 'D') {
      setDapAn('D');
      setCheckA(false);
      setCheckB(false);
      setCheckC(false);
      setCheckD(true);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header user={user} />

      <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
        <Text
          style={{
            color: settings.colors.colorGreen,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            marginTop: 5,
          }}>
          CHỦ ĐỀ: {ChuDe.TenCD}
        </Text>
        <Text
          style={{
            color: settings.colors.colorGreen,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          MÔN HỌC: {MonHoc.TenMonHoc}
        </Text>
        <ScrollView>
          <Text
            style={{
              marginTop: 10,
              color: settings.colors.colorGreen,
              marginLeft: 10,
            }}>
            CÂU HỎI
          </Text>
          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: settings.colors.colorBoderDark,
              borderRadius: 12,
            }}>
            <Textarea
              rowSpan={4}
              placeholder="Nhập câu hỏi"
              placeholderTextColor="#B0BEC5"
              style={{fontSize: 14}}
              value={cauHoi}
              onChangeText={t => {
                setCauHoi(t);
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: settings.colors.colorGreen,
                marginLeft: 10,
              }}>
              ĐÁP ÁN A
            </Text>
            <CheckBox
              checked={checkA}
              onPress={() => {
                handleCheckBox('A');
              }}
              color={
                dapAn === 'A'
                  ? settings.colors.colorBlue
                  : settings.colors.colorGreen
              }
              style={{width: 14, height: 14, borderRadius: 500}}
            />
            <TouchableOpacity
              onPress={() => {
                handleCheckBox('A');
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  paddingVertical: 2,
                  color:
                    dapAn === 'A'
                      ? settings.colors.colorBlue
                      : settings.colors.colorThumblr,
                }}>
                Đáp án đúng
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: settings.colors.colorBoderDark,
              height: 45,
              borderRadius: 12,
            }}>
            <TextInput
              placeholder="Nhập đáp án A"
              placeholderTextColor="#B0BEC5"
              value={A}
              onChangeText={t => {
                setA(t);
              }}
              style={{
                flex: 1,
                marginHorizontal: 5,
                marginVertical: 2,
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: settings.colors.colorGreen,
                marginLeft: 10,
              }}>
              ĐÁP ÁN B
            </Text>
            <CheckBox
              checked={checkB}
              onPress={() => {
                handleCheckBox('B');
              }}
              color={
                dapAn === 'B'
                  ? settings.colors.colorBlue
                  : settings.colors.colorGreen
              }
              style={{width: 14, height: 14, borderRadius: 500}}
            />
            <TouchableOpacity
              onPress={() => {
                handleCheckBox('B');
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  paddingVertical: 2,
                  color:
                    dapAn === 'B'
                      ? settings.colors.colorBlue
                      : settings.colors.colorThumblr,
                }}>
                Đáp án đúng
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: settings.colors.colorBoderDark,
              height: 45,
              borderRadius: 12,
            }}>
            <TextInput
              placeholder="Nhập đáp án B"
              placeholderTextColor="#B0BEC5"
              value={B}
              onChangeText={t => {
                setB(t);
              }}
              style={{
                flex: 1,
                marginHorizontal: 5,
                marginVertical: 2,
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: settings.colors.colorGreen,
                marginLeft: 10,
              }}>
              ĐÁP ÁN C
            </Text>
            <CheckBox
              checked={checkC}
              onPress={() => {
                handleCheckBox('C');
              }}
              color={
                dapAn === 'C'
                  ? settings.colors.colorBlue
                  : settings.colors.colorGreen
              }
              style={{width: 14, height: 14, borderRadius: 500}}
            />
            <TouchableOpacity
              onPress={() => {
                handleCheckBox('C');
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  paddingVertical: 2,
                  color:
                    dapAn === 'C'
                      ? settings.colors.colorBlue
                      : settings.colors.colorThumblr,
                }}>
                Đáp án đúng
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: settings.colors.colorBoderDark,
              height: 45,
              borderRadius: 12,
            }}>
            <TextInput
              placeholder="Nhập đáp án C"
              placeholderTextColor="#B0BEC5"
              value={C}
              onChangeText={t => {
                setC(t);
              }}
              style={{
                flex: 1,
                marginHorizontal: 5,
                marginVertical: 2,
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: settings.colors.colorGreen,
                marginLeft: 10,
              }}>
              ĐÁP ÁN D
            </Text>
            <CheckBox
              checked={checkD}
              onPress={() => {
                handleCheckBox('D');
              }}
              color={
                dapAn === 'D'
                  ? settings.colors.colorBlue
                  : settings.colors.colorGreen
              }
              style={{width: 14, height: 14, borderRadius: 500}}
            />
            <TouchableOpacity
              onPress={() => {
                handleCheckBox('D');
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  paddingVertical: 2,
                  color:
                    dapAn === 'D'
                      ? settings.colors.colorBlue
                      : settings.colors.colorThumblr,
                }}>
                Đáp án đúng
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: settings.colors.colorBoderDark,
              height: 45,
              borderRadius: 12,
            }}>
            <TextInput
              placeholder="Nhập đáp án D"
              placeholderTextColor="#B0BEC5"
              value={D}
              onChangeText={t => {
                setD(t);
              }}
              style={{
                flex: 1,
                marginHorizontal: 5,
                marginVertical: 2,
              }}
            />
          </View>
          <View style={{height: 10}} />
          <TouchableOpacity
            onPress={() => {
              handleAddQuest();
            }}
            activeOpacity={0.5}
            style={{
              height: 45,
              backgroundColor: settings.colors.colorGreen,
              marginHorizontal: 10,
              marginVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#ffF', fontSize: 14, fontWeight: 'bold'}}>
              LƯU LẠI
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
};
