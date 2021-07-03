import React from 'react';
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Text,
  DefaultTabBar,
} from 'native-base';
import {ListExercise} from '../listExercise';

import {ListTest} from '../listTest';

import {useNavigation, useRoute} from '@react-navigation/native';

import {Header} from '../../../components/header';
import {settings} from '../../../config';

const colors = settings.colors;

const renderTabBar = props => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export const TabHeader = () => {
  const route = useRoute();
  console.log('params: ', route.params);
  const params = route.params.item;
  const user = route.params.user;
  const tab = route.params.tab;

  return (
    <Container>
      <Header user={user} />
      <Tabs
        style={{margin: 0}}
        initialPage={tab === undefined ? 0 : tab}
        renderTabBar={renderTabBar}>
        <Tab
          tabStyle={{margin: 0}}
          heading={
            <TabHeading style={{backgroundColor: colors.colorGreen}}>
              <Text style={{fontSize: 14}}>CHƯƠNG</Text>
            </TabHeading>
          }>
          {/* <ListTest params={params} /> */}
        </Tab>
        <Tab
          tabStyle={{margin: 0}}
          heading={
            <TabHeading style={{backgroundColor: colors.colorGreen}}>
              <Text style={{fontSize: 14}}>CÂU HỎI</Text>
            </TabHeading>
          }>
          <ListExercise params={params} />
        </Tab>
        <Tab
          tabStyle={{margin: 0}}
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
