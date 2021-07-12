import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {settings} from '../../../config';

export const RenderItem = ({item, data, handle, del}) => {
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
      return 100;
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

        <Text
          numberOfLines={1}
          style={{
            color: settings.colors.colorThumblr,
            fontSize: 12,
            width: '100%',
            marginBottom: 10,
          }}>
          Số lượng học sinh: {item.Sum}
        </Text>
      </View>

      {/* {user[0]?.isAdmin !== undefined && (
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
            backgroundColor: settings.colors.colorThumblr,
            height: '100%',
            marginRight: -1,
            borderTopEndRadius: 10,
            borderBottomEndRadius: 10,
          }}>
          <Icon
            type="AntDesign"
            name="delete"
            style={{fontSize: 22, color: '#fff'}}
          />
          <Text
            style={{
              color: '#fff',
              marginTop: 5,
              fontSize: 12,
            }}>
            Xóa
          </Text>
        </TouchableOpacity>
      )} */}
    </TouchableOpacity>
  );
};
