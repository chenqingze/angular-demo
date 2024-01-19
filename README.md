# HappinessAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Todo List

### no business list

- [ ] Localize
- [ ] fix 文本框回车事件自动提交
- [ ] ngx-wig 自定义功能
    - [ ] 增加图片
    - [ ] 段落位置：剧中，左对齐，有对齐等
    - [ ] 文字颜色
- [ ] 上传多张图片时顺序调整/排序功能
- [ ] reporting progress on uploaded files.
- [ ] angular material custom component style
    - [ ] hidden radio but keep accessible
- [ ] elegant way to refresh component after submit
- [ ] Service Worker apply
    - [ ] use app-shell pattern

### business list

- [ ] 分类管理
    - [x] 查看分类列表
    - [x] 添加分类
    - [x] 编辑分类
    - [x] 删除分类
    - [ ] 分类排序
    - [ ] 启用/禁用分类
    - [ ] 子分类管理
        - [x] 查看子分类列表
        - [x] 添加子分类
        - [x] 删除子分类
        - [ ] 子分类排序
        - [ ] 启用和禁用子分类
    - [ ] 属于分类的产品管理
        - [ ] 查看分类的产品列表
        - [ ] 分配产品到分类
        - [ ] 对分类内的产品进行排序
    - [ ] 属于分类的推荐产品管理
        - [ ] 查看分类的推荐产品列表
        - [ ] 添加推荐产品到分类
        - [ ] 对分类内的推荐产品进行排序
    - [ ] 导入/导出分类

- [ ] 产品类别与产品属性
    - [ ] 产品类别管理
        - [x] 查看类别列表
        - [x] 添加类别
        - [x] 删除类别
        - [ ] 编辑类别名称
        - [ ] 类别排序
    - [ ] 产品属性管理
        - [x] 查看属性列表（包含所有全局属性和产品类别属性）
          - [x] 全局属性列表
          - [x] 产品类别属性列表
        - [x] 添加属性
        - [ ] 编辑属性
        - [x] 删除属性
        - [ ] 属性排序
        - [ ] 属性选项管理
          - [x] 添加属性选项
          - [ ] 编辑属性选项
          - [x] 删除属性选项
          - [ ] 属性选项排序
        - [ ] 是否显示属性到价格选项
        - [ ] 属性分组管理
            - [ ] 查看属性分组列表
            - [ ] 添加属性分组
            - [ ] 编辑属性分组
            - [ ] 删除属性分组
            - [ ] 分配属性到分组

-[ ] 产品管理
    - [ ] 产品列表
    - [ ] 添加产品
    - [ ] 删除产品
    - [ ] 编辑产品详情
    - [ ] 启用和禁用产品
    - [ ] 启用和禁用促销
    - [ ] 推荐产品列表
    - [ ] 特定产品属性管理
    - [ ] 为产品添加属性值
    - [ ] 产品变体管理

-[ ] 库存管理

-[ ] 订单管理

-[ ] 收银管理

-[ ] 配送管理

-[ ] 客户(会员)管理