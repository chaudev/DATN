import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {settings} from '../../../config';

export const RenderItem = ({item, data, handle, del, handlePressButton}) => {
  const getMarginTop = () => {
    if (item.MaCD === data[0].MaCD) {
      return 10;
    } else {
      return 0;
    }
  };

  const marginBottom = () => {
    if (
      item.MaLopHP === data[data.length - 1].MaLopHP ||
      item.MaLopHP === data[data.length - 2].MaLopHP
    ) {
      return 5;
    } else {
      return 5;
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
        width: '45.5%',
        marginLeft: '3%',
        marginTop: getMarginTop(),
        marginBottom: marginBottom(),
        borderRadius: 10,
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderColor: settings.colors.colorThumblr,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#F5F5F5',
      }}>
      <View style={{flex: 1}}>
        <Text
          numberOfLines={3}
          style={{
            color: settings.colors.colorThumblr,
            width: '100%',
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {item.TenLopHP}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            color: settings.colors.colorThumblr,
            width: '100%',
            fontSize: 12,
            marginBottom: 10,
          }}>
          Môn: {item.TenMonHoc}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            color: settings.colors.colorThumblr,
            fontSize: 12,
            width: '100%',
            marginBottom: 10,
          }}>
          Lớp: {item.TenLop}
        </Text>

        {/* <Text
          numberOfLines={1}
          style={{
            color: settings.colors.colorThumblr,
            fontSize: 12,
            width: '100%',
            marginBottom: 10,
          }}>
          Số lượng học sinh: {item?.SoLuongSV}
        </Text> */}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              handlePressButton(item);
            }}
            activeOpacity={0.5}
            style={{
              width: '100%',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#65ca69',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontSize: 12}}>
              Danh sách sinh viên
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
