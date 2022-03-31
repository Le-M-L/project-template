import React, { useState } from 'react';
import { message, Tabs, Tooltip } from "antd"
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { ProFormText, LoginForm, ProFormCheckbox } from '@ant-design/pro-form';
import type { LoginParamsType } from "@/services/login"
import { login } from '@/services/login';
import { getCurrentUser } from "@/services/user"
import { useModel } from '@@/plugin-model/useModel';
import styles from './index.less';

type LoginType = 'phone' | 'account';

const accountLogin = () => {

  return (
    <>
      <ProFormText name="username" fieldProps={{ size: "large", prefix: <UserOutlined className={'prefixIcon'} />, }} placeholder={'请输入用户名'} rules={[{ required: true, message: '请输入用户名!', }]} />
      <ProFormText.Password name="password" fieldProps={{ size: "large", prefix: <LockOutlined className={'prefixIcon'} />, }} placeholder={'请输入密码'} rules={[{ required: true, message: '请输入密码！', }]} />
    </>
  )
}

const phoneLogin = () => {
  return <ProFormText fieldProps={{ size: "large" }} placeholder={'请输入手机号'} />
}

const Login: React.FC = () => {
  // 扫码状态 通过微信登录
  const [loginType, setLoginType] = useState<LoginType>('account');
  const [submitting, setSubmitting] = useState<boolean>(false);
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  const handleSubmit = async (values: LoginParamsType) => {
    let { data } = await login(values);
    document.cookie = `token=${data.token}`
    console.log(data)
  }
  const { user, fetchUser } = useModel('useUserModel', model => ({ user: model.user, fetchUser: model.fetchUser }));
  console.log(user,fetchUser)

  return <div className={styles.main} >
    <LoginForm initialValues={{
      username: 'leml',
      password: 'leml123456'
    }} logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png" title="Github"
      subTitle="全球最大同性交友网站" onFinish={async (values) => handleSubmit(values as LoginParamsType)} >
      <Tabs accessKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)} >
        <Tabs.TabPane key={"account"} tab="账号密码登录" ></Tabs.TabPane>
        <Tabs.TabPane key={"phone"} tab="手机号登录" ></Tabs.TabPane>
      </Tabs>
      {loginType === 'account' && accountLogin()}
      {loginType === 'phone' && phoneLogin()}
      <div style={{ marginBottom: 24 }} >
        <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox>
        <a style={{ float: 'right', }} > 忘记密码 </a>
      </div>
    </LoginForm>
  </div>
}

export default Login