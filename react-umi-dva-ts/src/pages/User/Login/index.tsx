import React, { useState } from 'react';
import { message, Tabs, Tooltip } from "antd"
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LoginParamsType } from "@/services/login"
import styles from './index.less';

const Login: React.FC = () => {
  // 扫码状态 通过微信登录
  const [type, setType] = useState<string>('scan');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const handleSubmit = async (values: LoginParamsType) => {
    console.log(values)
  }

  return <div className={styles.main} >
    <ProForm onFinish={async (values) => handleSubmit(values as LoginParamsType)}>
      <ProFormText name='captcha' placeholder="请输入名称" rules={[{ required: true, message: '动态码是必填项！' }]} />
    </ProForm>
  </div>
}

export default Login