import React from 'react';
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Text,
  DefaultTabBar,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {settings} from '../../config';
import {Header} from '../../components/header';

import {ListGV} from './GV';
import {ListSV} from './SV';

const colors = settings.colors;

const renderTabBar = props => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export const User = () => {
  const route = useRoute();
  const user = route.params.user;

  return (
    <Container>
      <Header user={user} />
      <Tabs style={{margin: 0}} renderTabBar={renderTabBar}>
        <Tab
          tabStyle={{margin: 0}}
          heading={
            <TabHeading style={{backgroundColor: colors.colorGreen}}>
              <Text style={{fontSize: 14}}>GIẢNG VIÊN</Text>
            </TabHeading>
          }>
          <ListGV />
        </Tab>
        <Tab
          tabStyle={{margin: 0}}
          heading={
            <TabHeading style={{backgroundColor: colors.colorGreen}}>
              <Text style={{fontSize: 14}}>SINH VIÊN</Text>
            </TabHeading>
          }>
          <ListSV />
        </Tab>
      </Tabs>
    </Container>
  );
};
