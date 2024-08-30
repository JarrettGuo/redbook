import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

type Props = {
  tab: number;
  onTabChange: (tabIndex: number) => void;
};

const TitleBar = ({tab, onTabChange}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    setTabIndex(tab);
  }, [tab]);

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image source={icon_daily} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(0);
          onTabChange?.(0);
        }}>
        <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
          关注
        </Text>
        <View style={tabIndex === 0 ? styles.focusLine : ''} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(1);
          onTabChange?.(1);
        }}>
        <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
          发现
        </Text>
        <View style={tabIndex === 1 ? styles.focusLine : ''} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(2);
          onTabChange?.(2);
        }}>
        <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
          本地
        </Text>
        <View style={tabIndex === 2 ? styles.focusLine : ''} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton}>
        <Image source={icon_search} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  dailyButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 42,
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    marginLeft: 42,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusLine: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
  tabTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333',
  },
});

export default TitleBar;
