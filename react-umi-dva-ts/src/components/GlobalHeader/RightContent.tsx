import React from 'react'
import type { Settings as ProSettings } from '@ant-design/pro-layout';

import HeaderSearch from "@/components/HeaderSearch"

type GlobalHeaderRightProps = Partial<ProSettings>;

/**
 * 全局菜单右侧
 * @returns 
 */
const RightContent: React.FC<GlobalHeaderRightProps> = () => {
    
    return <div>
        <HeaderSearch />

    </div>
}

export default RightContent