# 应用部署文档

## 环境准备

### 系统要求
- Linux/Unix 或 Windows 系统
- Node.js 16.x 或更高版本
- MySQL 8.x 或更高版本

### 云服务器配置
- 推荐配置：2核4G内存，40G硬盘
- 开放端口：3000（应用端口）、3306（MySQL端口，可选）

## 安装步骤

### 1. 安装依赖

#### 服务器依赖
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm mysql-server

# CentOS/RHEL
sudo yum update
sudo yum install -y nodejs npm mysql-server

# Windows
# 下载并安装 Node.js：https://nodejs.org/
# 下载并安装 MySQL：https://dev.mysql.com/downloads/
```

#### 应用依赖
```bash
# 进入项目根目录
cd /path/to/project

# 安装后端依赖
npm install

# 安装前端依赖
cd frontend
npm install
```

### 2. 构建前端项目

```bash
# 进入前端目录
cd frontend

# 构建前端项目
npm run build
```

构建完成后，前端文件将生成在 `frontend/dist` 目录下。

### 3. 配置MySQL数据库

```bash
# 登录MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户（可选）
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';

# 授权用户
GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';

# 刷新权限
FLUSH PRIVILEGES;

# 退出MySQL
EXIT;
```

### 4. 配置环境变量

创建或修改 `.env` 文件，配置以下内容：

```env
# 数据库配置
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

# JWT配置
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=24h

# 邮件配置（可选）
# EMAIL_HOST=smtp.example.com
# EMAIL_PORT=587
# EMAIL_USER=your_email@example.com
# EMAIL_PASSWORD=your_email_password
# EMAIL_FROM=your_email@example.com

# 服务器配置
PORT=3000
NODE_ENV=production
```

### 5. 启动应用

#### 开发模式（不推荐用于生产环境）
```bash
npm run dev
```

#### 生产模式

```bash
# 使用pm2管理进程（推荐）
npm install -g pm2
pm start
```

或

```bash
# 直接启动
npm start
```

## 访问应用

应用启动后，可以通过以下地址访问：
```
http://your-server-ip:3000
```

## 常见问题

### 1. 数据库连接失败
- 检查MySQL服务是否正在运行
- 检查数据库配置是否正确
- 确保数据库用户有正确的权限

### 2. 应用无法访问
- 检查防火墙是否开放了3000端口
- 检查应用是否正在运行
- 查看应用日志，查找错误信息

### 3. 前端页面显示404
- 确保前端项目已经正确构建
- 检查后端是否正确配置了静态文件服务

## 维护与更新

### 备份数据库

```bash
mysqldump -u your_username -p your_database_name > backup.sql
```

### 更新应用

```bash
# 拉取最新代码
git pull

# 安装新依赖
npm install

# 构建前端
cd frontend
npm install
npm run build
cd ..

# 重启应用
pm restart
```
