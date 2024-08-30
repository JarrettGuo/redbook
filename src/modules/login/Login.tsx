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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatPhone, replaceBlank} from '../../utils/StringUtil';
import UserStore from '../../store/UserStore';
import Toast from '../../components/widget/Toast';

import icon_main_logo from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const onLoginPress = async () => {
    const canLogin = phone.length === 13 && pwd.length === 6;
    if (!canLogin || !check) {
      return;
    }

    UserStore.requestLogin(replaceBlank(phone), pwd, (success: boolean) => {
      if (success) {
        navigation.replace('MainTab');
      } else {
        Toast.show('登陆失败，请检查用户名和密码');
      }
    });
  };

  //快速登陆
  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      otherLoginButton: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        transform: [{rotate: '180deg'}],
        resizeMode: 'contain',
        marginLeft: 6,
        marginTop: 4,
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      oneKeyLoginTxt: {
        fontSize: 18,
        color: 'white',
      },
      logoMain: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });
    return (
      <View style={styles.root}>
        <View style={allStyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              source={check ? icon_selected : icon_unselected}
              style={allStyles.radioButton}
            />
          </TouchableOpacity>
          <Text style={allStyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allStyles.protocolTxt}>
              《用户协议》和《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
          }}>
          <Text style={styles.otherLoginTxt}>其他登陆方式</Text>
          <Image source={icon_arrow} style={styles.icon_arrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wxLoginButton}
          //activeOpacity={0.7}表示点击时的透明度，减轻点击时的视觉效果
          activeOpacity={0.7}>
          <Image source={icon_wx_small} style={styles.icon_wx} />
          <Text style={styles.wxLoginTxt}>微信登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.oneKeyLoginButton}
          //activeOpacity={0.7}表示点击时的透明度，减轻点击时的视觉效果
          activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginTxt}>一键登录</Text>
        </TouchableOpacity>

        <Image source={icon_main_logo} style={styles.logoMain} />
      </View>
    );
  };

  //输入登陆
  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48,
      },
      pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56,
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      pre86: {
        fontSize: 24,
        color: '#bbb',
      },
      triangle: {
        width: 12,
        height: 6,
        resizeMode: 'contain',
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        height: 64,
        backgroundColor: 'transparent',
        textAlign: 'left',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchangeIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
      },
      codeTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      loginButtonDisabled: {
        width: '100%',
        height: 56,
        backgroundColor: '#ddd',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      wxqqLayoyt: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      iconWx: {
        width: 50,
        height: 50,
        marginRight: 60,
        flex: 1,
      },
      iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60,
      },
      closeButton: {
        position: 'absolute',
        top: 36,
        left: 24,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });
    const canLogin = phone.length === 13 && pwd.length === 6;
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登陆</Text>
        <Text style={styles.tip}>未注册的手机号登陆成功后将自动注册</Text>

        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image source={icon_triangle} style={styles.triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholder={'请输入手机号'}
            placeholderTextColor={'#bbb'}
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}
          />
        </View>

        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholder={'请输入密码'}
            placeholderTextColor={'#bbb'}
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry={!eyeOpen}
            value={pwd}
            onChangeText={(text: string) => {
              setPwd(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              style={styles.iconEye}
              source={eyeOpen ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.changeLayout}>
          <Image source={icon_exchange} style={styles.exchangeIcon} />
          <Text style={styles.codeTxt}>验证码登陆</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码?</Text>
        </View>

        <TouchableOpacity
          style={canLogin ? styles.loginButton : styles.loginButtonDisabled}
          //activeOpacity={0.7}表示点击时的透明度，减轻点击时的视觉效果
          activeOpacity={canLogin ? 0.7 : 1}
          //从输入登陆页面切换到主页一定要使用replace，否则会出现返回键
          onPress={onLoginPress}>
          <Text style={styles.loginTxt}>登陆</Text>
        </TouchableOpacity>

        <View style={allStyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              source={check ? icon_selected : icon_unselected}
              style={allStyles.radioButton}
            />
          </TouchableOpacity>
          <Text style={allStyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allStyles.protocolTxt}>
              《用户协议》和《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wxqqLayoyt}>
          <TouchableOpacity>
            <Image source={icon_wx} style={styles.iconWx} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icon_qq} style={styles.iconQQ} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick');
          }}>
          <Image source={icon_close_modal} style={styles.closeImg} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={allStyles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const allStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_img: {
    width: 200,
    height: 100,
    marginTop: 300,
  },
  protocolLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  labelTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
});

export default Login;
