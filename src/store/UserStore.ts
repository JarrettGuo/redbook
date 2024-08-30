import {request} from '../utils/request';
import {makeAutoObservable, runInAction} from 'mobx';
import {save} from '../utils/Storage';
import Loading from '../components/widget/Loading';

class UserStore {
  userInfo: any = null;

  constructor() {
    makeAutoObservable(this); // 自动将所有字段和方法变为可观察
  }

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  requestLogin = async (
    phone: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) => {
    Loading.show();
    try {
      const params = {name: phone, pwd};
      const {data} = await request('login', params);

      runInAction(() => {
        if (data) {
          this.userInfo = data;
          save('userInfo', JSON.stringify(data));
          callback?.(true);
        } else {
          this.userInfo = null;
          callback?.(false);
        }
      });
    } catch (e) {
      console.error(e);
      runInAction(() => {
        this.userInfo = null;
        callback?.(false);
      });
    } finally {
      Loading.hide();
    }
  };
}

//ESM单例导出
export default new UserStore();
