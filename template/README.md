# {{ name }}

> {{ description }}

## 客户端自带字体

```css
font-family: HY-QiHei40, ETrump-QiHei55, HY-QiHei65;
```

## 项目结构

```bash
├── /dist/           # 项目输出目录
├── /scripts/        # 项目运行脚本
├── /src/            # 项目源码目录
│ ├── /assets/       # 项目资源
│ ├── /components/   # UI组件
│ ├── /directives/   # vue指令
│ ├── /extends/      # 对象的扩展
│ │ └── inVue.js     # vue对象的扩展
│ ├── /mixins/       # 通用方法和接口
│ ├── /pages/        # 起始页面
│ ├── /mocks/        # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── fetchApi.js  # 封装fetch
│ │ ├── params.js    # 构建请求参数和请求方法
│ │ └── updateImg.js # 上传图片的方法
│ └──  config.js     # 大部分的配置项
├── package.json     # 项目信息
├── .babelrc         # babel配置
└── .eslintrc        # Eslint配置
```
