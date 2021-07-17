import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {settings} from '../../../../../config';
import {Icon, Textarea} from 'native-base';
import {Header} from '../../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../../../navigation/AppRouter';

export const EditQuest = () => {
  const nav = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  const user = route.params.user;

  const [cauHoi, setCauHoi] = useState(item.CauHoi);

  const handleAddQuest = () => {
    if (cauHoi === '') {
      Alert.alert('Không thể thêm', 'Vui lòng điền câu hỏi');
    } else {
      nav.navigate(AppRouter.EditAnswer, {
        quest: cauHoi,
        item: item,
        user: user,
      });
    }
  };

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
            THÊM BÀI TẬP
          </Text>
        </View>
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
              rowSpan={10}
              placeholder="Nhập câu hỏi"
              placeholderTextColor="#B0BEC5"
              style={{fontSize: 14}}
              value={cauHoi}
              onChangeText={t => {
                setCauHoi(t);
              }}
            />
          </View>
          <View style={{height: 50}} />
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
            TIẾP THEO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
