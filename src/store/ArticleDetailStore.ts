import {request} from '../utils/request';
import {makeAutoObservable, runInAction} from 'mobx';
import Loading from '../components/widget/Loading';

export default class ArticelDetailStore {
  detail: Article = {} as Article;

  constructor() {
    makeAutoObservable(this); // 自动将所有字段和方法变为可观察
  }

  requestArticleDetail = async (id: number) => {
    Loading.show();
    try {
      const params = {
        id,
      };
      const {data} = await request('articleDetail', params);
      runInAction(() => {
        this.detail = data;
      });
    } catch (e) {
      console.error(e);
    } finally {
      Loading.hide();
    }
  };
}
