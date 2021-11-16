import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, Dimensions } from 'react-native';
import DaySchedule from '../../src/components/DaySchedule';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { ScheduleProvider, ScheduleContext } from '../../src/context/schedule';
import ScheduleUpdateModal from '../../src/components/modal/ScheduleUpdateModal';
import ScheduleDeleteModal from '../../src/components/modal/ScheduleDeleteModal';

const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wen', 'Thi', 'Fri', 'Sat'];
const korDayOfWeek = {
  Sun: '일',
  Mon: '월',
  Tue: '화',
  Wen: '수',
  Thi: '목',
  Fri: '금',
  Sat: '토',
};

const renderScene = function () {
  const components = {};
  for (let i = 0; i < 7; i++) {
    components[dayOfWeek[i]] = () => <DaySchedule dayOfWeek={i} />;
  }

  return SceneMap(components);
};

const WeekSchdule = function () {
  const layout = Dimensions.get('window');
  const [index, setIndex] = useState(new Date().getDay());
  const [routes] = useState(
    dayOfWeek.map((day) => {
      return { key: day, title: day };
    })
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#007AFF' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => (
        <Text
          style={{
            color: route.title === 'Sun' ? 'red' : 'black',
            marginVertical: 8,
          }}
        >
          {korDayOfWeek[route.title]}
        </Text>
      )}
    />
  );

  return (
    <ScheduleProvider>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene()}
        onIndexChange={(idx) => setIndex(idx)}
        initialLayout={{ width: layout.width }}
        swipeEnabled={false}
      />
      <ScheduleUpdateModal />
      <ScheduleDeleteModal />
    </ScheduleProvider>
  );
};

export default WeekSchdule;
