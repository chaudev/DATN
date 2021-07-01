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
import {Icon, Textarea} from 'native-base';
import {i18n} from '../../../../../i18n';

import {Header} from '../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AppRouter} from '../../../../navigation/AppRouter';
import {Data} from '../../listExercise/data';
import {RenderItem} from '../../listExercise/renderItem';

import {Picker} from '@react-native-picker/picker';

export const AddTest = () => {
  console.log('render');
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params.item.MaMonHoc;
  const [name, setName] = useState('');
  const [render, setRender] = useState(1);
  const [dataQuest, setDataQuest] = useState([]);
  const [listQuest, setListQuest] = useState([]);

  const [questAdd, setQuestAdd] = useState('');

  useEffect(() => {
    console.log('init: ', params);
    setListQuest(Data);
  }, []);

  useEffect(() => {
    console.log('dataQuest: ', dataQuest);
  }, [dataQuest]);

  useEffect(() => {
    if (questAdd !== '') {
      let x = dataQuest;
      const quest = listQuest.find(x => x.MaCauHoi === questAdd);
      x.push(quest);
      console.log('x ne nha: ', x);

      setDataQuest(x);
      setRender(render + 1);
    }
  }, [questAdd]);

  const handleAddQuest = () => {
    if (name === '') {
      Alert.alert('Không thể thêm', 'Vui lòng điền câu hỏi');
    } else {
      nav.goBack();
    }
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
          DANH SÁCH CÂU HỎI - TỔNG: {dataQuest.length}
        </Text>
        {dataQuest.length !== 0 ? (
          <FlatList
            style={{flex: 1, marginTop: 5}}
            data={dataQuest}
            renderItem={({item}) => (
              <RenderItem
                item={item}
                data={dataQuest}
                handle={handlePressItem}
                handleDelete={deleteQuest}
              />
            )}
            keyExtractor={item => item.MaCauHoi}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: settings.colors.colorRed}}>
              Không có câu hỏi
            </Text>
          </View>
        )}

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
            activeOpacity={0.5}
            style={{
              width: 80,
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
          <Picker
            selectedValue="x05"
            style={{
              height: 50,
              width: 80,
              marginTop: -50,
              marginLeft: -80,
              opacity: 0,
            }}
            onValueChange={(itemValue, itemIndex) => {
              console.log('setQuestAdd ', itemValue);
              setQuestAdd(itemValue);
            }}>
            {listQuest.map(i => (
              <Picker.Item label={i.TenCauHoi} value={i.MaCauHoi} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};
