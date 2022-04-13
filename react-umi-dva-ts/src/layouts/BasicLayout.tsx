import type { BasicLayoutProps as ProLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import React, { useEffect } from "react"
import ProLayout from '@ant-design/pro-layout';
import defaultSettings from '../../config/defaultSettings';
import type { AccessType } from '@/access';
import menu from '../../config/headerMenu';
import {  Link, useAccess } from 'umi';
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
            menuDataRender={() => menuDataRender(menu, access)}
        >44</ProLayout>
    )
}


export default BasicLayout