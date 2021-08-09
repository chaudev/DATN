import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../config';

export const RenderItem = ({item, data, handle}) => {
  const getMarginTop = () => {
    if (item.MaBaiKT === data[0].MaBaiKT) {
      return 5;
    } else {
      return 0;
    }
  };

  const marginBottom = () => {
    if (item.MaBaiKT === data[data.length - 1].MaBaiKT) {
      return 25;
    } else {
      return 15;
    }
  };

  const pressItem = () => {
    handle(item);
  };

  // Convert time to number
  const timeToNumber = time => {
    const num = parseInt(time[0] + time[1]) * 60 + parseInt(time[3] + time[4]);
    return parseInt(num);
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
          fontSize: 14,
          fontWeight: 'bold',
          marginLeft: 3,
          color: '#1b4332',
        }}>
        {item?.TenBaiKT}
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
        <Text style={{flex: 10, fontSize: 14}}>
          Thời gian: {timeToNumber(item?.ThoiGianLam)} phút
        </Text>
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
        <Text style={{flex: 10, fontSize: 14}}>Key bài: {item?.KeyBaiKT}</Text>
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
            type="AntDesign"
            name="aliwangwang-o1"
            style={{
              fontSize: 16,
              color: '#1976D2',
              marginRight: 5,
            }}
          />
        </View>
        <Text style={{flex: 10, fontSize: 14}}>
          Trạng thái: {item?.TrangThai}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
