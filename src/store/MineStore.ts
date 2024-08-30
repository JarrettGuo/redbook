import Loading from '../components/widget/Loading';
import {request} from '../utils/request';
import {makeAutoObservable, runInAction} from 'mobx';

export default class MineStore {
  refreshing: boolean = false;
  info: any = {};
  noteList: ArticleSimple[] = [];
  collectionList: ArticleSimple[] = [];
  favorateList: ArticleSimple[] = [];

  constructor() {
    makeAutoObservable(this); // 自动将所有字段和方法变为可观察
  }

  requestAll = async () => {
    Loading.show();

    // 将 this.refreshing 的状态修改封装在 runInAction 中
    runInAction(() => {
      this.refreshing = true;
    });

    Promise.all([
      this.requestNoteList(),
      this.requestCollectionList(),
      this.requestFavorateList(),
      this.requestInfo(),
    ]).then(() => {
      Loading.hide();

      // 将 this.refreshing 的状态修改封装在 runInAction 中
      runInAction(() => {
        this.refreshing = false;
      });
    });
  };

  requestNoteList = async () => {
    try {
      const {data} = await request('noteList', {});
      runInAction(() => {
        this.noteList = data || [];
      });
    } catch (e) {
      console.error(e);
    }
  };

  requestCollectionList = async () => {
    try {
      const {data} = await request('collectionList', {});
      runInAction(() => {
        this.collectionList = data || [];
      });
    } catch (e) {
      console.error(e);
    }
  };

  requestFavorateList = async () => {
    try {
      const {data} = await request('favorateList', {});
      runInAction(() => {
        this.favorateList = data || [];
      });
    } catch (e) {
      console.error(e);
    }
  };

  requestInfo = async () => {
    try {
      const {data} = await request('accountInfo', {});
      runInAction(() => {
        this.info = data || {};
      });
    } catch (e) {
      console.error(e);
    }
  };
}
