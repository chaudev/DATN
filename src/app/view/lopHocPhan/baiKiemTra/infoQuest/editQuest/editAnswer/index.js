import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {settings} from '../../../../../../config';
import {Icon} from 'native-base';
import {Header} from '../../../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AppRouter} from '../../../../../../navigation/AppRouter';
import {Picker} from '@react-native-picker/picker';
import {updateCH} from '../../../../../../../server/MonHoc/updateCH';

export const EditAnswer = () => {
  const nav = useNavigation();
  const route = useRoute();
  const CauHoi = route.params.quest;
  const item = route.params.item;
  const user = route.params.user;

  const [A, setA] = useState(item.A);
  const [B, setB] = useState(item.B);
  const [C, setC] = useState(item.C);
  const [D, setD] = useState(item.D);
  const [dapAn, setDapAn] = useState(item.DapAn);
  const [resPOST, setResPOST] = useState('');

  // Quay lại danh sách câu hỏi
  useEffect(() => {
    if (resPOST !== '') {
      Toast.show('Sửa thành công', Toast.SHORT);
      nav.navigate(AppRouter.QUESTION);
    }
  }, [resPOST]);

  // Nhấn nút sửa
  const handleAddQuest = () => {
    if (A === '' || B === '' || C === '' || D === '' || dapAn === '') {
      Alert.alert('Không thể thêm', 'Vui lòng điền đầy đủ thông tin');
    } else {
      postData();
    }
  };

  // Gọi api
  const postData = async () => {
    try {
      const res = await updateCH(
        item.MaCH,
        CauHoi,
        A,
        B,
        C,
        D,
        dapAn,
        item.MaCD,
      );
      console.log('res: ', res);
      setResPOST(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Giao diện
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header user={user} />

      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            width: '100%',
            marginTop: 10,
          }}>
          <Icon
            type="MaterialIcons"
            name="playlist-add"
            style={{
              fontSize: 26,
              color: settings.colors.colorGreen,
              marginBottom: -2,
              borderRadius: 500,
              marginLeft: 2,
            }}
          />

          <Text
            style={{
              color: settings.colors.colorGreen,
              fontSize: 16,
              fontWeight: 'bold',
              flex: 1,
              marginLeft: 5,
            }}>
            SỬA BÀI TẬP
          </Text>
        </View>
        <ScrollView>
          <Text
            style={{
              marginTop: 10,
              color: settings.colors.colorGreen,
              marginLeft: 10,
            }}>
            ĐÁP ÁN A
          </Text>
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
          <Text
            style={{
              marginTop: 10,
              color: settings.colors.colorGreen,
              marginLeft: 10,
            }}>
            ĐÁP ÁN B
          </Text>
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
          <Text
            style={{
              marginTop: 10,
              color: settings.colors.colorGreen,
              marginLeft: 10,
            }}>
            ĐÁP ÁN C
          </Text>
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
          <Text
            style={{
              marginTop: 10,
              color: settings.colors.colorGreen,
              marginLeft: 10,
            }}>
            ĐÁP ÁN D
          </Text>
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
          <Text
            style={{
              marginTop: 10,
              color: settings.colors.colorGreen,
              marginLeft: 10,
            }}>
            ĐÁP ÁN ĐÚNG
          </Text>

          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: settings.colors.colorBoderDark,
              height: 45,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Picker
              selectedValue={dapAn}
              style={{height: 45, width: '100%'}}
              onValueChange={(itemValue, itemIndex) => {
                console.log('cac');
                setDapAn(itemValue);
              }}>
              <Picker.Item label={'A. ' + A} value="A" />
              <Picker.Item label={'B. ' + B} value="B" />
              <Picker.Item label={'C. ' + C} value="C" />
              <Picker.Item label={'D. ' + D} value="D" />
            </Picker>
          </View>
          <View style={{height: 100}} />
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            handleAddQuest();
          }}
          activeOpacity={0.5}
          style={{
            height: 45,
            marginTop: -45,
            backgroundColor: settings.colors.colorGreen,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#ffF', fontSize: 14, fontWeight: 'bold'}}>
            LƯU CÂU HỎI
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
