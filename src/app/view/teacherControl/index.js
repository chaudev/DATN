import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

import {Header} from '../../components/header';

export const TeacherControl = () => {
  const nav = useNavigation();
  const route = useRoute();
  const user = route.params.user;

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header user={user} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
          CAC
        </Text>
      </View>
    </View>
  );
};
