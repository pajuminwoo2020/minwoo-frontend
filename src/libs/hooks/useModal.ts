import {get} from 'lodash';
import {useContext} from 'react';
import {ModalContext, TModalData} from 'libs/contexts/ModalContext';

export default function useModal() {
  const {modal, setModal} = useContext(ModalContext);

  return [modal, setModal] as [typeof modal, typeof setModal];
}

export function useModalByKey(key: string) {
  const {modal, setModal} = useContext(ModalContext);
  const modalData = get(modal, key) as TModalData;

  return [modal, setModal, modalData] as [typeof modal, typeof setModal, typeof modalData];
}
