import {request} from '../utils/request';
import {action, makeAutoObservable, runInAction, flow} from 'mobx';
import Loading from '../components/widget/Loading';

const SIZE = 10;
export default class ShopStore {
  page: number = 1;
  goodsList: GoodsSimple[] = [];
  refreshing: boolean = false;
  categoryList: GoodsCategory[] = [];

  constructor() {
    makeAutoObservable(this); // 自动将所有字段和方法变为可观察
  }

  @action
  resetPage = () => {
    this.page = 1;
  };

  @action
  requestGoodsList = async () => {
    if (this.refreshing) {
      return;
    }
    Loading.show();
    try {
      runInAction(() => {
        this.refreshing = true;
      });
      const params = {
        page: this.page,
        size: SIZE,
      };
      const {data} = await request('goodsList', params);
      runInAction(() => {
        //用于分页加载
        if (data?.length) {
          if (this.page === 1) {
            this.goodsList = data;
          } else {
            this.goodsList = [...this.goodsList, ...data];
          }
          this.page = this.page + 1;
        } else {
          if (this.page === 1) {
            this.goodsList = [];
          } else {
            // 没有更多数据
            return;
          }
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.refreshing = false;
      });
      Loading.hide();
    }
  };

  @action
  requestTop10Category = flow(function* (this: ShopStore) {
    try {
      const {data} = yield request('top10Category', {});
      this.categoryList = data || [];
    } catch (error) {
      console.log(error);
    }
  });
}
