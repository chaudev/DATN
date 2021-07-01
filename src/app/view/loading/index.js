import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../config';

import {useIsFocused} from '@react-navigation/native';

const colors = settings.colors;

export const Loading = () => {
  const isFocus = useIsFocused();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={55} color="#000" />
      <Text style={{marginTop: 10, fontSize: 16}}>Loading..</Text>
    </View>
  );
};
