import React from 'react';
import { getPageTitle } from '@ant-design/pro-layout';
// 管理对文档头的更改
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Inspector } from 'react-dev-inspector';
import type { ConnectProps } from 'umi';
import defaultSettings from '../../config/defaultSettings';
import styles from './UserLayout.less';

export type UserLayoutProps = Partial<ConnectProps>
const isDev = process.env.NODE_ENV === 'development';
const InspectorWrapper = isDev ? Inspector : React.Fragment;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
    const { children, location = { pathname: '' } } = props;
    // 获取当前页面title
    const title = getPageTitle({
        pathname: location.pathname,
        ...defaultSettings,
    });
    return <HelmetProvider>
        {/* https://github.com/zthxxx/react-dev-inspector   用于调试 */}
        <InspectorWrapper keys={['control', 'shift', 'command', 'c']} disableLaunchEditor={false}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>
            <div className={styles.container}>
                {children}
            </div>
        </InspectorWrapper>
    </HelmetProvider>
}

export default UserLayout;
