import React, { useState } from 'react';
import { UserModelState, ConnectProps, Loading, connect } from 'umi';
import { Tabs } from "antd"
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { ProFormText, LoginForm, ProFormCheckbox } from '@ant-design/pro-form';
import type { LoginParamsType } from "@/services/login"
import styles from './index.less';

type LoginType = 'phone' | 'account';

interface IProps extends ConnectProps {
  userInfo: UserModelState;
  loading: boolean
}


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

const Login: React.FC<IProps> = ({ dispatch, location }) => {

  // 扫码状态 通过微信登录
  const [loginType, setLoginType] = useState < LoginType > ('account');
  const [submitting, setSubmitting] = useState < boolean > (false);
  const { query: { redirect } } = location
  // 获取全局状态
  const handleSubmit = async (values: LoginParamsType) => {
    dispatch({ type: 'userInfo/login', payload: values });
  }

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
/** redux dva 使用 */
export default connect(
  ({ userInfo, loading }: { userInfo: UserModelState; loading: Loading }) => ({
    userInfo,
    loading: loading.models.index,
  }),
)(Login)