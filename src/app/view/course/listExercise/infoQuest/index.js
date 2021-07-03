import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {settings} from '../../../../config';
import {Icon, Picker} from 'native-base';
import {Header} from '../../../../components/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppRouter} from '../../../../../app/navigation/AppRouter';

export const InfomationQuestion = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params.item;
  const user = route.params.user;

  const [refreshing, setRefreshing] = React.useState(false);

  // Kéo xuống để reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    console.log('params: ', params);
  }, []);

  const edit = () => {
    nav.navigate(AppRouter.EditQuest, {
      item: params,
      user: user,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header user={user} />

      {params !== undefined ? (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <Image
            source={require('../../../../asset/images/content.jpg')}
            style={{
              width: '100%',
              height: undefined,
              resizeMode: 'cover',
              aspectRatio: 2,
            }}
          />
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: settings.colors.colorGreen,
              marginTop: -25,
              flexDirection: 'row',
              alignItems: 'center',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <Icon
              type="MaterialCommunityIcons"
              name="book-open-variant"
              style={{
                fontSize: 24,
                color: '#fff',
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 10,
              }}>
              CHI TIẾT CÂU HỎI
            </Text>
          </View>
          <ScrollView
            style={{width: '100%', marginTop: 10, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
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
