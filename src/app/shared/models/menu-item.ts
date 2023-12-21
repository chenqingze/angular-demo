/**
 * 导航类型.
 */
enum MenuType {
    MODULE,
    PAGE,
    ACTION
}

/**
 * 导航菜单项.
 */
interface MenuItem {
    id?: string;
    name: string;
    type: MenuType;
    displayOrder?: number;
    isShownInMenu?: boolean;
    enabled?: boolean;
    permit?: string; // 权限
    cached?: boolean; // 是否支持路由器复用/是否缓存
    icon?: string; // 图标
    url?: string; // 路由路径/外部链接地址
    target?: string; // 外部链接打开方式：_blank | _self | _parent | _top
    expandable?: boolean; // 是否有子节点/是否可展开
    children?: MenuItem[]; // 子节点
}


export {MenuType, MenuItem}