import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import Home from '../home/Home';
import Message from '../message/Message';
import Mine from '../mine/Mine';
import Shop from '../shop/Shop';

import icon_tab_publish from '../../assets/icon_tab_publish.png';

//构建底部导航栏
const BottomTab = createBottomTabNavigator();

//自定义底部导航栏
const RedBookTabBar = ({state, descriptors, navigation}: any) => {
  const {routes, index} = state;

  const onPublishPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 1,
      },
      (res: ImagePickerResponse) => {
        const {assets} = res;
        if (!assets?.length) {
          console.log('未选择图片');
          return;
        }
        const {uri, width, height, fileName, type} = assets[0];
        console.log('选择图片', uri, width, height, fileName, type);
      },
    );
  };
  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route: any, i: number) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = index === i;

        if (i == 2) {
          return (
            <TouchableOpacity
              key={label}
              style={state.tabItem}
              onPress={onPublishPress}>
              <Image
                key={label}
                source={icon_tab_publish}
                style={styles.icon_tab_publish}
              />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={label}
            style={styles.tabItem}
            onPress={() => {
              navigation.navigate(route.name);
            }}>
            <Text
              style={{
                fontSize: isFocused ? 18 : 16,
                color: isFocused ? '#333' : '#999',
                fontWeight: isFocused ? 'bold' : 'normal',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainTab = () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator tabBar={props => <RedBookTabBar {...props} />}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{title: '首页', headerShown: false}}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{title: '购物', headerShown: false}}
        />
        <BottomTab.Screen
          name="Publish"
          component={Shop}
          options={{title: '发布', headerShown: false}}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{title: '消息', headerShown: false}}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{title: '我', headerShown: false}}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});

export default MainTab;
