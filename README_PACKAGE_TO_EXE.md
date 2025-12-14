# 会员管理系统 - 网站封装为EXE程序完整指南

本文档提供了将会员管理系统网站封装为Windows桌面应用程序（.exe）的完整解决方案。

## 当前项目状态

我们已经完成了所有必要的配置工作，但由于环境网络限制，无法直接安装Electron依赖并生成实际的EXE文件。以下是已完成的配置：

1. **前端项目配置已优化**
   - 更新了Vite配置，支持相对路径和Electron环境
   - 验证了前端项目可以正常构建

2. **Electron核心文件已创建**
   - `main.js`: Electron主进程入口
   - `preload.js`: 预加载脚本

3. **构建配置已完成**
   - `package.json`已配置Electron构建参数
   - 添加了必要的打包脚本

4. **辅助工具已提供**
   - 打包辅助工具：`electron_packaging_helper.js`
   - 详细使用说明：`README_ELECTRON.md`

## 完整打包流程（在正常网络环境中执行）

### 步骤1：安装Node.js环境

确保安装Node.js v16.14.0或更高版本。您可以从官网下载安装：
https://nodejs.org/

### 步骤2：进入项目目录

```bash
cd c:\新建文件夹\demo\frontend
```

### 步骤3：安装依赖

```bash
# 清理npm缓存（可选）
npm cache clean --force

# 安装项目基础依赖
npm install

# 安装Electron及相关依赖
npm install --save-dev electron electron-builder concurrently wait-on
```

### 步骤4：构建前端项目

```bash
npm run build
```

### 步骤5：打包为Windows安装程序

```bash
npm run package:win
```

### 步骤6：获取打包结果

打包成功后，在以下目录找到安装程序：

```
c:\新建文件夹\demo\frontend\dist_electron\
└── 会员管理系统 Setup x.y.z.exe
```

## 常见问题解决

### 问题1：无法安装Electron依赖

**解决方案：** 使用npm镜像加速

```bash
# 使用淘宝npm镜像
npm config set registry https://registry.npm.taobao.org
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set electron-builder-binaries_mirror https://npm.taobao.org/mirrors/electron-builder-binaries/

# 然后再安装依赖
npm install --save-dev electron electron-builder concurrently wait-on
```

### 问题2：打包过程中出现网络超时

**解决方案：** 增加超时时间

```bash
# 在package.json中修改打包命令
"package:win": "electron-builder --win --x64 --publish never --download.mirrorOptions.timeout 120000"
```

### 问题3：应用启动后无法连接后端

**解决方案：** 确保后端服务正在运行

```bash
# 在项目根目录启动后端服务
cd c:\新建文件夹\demo
node server.js
```

## 使用说明

1. **安装应用**
   - 双击`会员管理系统 Setup x.y.z.exe`
   - 按照安装向导完成安装

2. **启动应用**
   - 从桌面快捷方式或开始菜单启动应用
   - 应用会自动加载前端界面

3. **连接后端**
   - 确保后端服务(`node server.js`)正在运行
   - 应用默认连接到`http://localhost:3000`

4. **文件上传功能**
   - 确保后端`uploads`目录存在且有写入权限
   - 应用支持上传Word(.doc, .docx)和PDF格式文件

## 技术细节

### 已配置的Electron参数

- **应用名称**: 会员管理系统
- **应用ID**: com.frontend.app
- **打包格式**: Windows NSIS安装程序(x64)
- **输出目录**: dist_electron
- **窗口大小**: 1200x800像素

### 项目文件说明

- **main.js**: Electron主进程，负责创建窗口和管理应用生命周期
- **preload.js**: 预加载脚本，提供安全的进程间通信
- **dist/**: 前端构建产物目录
- **public/**: 应用资源目录

## 注意事项

1. **网络要求**：安装Electron和打包过程需要访问GitHub和npm仓库
2. **端口占用**：确保3000端口未被占用，或修改配置使用其他端口
3. **文件权限**：确保相关目录有适当的读写权限
4. **Windows兼容性**：支持Windows 10及更高版本

## 附加资源

- **详细Electron文档**: https://www.electronjs.org/docs
- **electron-builder文档**: https://www.electron.build/
- **Vite文档**: https://vitejs.dev/guide/

---

通过本指南，您可以在有良好网络连接的环境中，轻松将会员管理系统封装为Windows桌面应用程序。如有任何问题，请参考上述文档或联系技术支持。