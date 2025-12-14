# 广西自动化学会会员管理系统 - 部署指南

## 项目概述

这是一个基于React + Supabase的会员管理系统，支持一键部署到Vercel，通过GitHub Actions实现自动化部署。

## 部署步骤

### 1. 准备GitHub仓库

1. 在GitHub上创建新的仓库
2. 将本地代码推送到GitHub：
```bash
git init
git add .
git commit -m "初始提交：广西自动化学会会员管理系统"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 2. 配置Vercel部署

1. 访问 [Vercel官网](https://vercel.com) 并注册账号
2. 连接GitHub账号
3. 导入项目，选择前端目录 `frontend`
4. 配置环境变量：

**环境变量配置：**
```
VITE_SUPABASE_URL=https://tdbbstlkwmautdwnrgcb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYmJzdGxrd21hdXRkd25yZ2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTQzNjgsImV4cCI6MjA4MTIzMDM2OH0.DcOLXDcoS3l_SRjwacyeMh_SgVs6s1m9eXDcliAuUJU
```

### 3. 配置GitHub Secrets（可选，用于自动化部署）

在GitHub仓库的 Settings > Secrets and variables > Actions 中添加：

- `VERCEL_TOKEN`: 从Vercel账户设置中获取
- `VERCEL_ORG_ID`: Vercel组织ID
- `VERCEL_PROJECT_ID`: Vercel项目ID
- `VITE_SUPABASE_URL`: Supabase项目URL
- `VITE_SUPABASE_ANON_KEY`: Supabase匿名密钥

### 4. 部署验证

1. 推送代码到main分支后，GitHub Actions会自动触发部署
2. 访问Vercel提供的域名验证功能
3. 测试登录、会员管理等功能

## 技术架构

### 前端技术栈
- **React 19**: 用户界面框架
- **Vite**: 构建工具
- **Supabase JS**: 数据库客户端
- **React Router**: 路由管理

### 后端技术栈
- **Supabase**: 完整的后端即服务（BaaS）
- **PostgreSQL**: 数据库
- **Row Level Security (RLS)**: 行级安全策略
- **Edge Functions**: 无服务器函数（可选）

### 部署平台
- **Vercel**: 前端静态网站托管
- **GitHub Actions**: 自动化部署流水线
- **Supabase**: 后端API和数据存储

## 数据库配置

Supabase数据库已包含以下表结构：

### users表（用户表）
- user_id (主键)
- username (用户名)
- email (邮箱)
- password_hash (密码哈希)
- role (角色: admin/member)
- account_status (账户状态)
- last_active (最后活跃时间)
- last_login (最后登录时间)

### members表（会员表）
- member_id (主键)
- user_id (外键，关联users表)
- full_name (全名)
- phone (电话)
- gender (性别)
- address (地址)
- birth_date (生日)
- membership_level (会员等级)
- membership_status (会员状态)
- profile_updated_at (资料更新时间)

### messages表（消息表）
- message_id (主键)
- sender_id (发送者ID)
- receiver_id (接收者ID)
- subject (主题)
- content (内容)
- message_type (消息类型)
- status (状态)
- created_at (创建时间)

## 功能特性

### 已实现功能
- ✅ 用户注册和登录
- ✅ 会员资料管理
- ✅ 管理员控制台
- ✅ 会员信息管理
- ✅ 消息系统
- ✅ 权限控制
- ✅ 响应式设计

### 部署优势
- 🌐 **一键访问**: 通过Vercel提供的域名直接访问
- ⚡ **快速加载**: 静态资源CDN加速
- 🔒 **安全可靠**: Supabase提供企业级安全
- 🔄 **自动部署**: GitHub Actions自动化流程
- 📱 **移动友好**: 响应式设计支持多设备

## 本地开发

### 前端开发
```bash
cd frontend
npm install
npm run dev
```

访问: http://localhost:5173

### 环境变量配置
复制 `frontend/.env.example` 为 `frontend/.env` 并配置相应值。

## 故障排除

### 常见问题

1. **部署失败**
   - 检查GitHub Actions日志
   - 验证环境变量配置
   - 确认Supabase项目状态

2. **登录问题**
   - 确认Supabase Auth配置
   - 检查用户表数据
   - 验证RLS策略

3. **数据不显示**
   - 检查API调用权限
   - 验证数据库连接
   - 查看浏览器控制台错误

## 联系方式

如有部署问题，请联系系统管理员或查看项目文档。

---

**部署状态**: ✅ 可部署  
**最后更新**: 2025-12-14  
**版本**: v1.0.0