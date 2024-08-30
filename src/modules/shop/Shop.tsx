import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useLocalObservable} from 'mobx-react';
import ShopStore from '../../store/Shopstore';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_search from '../../assets/icon_search.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_WIDTH = (SCREEN_WIDTH - 18) >> 1;

const Shop = observer(() => {
  const store = useLocalObservable(() => new ShopStore());

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestGoodsList();
    store.requestTop10Category();
  }, [store]);

  const onSearchPress = () => {
    navigation.navigate('SearchGoods');
  };

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      searchLayout: {
        flex: 1,
        height: 32,
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      serchIcon: {
        width: 16,
        height: 16,
      },
      searchTxt: {
        fontSize: 12,
        color: '#bbb',
        marginLeft: 6,
      },
      manuIconIcon: {
        width: 22,
        height: 22,
        marginHorizontal: 6,
      },
    });

    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.searchLayout} onPress={onSearchPress}>
          <Image source={icon_search} style={styles.serchIcon} />
          <Text style={styles.searchTxt}>坤坤🏀</Text>
        </TouchableOpacity>
        <Image source={icon_shop_car} style={styles.manuIconIcon} />
        <Image source={icon_orders} style={styles.manuIconIcon} />
        <Image source={icon_menu_more} style={styles.manuIconIcon} />
      </View>
    );
  };

  const renderItem = ({item}: {item: GoodsSimple}) => {
    const styles = StyleSheet.create({
      item: {
        width: ITEM_WIDTH,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginLeft: 6,
        marginTop: 6,
      },
      img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
      },
      titleTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
      profix: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 4,
      },
      priceTxt: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'justify',
      },
      originTxt: {
        fontSize: 13,
        color: '#999',
        fontWeight: 'normal',
      },
      promotionTxt: {
        width: 78,
        fontSize: 12,
        color: '#999',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#999',
        textAlign: 'center',
        marginTop: 4,
      },
    });

    return (
      <View style={styles.item}>
        <Image style={styles.img} source={{uri: item.image}} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        {!!item.promotion && (
          <Text style={styles.promotionTxt}>{item.promotion}</Text>
        )}
        <Text style={styles.profix}>
          ¥
          <Text style={styles.priceTxt}>
            {item.price}{' '}
            {!!item.originPrice && (
              <Text style={styles.originTxt}>原价: {item.originPrice}</Text>
            )}
          </Text>
        </Text>
      </View>
    );
  };

  const ListHeader = () => {
    const {categoryList} = store;
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      categoryItem: {
        width: '20%',
        alignItems: 'center',
        paddingVertical: 16,
      },
      itemImg: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      itemNameTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
    });
    return (
      <View style={styles.container}>
        {categoryList.map((item, index) => {
          return (
            <View style={styles.categoryItem} key={`${item.name}-${index}`}>
              <Image source={{uri: item.image}} style={styles.itemImg} />
              <Text style={styles.itemNameTxt}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.goodsList}
        extraData={[store.categoryList]}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}></FlatList>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default Shop;
