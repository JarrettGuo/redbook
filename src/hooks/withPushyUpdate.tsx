import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Icon, PaperProvider, Snackbar, Banner} from 'react-native-paper';
import {usePushy} from 'react-native-update';

const withPushyUpdate = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const {
      checkUpdate,
      downloadUpdate,
      switchVersionLater,
      switchVersion,
      updateInfo,
      progress: {received, total} = {},
    } = usePushy();

    const [showUpdateBanner, setShowUpdateBanner] = useState(false);
    const [showUpdateSnackbar, setShowUpdateSnackbar] = useState(false);
    const snackbarVisible = showUpdateSnackbar && updateInfo?.update;

    // 添加 checkUpdate 作为依赖
    useEffect(() => {
      checkUpdate();
    }, [checkUpdate]);

    // 检查更新信息
    useEffect(() => {
      if (updateInfo?.update) {
        setShowUpdateSnackbar(true);
      }
    }, [updateInfo]);

    // 将 Icon 组件提取到外部
    const UpdateIcon = ({size}: {size: number}) => (
      <Icon name="checkcircleo" size={size} color="#00f" />
    );

    return (
      <PaperProvider>
        <WrappedComponent {...props} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            更新下载进度：{received} / {total}
          </Text>
        </View>
        {snackbarVisible && (
          <Snackbar
            visible={true}
            onDismiss={() => setShowUpdateSnackbar(false)}
            action={{
              label: '更新',
              onPress: async () => {
                setShowUpdateSnackbar(false);
                await downloadUpdate();
                setShowUpdateBanner(true);
              },
            }}>
            <Text>有新版本({updateInfo.name})可用，是否更新？</Text>
          </Snackbar>
        )}
        <Banner
          style={{width: '100%', position: 'absolute', top: 0}}
          visible={showUpdateBanner}
          actions={[
            {
              label: '立即重启',
              onPress: switchVersion,
            },
            {
              label: '下次再说',
              onPress: () => {
                switchVersionLater();
                setShowUpdateBanner(false);
              },
            },
          ]}
          icon={UpdateIcon}>
          更新已完成，是否立即重启？
        </Banner>
      </PaperProvider>
    );
  };
};

export default withPushyUpdate;
