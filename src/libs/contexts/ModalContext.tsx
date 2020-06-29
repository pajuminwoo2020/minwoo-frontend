import React, {createContext, useState} from 'react';

export type TModalData = {
  visible: boolean;
  onFinish?: (data?: any) => void;
  record?: any;
  type?: string;
  searchInputDisabled?: boolean;
};

export type TModal = {
  [key: string]: TModalData
}

export type TModalContext = {
  modal: TModal;
  setModal(modal: TModal): void;
};

export const ModalContext = createContext<TModalContext>({
  modal: {},
  setModal: () => {
  },
});

export const ModalProvider: React.FC<{}> = ({children}) => {
  const [modal, setModal] = useState({});

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
