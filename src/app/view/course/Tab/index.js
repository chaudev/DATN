import React from 'react';
import {Container, Tab, Tabs, TabHeading, Icon, Text} from 'native-base';
import {ListExercise} from '../listExercise';

import {ListTest} from '../listTest';

import {useNavigation, useRoute} from '@react-navigation/native';

import {Header} from '../../../components/header';
import {settings} from '../../../config';

const colors = settings.colors;

export const TabHeader = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params.item;
  const tab = params.tab;
  return (
    <Container>
      <Header />
      <Tabs initialPage={tab === undefined ? 0 : tab}>
        <Tab
          heading={
            <TabHeading style={{backgroundColor: colors.colorGreen}}>
              <Text style={{fontSize: 14}}>CÂU HỎI</Text>
            </TabHeading>
          }>
          <ListExercise params={params} />
        </Tab>
        <Tab
          heading={
            <TabHeading style={{backgroundColor: colors.colorGreen}}>
              <Text style={{fontSize: 14}}>BÀI KIỂM TRA</Text>
            </TabHeading>
          }>
          <ListTest params={params} />
        </Tab>
      </Tabs>
    </Container>
  );
};
