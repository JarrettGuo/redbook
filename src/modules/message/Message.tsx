import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import {useLocalObservable} from 'mobx-react';
import MessageStore from '../../store/MessageStore';
import {observer} from 'mobx-react';
import FloatMenu, {FloatMenuRef} from './FloatMenu';
import Empty from '../../components/Empty';

import icon_group from '../../assets/icon_group.png';
import icon_star from '../../assets/icon_star.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';
import icon_to_top from '../../assets/icon_to_top.png';
import icon_no_collection from '../../assets/icon_no_collection.webp';

const Message = observer(() => {
  const store = useLocalObservable(() => new MessageStore());

  const ref = useRef<FloatMenuRef>(null);

  useEffect(() => {
    store.requestMessageList();
    store.requestUnread();
  }, [store]);

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleTxt: {
        fontSize: 16,
        color: '#333',
      },
      groutButton: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 16,
      },
      iconGroup: {
        width: 16,
        height: 16,
      },
      groupTxt: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>消息</Text>
        <TouchableOpacity
          style={styles.groutButton}
          onPress={(event: GestureResponderEvent) => {
            //使用event.nativeEvent获取原生事件的pageY
            const {pageY} = event.nativeEvent;
            //将菜单显示在pageY的下方 48是菜单的高度
            ref.current?.show(pageY + 48);
          }}>
          <Image source={icon_group} style={styles.iconGroup} />
          <Text style={styles.groupTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}: {item: MessageListItem}) => {
    const styles = StyleSheet.create({
      item: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      avatarImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        resizeMode: 'contain',
      },
      contentLayout: {
        flex: 1,
        marginHorizontal: 12,
      },
      nameTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      lastMessageTxt: {
        fontSize: 15,
        color: '#999',
        marginTop: 4,
      },
      rightLayout: {
        alignItems: 'flex-end',
      },
      timeTxt: {
        fontSize: 12,
        color: '#999',
      },
      iconTop: {
        width: 8,
        height: 16,
        marginTop: 6,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.item}>
        <Image source={{uri: item.avatarUrl}} style={styles.avatarImg} />
        <View style={styles.contentLayout}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={styles.lastMessageTxt}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightLayout}>
          <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
          <Image style={styles.iconTop} source={icon_to_top} />
        </View>
      </View>
    );
  };

  const UnRead = ({count}: {count: number}) => {
    const styles = StyleSheet.create({
      txt: {
        position: 'absolute',
        top: -6,
        right: -10,
        backgroundColor: '#ff2442',
        paddingHorizontal: 8,
        height: 24,
        borderRadius: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
      },
    });
    return <Text style={styles.txt}>{count > 99 ? '99+' : count}</Text>;
  };

  const Header = () => {
    const {unread} = store;
    const styles = StyleSheet.create({
      headerLayout: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingVertical: 20,
      },
      headerItem: {
        flex: 1,
        alignItems: 'center',
      },
      itemImg: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
      },
      itemTxt: {
        fontSize: 16,
        color: '#333',
        marginTop: 8,
      },
    });
    return (
      <View style={styles.headerLayout}>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_star} style={styles.itemImg} />
            {!!unread?.unreadFavourate && (
              <UnRead count={unread.unreadFavourate} />
            )}
          </View>
          <Text style={styles.itemTxt}>赞和收藏</Text>
        </View>

        <View style={styles.headerItem}>
          <View>
            <Image source={icon_new_follow} style={styles.itemImg} />
            {!!unread?.newFollow && <UnRead count={unread.newFollow} />}
          </View>
          <Text style={styles.itemTxt}>新增关注</Text>
        </View>

        <View style={styles.headerItem}>
          <View>
            <Image source={icon_comments} style={styles.itemImg} />
            {!!unread?.comment && <UnRead count={unread.comment} />}
          </View>
          <Text style={styles.itemTxt}>评论和@</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.messageList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={<Empty icon={icon_no_collection} tips="暂无消息" />}
      />
      <FloatMenu ref={ref} />
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

export default Message;
