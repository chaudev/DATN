import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../../config';

export const RenderItem = ({item, data, handle}) => {
  const getMarginTop = () => {
    if (item.id === data[0].id) {
      return 5;
    } else {
      return 0;
    }
  };

  const marginBottom = () => {
    if (item.id === data[data.length - 1].id) {
      return 25;
    } else {
      return 15;
    }
  };

  const pressItem = () => {
    handle(item);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        pressItem();
      }}
      style={{
        marginTop: getMarginTop(),
        marginHorizontal: '3%',
        marginBottom: marginBottom(),
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: settings.colors.colorThumblr,
        width: '44%',
        height: 150,
      }}>
      <View
        style={{
          height: 40,
          backgroundColor: settings.colors.colorThumblr,
          borderTopStartRadius: 9,
          borderTopEndRadius: 9,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            width: '100%',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {item.TenMonHoc}
        </Text>
      </View>
      <Text style={{marginTop: 10, fontSize: 14, marginLeft: 10}}>
        Số tín chỉ: {item.SoTinChi}
      </Text>
      <Text style={{marginTop: 10, fontSize: 14, marginLeft: 10}}>
        Số tiết: {item.SoTiet}
      </Text>
      <Text style={{marginTop: 10, fontSize: 14, marginLeft: 10}}>
        Loại: {item.Type}
      </Text>

      {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View
          style={{
            width: 20,
            height: 20,
            marginLeft: 10,
            borderRadius: 700,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              item.TrangThai === 0
                ? settings.colors.colorGreen
                : settings.colors.colorRed,
          }}></View>
        <Text style={{color: '#000', fontSize: 12, marginLeft: 5}}>
          {item.TrangThai === 0 ? 'Đang làm' : 'Chưa đến giờ'}
        </Text>
      </View> */}
      <View style={{flex: 1}} />
    </TouchableOpacity>
  );
};
