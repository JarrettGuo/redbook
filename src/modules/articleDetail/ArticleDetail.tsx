import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import ArticelDetailStore from '../../store/ArticleDetailStore';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {ImageSlider} from '../../components/slidePager';
import UserStore from '../../store/UserStore';
import dayjs from 'dayjs';
import Heart from '../../components/Heart';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type RouteParams = {
  ArticleDetail: {
    id: number;
  };
};

const ArticleDetail = observer(() => {
  const store = useLocalObservable(() => new ArticelDetailStore());

  const [height, setHeight] = useState<number>(200);

  const navigation = useNavigation();

  // 获取路由参数
  const {params} = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();

  useEffect(() => {
    store.requestArticleDetail(params.id);
  }, [store]);

  useEffect(() => {
    if (!store.detail?.images) {
      return;
    }
    const firstImage = store.detail.images[0];
    Image.getSize(firstImage, (width: number, height: number) => {
      const showHeight = (height * SCREEN_WIDTH) / width;
      setHeight(showHeight);
    });
  }, [store.detail?.images]);

  const renderTitle = () => {
    const {detail} = store;

    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
      },
      backButton: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
      },
      backImg: {
        width: 20,
        height: 20,
      },
      avatarImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'cover',
      },
      userNameTxt: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        marginLeft: 16,
      },
      followTxt: {
        fontSize: 12,
        paddingHorizontal: 16,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff2442',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ff2442',
      },
      shareImg: {
        width: 28,
        height: 28,
        marginHorizontal: 16,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={icon_arrow} style={styles.backImg} />
        </TouchableOpacity>

        {detail.avatarUrl && (
          <Image source={{uri: detail.avatarUrl}} style={styles.avatarImg} />
        )}

        <Text style={styles.userNameTxt}>{detail.userName}</Text>
        <Text style={styles.followTxt}>关注</Text>
        <Image source={icon_share} style={styles.shareImg} />
      </View>
    );
  };

  const renderImages = () => {
    const {detail} = store;
    const {images} = detail;
    const styles = StyleSheet.create({
      activeDot: {
        width: 6,
        height: 6,
        backgroundColor: '#ff2442',
        borderRadius: 3,
      },
      inActiveDot: {
        width: 6,
        height: 6,
        backgroundColor: '#c0c0c0',
        borderRadius: 3,
      },
    });
    if (!images?.length) {
      return null;
    }
    const data: any[] = images.map(item => {
      return {
        img: item,
      };
    });
    return (
      <View style={{paddingBottom: 30}}>
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{height: height}}
          indicatorContainerStyle={{bottom: -40}}
          activeIndicatorStyle={styles.activeDot}
          inActiveIndicatorStyle={styles.inActiveDot}
        />
      </View>
    );
  };

  const renderInfo = () => {
    const {detail} = store;
    const tags = detail.tag?.map(item => `# ${item}`).join(' ');
    const styles = StyleSheet.create({
      articletitleTxt: {
        fontSize: 18,
        color: '#333',
        marginHorizontal: 16,
      },
      descTxt: {
        fontSize: 15,
        color: '#333',
        marginTop: 6,
        paddingHorizontal: 16,
      },
      tagsTxt: {
        fontSize: 15,
        color: '#305090',
        marginTop: 6,
        paddingHorizontal: 16,
      },
      timeAndLocationTxt: {
        fontSize: 12,
        color: '#bbb',
        marginVertical: 16,
        marginLeft: 16,
      },
      line: {
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
      },
    });
    return (
      <>
        <Text style={styles.articletitleTxt}>{detail.title}</Text>
        <Text style={styles.descTxt}>{detail.desc}</Text>
        <Text style={styles.tagsTxt}>{tags}</Text>
        <Text style={styles.timeAndLocationTxt}>
          {detail.dateTime} {detail.location}
        </Text>
        <View style={styles.line} />
      </>
    );
  };

  const renderComments = () => {
    const {detail} = store;
    const count = detail.comments?.length || 0;
    const {userInfo} = UserStore;

    const styles = StyleSheet.create({
      commentCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
        marginLeft: 16,
      },
      inputLayout: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      userAvatarImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: 'cover',
      },
      commentInput: {
        flex: 1,
        height: 32,
        marginLeft: 12,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'center',
        paddingHorizontal: 12,
        paddingVertical: 0,
      },
      commentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
      },
      commentItem: {
        width: '100%',
        flexDirection: 'row',
      },
      commentAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'cover',
      },
      comentLayout: {
        flex: 1,
        marginHorizontal: 12,
      },
      nameTxt: {
        fontSize: 12,
        color: '#999',
      },
      messageTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
      timeLocationtxt: {
        fontSize: 12,
        color: '#bbb',
      },
      heartLayout: {
        alignItems: 'center',
      },
      heartCount: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
      },
      line: {
        marginLeft: 50,
        marginRight: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        marginVertical: 16,
      },
    });
    return (
      <>
        <Text style={styles.commentCount}>
          {count ? `共${count}条评论` : '暂无评论'}
        </Text>

        <View style={styles.inputLayout}>
          <Image source={{uri: userInfo.avatar}} style={styles.userAvatarImg} />
          <TextInput
            style={styles.commentInput}
            placeholder="说点什么吧，万一火了呢～"
            placeholderTextColor={'#bbb'}></TextInput>
        </View>

        {!!count && (
          <View style={styles.commentContainer}>
            {detail.comments?.map((item: ArticleComment, index: number) => {
              return (
                <View key={index}>
                  <View style={styles.commentItem}>
                    <Image
                      style={styles.commentAvatar}
                      source={{uri: item.avatarUrl}}
                    />
                    <View style={styles.comentLayout}>
                      <Text style={styles.nameTxt}>{item.userName}</Text>
                      <Text style={styles.messageTxt}>
                        {item.message}{' '}
                        <Text style={styles.timeLocationtxt}>
                          {dayjs(item.dateTime).format('MM-DD')}
                          {item.location}
                        </Text>
                      </Text>
                      {!!item.children?.length &&
                        item.children?.map(
                          (child: ArticleComment, childIndex: number) => {
                            return (
                              <View
                                style={[
                                  styles.commentItem,
                                  {marginTop: 12, width: SCREEN_WIDTH - 80},
                                ]}
                                key={`${index}-${childIndex}`}>
                                <Image
                                  style={styles.commentAvatar}
                                  source={{uri: child.avatarUrl}}
                                />
                                <View style={styles.comentLayout}>
                                  <Text style={styles.nameTxt}>
                                    {child.userName}
                                  </Text>
                                  <Text style={styles.messageTxt}>
                                    {child.message}{' '}
                                    <Text style={styles.timeLocationtxt}>
                                      {dayjs(child.dateTime).format('MM-DD')}
                                      {child.location}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={styles.heartLayout}>
                                  <Heart value={child.isFavorite} size={20} />
                                  <Text style={styles.heartCount}>
                                    {child.favoriteCount === 0
                                      ? ''
                                      : child.favoriteCount}
                                  </Text>
                                </View>
                              </View>
                            );
                          },
                        )}
                    </View>

                    <View style={styles.heartLayout}>
                      <Heart value={item.isFavorite} size={20} />
                      <Text style={styles.heartCount}>
                        {item.favoriteCount === 0 ? '' : item.favoriteCount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line} />
                </View>
              );
            })}
          </View>
        )}
      </>
    );
  };

  const renderBotton = () => {
    const {detail} = store;

    const styles = StyleSheet.create({
      bottomLayout: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      bottomEditLayout: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 12,
        marginRight: 12,
      },
      editImg: {
        width: 20,
        height: 20,
        tintColor: '#333',
      },
      bottomCommentInput: {
        height: '100%',
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
      },
      bottomCount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 8,
      },
      bottomIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 12,
      },
    });

    return (
      <View style={styles.bottomLayout}>
        <View style={styles.bottomEditLayout}>
          <Image source={icon_edit_comment} style={styles.editImg} />
          <TextInput
            style={styles.bottomCommentInput}
            placeholder="说点什么"
            placeholderTextColor={'#333'}
          />
        </View>
        <Heart value={detail.isFavorite} size={30} />
        <Text style={styles.bottomCount}>{detail.favoriteCount}</Text>
        <Image
          source={
            detail.isCollection ? icon_collection_selected : icon_collection
          }
          style={styles.bottomIcon}
        />
        <Text style={styles.bottomCount}>{detail.collectionCount}</Text>
        <Image source={icon_comment} style={styles.bottomIcon} />
        <Text style={styles.bottomCount}>{detail.comments?.length || 0}</Text>
      </View>
    );
  };

  return store.detail ? (
    <View style={styles.root}>
      {renderTitle()}
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {renderImages()}
        {renderInfo()}
        {renderComments()}
      </ScrollView>
      {renderBotton()}
    </View>
  ) : null;
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
export default ArticleDetail;
