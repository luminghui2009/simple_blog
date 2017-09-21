## package.json文件初始化
- npm init -y
## 安装依赖
- yarn add webpack  webpack-dev-server html-webpack-plugin --dev
- yarn add react react-router-dom react-redux redux react-dom
- yarn add express mongoose
- yarn add babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react css-loader file-loader less less-loader style-loader url-loader --dev
## 配置webpack
## 配置.babelrc语法编译
```
{
  "presets": ["es2015","stage-0","react"]
}
```
## 跑通路由
- 首页包含左侧一个导航栏，右边是一个展示区
