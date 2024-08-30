import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';
import UserStore from '../../store/UserStore';
import {observer} from 'mobx-react';

import icon_main_logo from '../../assets/icon_main_logo.png';

const Welcome = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 3000);
  }, []);

  // 获取用户信息，当用户信息存在时跳转到首页，否则跳转到登录页
  const getUserInfo = async () => {
    const catchUserInfo = await load('userInfo');
    // 如果用户信息不存在，则跳转到登录页
    if (!catchUserInfo) {
      startLogin();
      return;
    }
    const parse = JSON.parse(catchUserInfo);
    if (catchUserInfo && parse) {
      UserStore.setUserInfo(parse);
      startHome();
    } else {
      startLogin();
    }
  };

  const startLogin = () => {
    navigation.replace('Login');
  };

  const startHome = () => {
    navigation.replace('MainTab');
  };

  return (
    <View style={styles.root}>
      <Image source={icon_main_logo} style={styles.logo_img} />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_img: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: 'contain',
  },
});

export default Welcome;
