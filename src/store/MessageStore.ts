import {request} from '../utils/request';
import {action, makeAutoObservable, runInAction, flow} from 'mobx';
import Loading from '../components/widget/Loading';

const SIZE = 10;
export default class MessageStore {
  page: number = 1;
  messageList: MessageListItem[] = [];
  refreshing: boolean = false;
  unread: UnRead = {} as UnRead;

  constructor() {
    makeAutoObservable(this); // 自动将所有字段和方法变为可观察
  }

  @action
  resetPage = () => {
    this.page = 1;
  };

  requestMessageList = async () => {
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
      const {data} = await request('messageList', params);
      runInAction(() => {
        //用于分页加载
        if (data?.length) {
          if (this.page === 1) {
            this.messageList = data;
          } else {
            this.messageList = [...this.messageList, ...data];
          }
          this.page = this.page + 1;
        } else {
          if (this.page === 1) {
            this.messageList = [];
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
  requestUnread = flow(function* (this: MessageStore) {
    try {
      const {data} = yield request('unread', {});
      this.unread = data || [];
    } catch (error) {
      console.log(error);
    }
  });
}
