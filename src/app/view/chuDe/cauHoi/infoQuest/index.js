import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {settings} from '../../../../config';
import {Header} from '../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../../../app/navigation/AppRouter';

export const InfomationQuestion = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params.item;
  const user = route.params.user;
  const MonHoc = route.params.MonHoc;
  const ChuDe = route.params.ChuDe;

  useEffect(() => {
    console.log('params: ', route.params);
  }, []);

  const edit = () => {
    nav.navigate(AppRouter.EditQuest, {
      item: params,
      user: user,
      MonHoc: MonHoc,
      ChuDe: ChuDe,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header user={user} />

      {params !== undefined ? (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <Image
            source={require('../../../../asset/images/chau-at-0030.png')}
            style={{
              width: '100%',
              height: undefined,
              resizeMode: 'contain',
              aspectRatio: 1.1,
              zIndex: -99,
              marginTop: -20,
            }}
          />
          <ScrollView
            style={{width: '100%', marginTop: -40, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Môn học:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{MonHoc?.TenMonHoc}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Chủ đề:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{ChuDe?.TenCD}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Câu hỏi:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{params.CauHoi}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Đáp án A:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{params.A}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Đáp án B:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{params.B}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Đáp án C:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{params.C}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Đáp án D:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{params.D}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Đáp án đúng:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{params.DapAn}</Text>
            </View>
          </ScrollView>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                edit();
              }}
              activeOpacity={0.5}
              style={{
                height: 45,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: settings.colors.colorGreen,
                marginBottom: 10,
                borderRadius: 10,
                flex: 1,
              }}>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                CHỈNH SỬA CÂU HỎI
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, color: 'red'}}>Không có data</Text>
        </View>
      )}
    </View>
  );
};
