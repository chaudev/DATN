import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {settings} from '../../../config';
import {Icon, Picker} from 'native-base';
import {i18n} from '../../../../i18n';
import {AppRouter} from '../../../navigation/AppRouter';

import {mainStyles, QLMH, styleTK} from '../../home/homeScreen/styles';
import {Header} from '../../../components/header';
import {Data} from './data';
import {RenderItem} from './renderItem';
import {useNavigation} from '@react-navigation/native';

export const ListObject = () => {
  const nav = useNavigation();
  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    setData(Data);
  }, []);

  const handlePressItem = item => {
    console.log(item);
    nav.navigate(AppRouter.LISTEXERCISE, {
      item: item,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />

      {data !== '' ? (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <FlatList
            ListHeaderComponent={
              <View>
                <Text
                  style={{
                    marginLeft: '3%',
                    color: settings.colors.colorThumblr,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    fontSize: 16,
                  }}>
                  DANH SÁCH MÔN HỌC
                </Text>
              </View>
            }
            data={data}
            horizontal={false}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <RenderItem item={item} data={data} handle={handlePressItem} />
            )}
            keyExtractor={item => item.id}
            style={{flex: 1, paddingTop: 10, backgroundColor: '#fff'}}
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
          <Text style={{fontSize: 14, color: 'red'}}>Không có data</Text>
        </View>
      )}
    </View>
  );
};
