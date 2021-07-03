import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon, Fab} from 'native-base';
import {settings} from '../../../config';

export const RenderItem = ({item, data, handle, del, user}) => {
  const getMarginTop = () => {
    if (item.MaMH === data[0].MaMH) {
      return 10;
    } else {
      return 0;
    }
  };

  const marginBottom = () => {
    if (item.MaMH === data[data.length - 1].MaMH) {
      return 25;
    } else {
      return 15;
    }
  };

  const pressItem = () => {
    handle(item);
  };

  const pressDelete = () => {
    del(item);
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
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{marginLeft: 15, flex: 1}}>
        <Text
          numberOfLines={1}
          style={{
            color: settings.colors.colorThumblr,
            width: '100%',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {item.TenMonHoc}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: '#000',
          }}>
          Số tín chỉ: {item.SoTinChi} - Số tiết: {item.SoTiet}
        </Text>
      </View>

      {user[0]?.isAdmin !== undefined && parseInt(user[0]?.isAdmin) === 1 && (
        <TouchableOpacity
          onPress={() => {
            pressDelete();
          }}
          activeOpacity={0.5}
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type="AntDesign"
            name="delete"
            style={{fontSize: 26, color: settings.colors.colorThumblr}}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
