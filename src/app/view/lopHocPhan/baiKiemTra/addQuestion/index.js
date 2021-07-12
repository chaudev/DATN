import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import {settings} from '../../../../config';
import {Icon, Picker} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {getCauHoiByMaMH} from '../../../../../server/BaiKiemTra/getCauHoiByMaMH';
import {getCD} from '../../../../../server/ChuDe/getCD';
import {Header} from '../../../../components/header';

import SelectMultiple from 'react-native-select-multiple';

export const ThemCauHoi = () => {
  const nav = useNavigation();
  const focus = useIsFocused();
  const route = useRoute();
  const params = route.params;
  const MaMH = params.MaMH;
  const user = params.user;

  const [data, setData] = useState('');
  const [listChuDe, setListChuDe] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(-1);

  const [selectedFruits, setSelectedFruits] = useState([]);

  // Vừa focus vào là gọi refesh để lấy data
  useEffect(() => {
    if (focus) {
      getListChuDe();
      getData();
    }
  }, [focus]);

  // Khi lấy data xong khi không load nữa
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // filter
  useEffect(() => {
    getData();
  }, [filter]);

  // Gọi api lấy danh sách câu hỏi theo mã môn học
  const getData = async () => {
    try {
      const res = await getCauHoiByMaMH(MaMH, filter, user[0]?.MaGV);
      const xx = [];
      await res.data.map(i => {
        xx.push({label: i.CauHoi + '~' + i.TenCD, value: i.MaCH});
      });
      setData(xx);
    } catch (error) {
      console.log(error);
    }
  };

  // Gọi api lấy danh sách câu hỏi theo mã môn học
  const getListChuDe = async data => {
    try {
      const res = await getCD(user[0]?.MaGV, MaMH);
      setListChuDe(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Xóa bài kiểm tra
  const subMit = async data => {
    try {
      // const res = await deleteBaiKT(data);
      console.log('@!#!@#!$!#!@#');
    } catch (error) {
      console.log(error);
    }
  };

  //
  const getTen = str => {
    //
    const ten = str.substring(0, str.indexOf('~'));
    return ten;
  };

  const getChuDe = str => {
    //
    const chuDe = str.substring(str.indexOf('~') + 1, str.length);
    return chuDe;
  };

  const renderLabel = label => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10}}>
          <Text numberOfLines={1} style={{fontSize: 16}}>
            {getTen(label)}
          </Text>
          <Text style={{fontSize: 12}}>Chủ đề: {getChuDe(label)}</Text>
        </View>
      </View>
    );
  };

  const onSelectionsChange = async x => {
    setSelectedFruits(x);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginLeft: '3%',
              color: settings.colors.colorThumblr,
              fontWeight: 'bold',
              marginBottom: -5,
              fontSize: 14,
              zIndex: 999,
              marginTop: 10,
              marginBottom: 5,
            }}>
            THÊM CÂU HỎI - {params.BaiKiemTra.TenBaiKT}
          </Text>
          <Text
            style={{
              marginLeft: '3%',
              color: settings.colors.colorThumblr,
              fontWeight: 'bold',
              marginBottom: -5,
              fontSize: 14,
              zIndex: 999,
              marginBottom: 10,
            }}>
            Số câu đã chọn: {selectedFruits.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // setShowFilter(!showFilter);
          }}
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            borderRadius: 500,
            backgroundColor: settings.colors.colorMain,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type="FontAwesome"
            name="filter"
            style={{fontSize: 18, color: '#fff', marginTop: 2}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 10,
            marginLeft: -50,
          }}>
          {listChuDe !== '' && (
            <Picker
              selectedValue={0}
              mode="dialog"
              textStyle={{opacity: 0}}
              style={{height: 45, width: 50, opacity: 0}}
              onValueChange={(itemValue, itemIndex) => {
                setFilter(itemValue);
              }}>
              <Picker.Item label="Tất cả" value={'-1'} />
              {listChuDe?.map(i => (
                <Picker.Item label={i.TenCD} value={i.MaCD} />
              ))}
            </Picker>
          )}
        </View>
      </View>

      {!loading ? (
        <>
          {data !== '' && data !== undefined && data.length !== 0 ? (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                borderTopWidth: 0.5,
                borderColor: '#CFD8DC',
              }}>
              <SelectMultiple
                items={data}
                renderLabel={renderLabel}
                selectedItems={selectedFruits}
                onSelectionsChange={onSelectionsChange}
                labelStyle={{fontSize: 16}}
                selectedRowStyle={{backgroundColor: '#ECEFF1'}}
                selectedCheckboxStyle={{width: 25}}
                checkboxStyle={{width: 25}}
                selectedCheckboxSource={require('../../../../asset/images/question-true.png')}
                checkboxSource={require('../../../../asset/images/question.png')}
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: 'red'}}>Không có câu hỏi</Text>
            </View>
          )}
          <View
            style={{
              width: '100%',
              height: 50,
              marginTop: -65,
              alignItems: 'flex-end',
              paddingRight: 15,
              marginBottom: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                subMit();
              }}
              activeOpacity={0.5}
              style={{
                width: 55,
                height: 55,
                borderRadius: 500,
                backgroundColor: settings.colors.colorMain,
                borderWidth: 0.5,
                borderColor: settings.colors.colorBoderDark,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="MaterialIcons"
                name="done"
                style={{fontSize: 26, color: '#fff', marginBottom: -2}}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../../../asset/gif/load321.gif')}
            resizeMode="contain"
            style={{width: 100, height: 100}}
          />
        </View>
      )}
    </View>
  );
};
