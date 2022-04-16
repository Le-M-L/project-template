import React, { useEffect } from "react"
import { Link, useAccess, useModel, useDispatch } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import defaultSettings from '../../config/defaultSettings';
import menu from '../../config/headerMenu';

import type { BasicLayoutProps as ProLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import type { AccessType } from '@/access';

export interface BasicLayoutProps extends ProLayoutProps {
    route: ProLayoutProps['route'] & {
        authority: string[];
    };
}

/** 菜单权限 */
const menuDataRender = (menuList: MenuDataItem[], access: AccessType): MenuDataItem[] => {
    return menuList.filter((menuItem) => {
        return !menuItem.access || access[menuItem.access];
    });
};

/** 基本布局 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const access = useAccess();
    const { children } = props;
    const dispatch = useDispatch();
    dispatch({
        type:'userInfo/logout',
        payload:true
    })
    return (
        <ProLayout
            title="游戏网"
            {...props}
            {...defaultSettings}
            layout={'mix'}
            headerTheme="light"
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || !menuItemProps.path) {
                    return defaultDom;
                }
                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            splitMenus
            menuDataRender={() => menuDataRender(menu, access)}
            headerTitleRender={() => <div>left</div>}
            headerContentRender={() => <div>23</div>}
            rightContentRender={() => <div>right</div>}
        >{children}</ProLayout>
    )
}


export default BasicLayout