import {request} from '../utils/request';
import {action, makeAutoObservable, runInAction} from 'mobx';
import {load} from '../utils/Storage';
import Loading from '../components/widget/Loading';

const SIZE = 10;
export default class HomeStore {
  page: number = 1;
  homeList: ArticleSimple[] = [];
  refreshing: boolean = false;
  categoryList: Category[] = [];

  constructor() {
    makeAutoObservable(this); // 自动将所有字段和方法变为可观察
  }

  @action
  resetPage = () => {
    this.page = 1;
  };

  requestHomeList = async () => {
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
      const {data} = await request('homeList', params);
      runInAction(() => {
        //用于分页加载
        if (data?.length) {
          if (this.page === 1) {
            this.homeList = data;
          } else {
            this.homeList = [...this.homeList, ...data];
          }
          this.page = this.page + 1;
        } else {
          if (this.page === 1) {
            this.homeList = [];
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

  getCategoryList = async () => {
    const catchListStr = await load('categoryList');
    runInAction(() => {
      if (catchListStr) {
        const catchList = JSON.parse(catchListStr);
        if (catchList?.length) {
          this.categoryList = catchList;
        } else {
          this.categoryList = DEFAULT_CATEGORY_LIST;
        }
      } else {
        this.categoryList = DEFAULT_CATEGORY_LIST;
      }
    });
  };
}

const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  {name: '推荐', default: true, isAdd: true},
  {name: '视频', default: true, isAdd: true},
  {name: '直播', default: true, isAdd: true},
  {name: '摄影', default: false, isAdd: true},

  {name: '穿搭', default: false, isAdd: true},
  {name: '读书', default: false, isAdd: true},
  {name: '影视', default: false, isAdd: true},
  {name: '科技', default: false, isAdd: true},

  {name: '健身', default: false, isAdd: true},
  {name: '科普', default: false, isAdd: true},
  {name: '美食', default: false, isAdd: true},
  {name: '情感', default: false, isAdd: true},

  {name: '舞蹈', default: false, isAdd: true},
  {name: '学习', default: false, isAdd: true},
  {name: '男士', default: false, isAdd: true},
  {name: '搞笑', default: false, isAdd: true},

  {name: '汽车', default: false, isAdd: true},
  {name: '职场', default: false, isAdd: true},
  {name: '运动', default: false, isAdd: true},
  {name: '旅行', default: false, isAdd: true},

  {name: '音乐', default: false, isAdd: true},
  {name: '护肤', default: false, isAdd: true},
  {name: '动漫', default: false, isAdd: true},
  {name: '游戏', default: false, isAdd: true},

  // 默认添加频道
  {name: '家装', default: false, isAdd: false},
  {name: '心理', default: false, isAdd: false},
  {name: '户外', default: false, isAdd: false},
  {name: '手工', default: false, isAdd: false},

  {name: '减脂', default: false, isAdd: false},
  {name: '校园', default: false, isAdd: false},
  {name: '社科', default: false, isAdd: false},
  {name: '露营', default: false, isAdd: false},

  {name: '文化', default: false, isAdd: false},
  {name: '机车', default: false, isAdd: false},
  {name: '艺术', default: false, isAdd: false},
  {name: '婚姻', default: false, isAdd: false},

  {name: '家居', default: false, isAdd: false},
  {name: '母婴', default: false, isAdd: false},
  {name: '绘画', default: false, isAdd: false},
  {name: '壁纸', default: false, isAdd: false},

  {name: '头像', default: false, isAdd: false},
];
