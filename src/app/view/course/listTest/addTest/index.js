import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Modal,
  Settings,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {settings} from '../../../../config';
import {Icon, Picker, Textarea} from 'native-base';
import {i18n} from '../../../../../i18n';

import {Header} from '../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AppRouter} from '../../../../navigation/AppRouter';
import {Data} from '../../listExercise/data';
import {RenderItem} from '../../listExercise/renderItem';

export const AddTest = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params.item.MaMonHoc;
  const [name, setName] = useState('');

  useEffect(() => {
    console.log(params);
  }, []);

  const handleAddQuest = () => {
    if (name === '') {
      Alert.alert('Không thể thêm', 'Vui lòng điền câu hỏi');
    } else {
      nav.navigate(AppRouter.QuestToTest, {
        quest: cauHoi,
        MaChuDe: params,
      });
    }
  };

  const initState = () => {
    setCauHoi('');
  };

  const deleteQuest = () => {
    //
  };

  const handlePressItem = () => {
    //
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />

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
            THÊM BÀI KIỂM TRA
          </Text>
        </View>

        {/* <Text
          style={{
            marginTop: 10,
            color: settings.colors.colorGreen,
            marginLeft: 10,
          }}>
          TÊN BÀI KIỂM TRA
        </Text> */}
        <View
          style={{
            height: 52,
            marginTop: 5,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: settings.colors.colorBoderDark,
            borderRadius: 12,
          }}>
          <TextInput
            placeholder="Nhập tên bài kiểm tra"
            value={name}
            onChangeText={t => {
              setName(t);
            }}
            style={{flex: 1, marginHorizontal: 10}}
          />
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: settings.colors.colorGreen,
            marginTop: 7,
            marginLeft: 10,
          }}>
          DANH SÁCH CÂU HỎI - TỔNG: {Data.length}
        </Text>
        <FlatList
          style={{flex: 1, marginTop: 5}}
          data={Data}
          renderItem={({item}) => (
            <RenderItem
              item={item}
              data={Data}
              handle={handlePressItem}
              handleDelete={deleteQuest}
            />
          )}
          keyExtractor={item => item.MaCauHoi}
        />

        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              handleAddQuest();
            }}
            activeOpacity={0.5}
            style={{
              flex: 1,
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
              TIẾP THEO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleAddQuest();
            }}
            activeOpacity={0.5}
            style={{
              paddingHorizontal: 15,
              height: 45,
              marginTop: -45,
              backgroundColor: settings.colors.colorGreen,
              marginRight: 10,
              marginVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#ffF', fontSize: 14, fontWeight: 'bold'}}>
              THÊM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
