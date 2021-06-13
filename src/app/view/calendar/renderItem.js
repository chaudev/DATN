import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../config';

// Cái này nhỏ nên làm biếng tách css :v

// Dòng 77 - 'item?.gio' --> Thêm ? để khi có thuộc tính sau ? thì nó hiện, không có thì thôi
// Nếu không thêm thì không có nó sẽ lỗi

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
        marginHorizontal: 10,
        marginBottom: marginBottom(),
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#CFD8DC',
      }}>
      <Text
        style={{
          flex: 10,
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 3,
          color: '#1b4332',
        }}>
        {item?.monHoc}
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Icon
            type="MaterialCommunityIcons"
            name="clock-time-four-outline"
            style={{
              fontSize: 20,
              color: settings.colors.colorGreen,
              marginRight: 5,
            }}
          />
        </View>
        <Text style={{flex: 10, fontSize: 14}}>Thời gian: {item?.gio}</Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Icon
            type="Foundation"
            name="text-color"
            style={{
              fontSize: 22,
              color: settings.colors.colorMain,
              marginRight: 5,
            }}
          />
        </View>
        <Text style={{flex: 10, fontSize: 14}}>Tên bài: {item?.ten}</Text>
      </View>
    </TouchableOpacity>
  );
};
