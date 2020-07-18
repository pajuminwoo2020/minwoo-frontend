import {Col, Form, Input, Row, Select, Modal} from 'antd';
import {get} from 'lodash';
import {FormInstance} from 'rc-field-form';
import React, {useEffect, useState} from 'react';
import DaumPostcode from 'react-daum-postcode';

type TAddressModalProps = {
  visible: boolean;
  setVisible: any;
  onFinish: any;
};
const AddressModal = ({visible, setVisible, onFinish}: TAddressModalProps) => {
  function handleAddress(data: any) {
    const postalCode = get(data, 'zonecode');
    let addressStreet = '';

    if (get(data, 'userSelectedType', 'J') === 'J')
      addressStreet = get(data, 'jibunAddress');
    else
      addressStreet = get(data, 'roadAddress');

    onFinish(postalCode, addressStreet);
    handleCancel();
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="우편번호찾기"
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={null}
      onCancel={handleCancel}
    >
      <DaumPostcode
        height="auto"
        onComplete={handleAddress}
        style={{marginBottom: '10px'}}
      />
    </Modal>
  );
};

AddressModal.defaultProps = {};

export default AddressModal;
