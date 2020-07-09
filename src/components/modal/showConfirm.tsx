import {Modal} from 'antd';

const { confirm } = Modal;
export function showConfirm(promise: () => void, message: string) {
  confirm({
    title: message,
    onOk() {
      promise();
    },
  });
}

