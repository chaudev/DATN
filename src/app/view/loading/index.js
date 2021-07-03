import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {Icon} from 'native-base';
import {settings} from '../../config';

import {useIsFocused} from '@react-navigation/native';

const colors = settings.colors;

export const Loading = () => {
  const isFocus = useIsFocused();

  // load321.gif

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../../asset/gif/load321.gif')}
        resizeMode="contain"
        style={{width: 130, height: 130}}
      />
    </View>
  );
};
