import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon, Fab} from 'native-base';
import {settings} from '../../../config';

export const RenderItem = ({item, data, handle, del}) => {
  const getMarginTop = () => {
    if (item?.MaMH === data[0]?.MaMH || item?.MaMH === data[1]?.MaMH) {
      return 10;
    } else {
      return 0;
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
        marginLeft: '3%',
        width: '45.5%',
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: settings.colors.colorThumblr,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}>
      <Text
        numberOfLines={2}
        style={{
          color: settings.colors.colorThumblr,
          width: '100%',
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 5,
          flex: 1,
        }}>
        {item.TenMonHoc}
      </Text>

      <Text
        style={{
          color: settings.colors.colorThumblr,
          width: '100%',
          fontSize: 14,
          marginBottom: 5,
        }}>
        Số tín chỉ: {item.SoTinChi}
      </Text>

      <Text
        style={{
          color: settings.colors.colorThumblr,
          width: '100%',
          fontSize: 14,
          marginBottom: 5,
        }}>
        Số tiết: {item.SoTiet}
      </Text>
    </TouchableOpacity>
  );
};
