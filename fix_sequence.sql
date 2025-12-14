-- 修复users表序列的SQL脚本
-- 需要在Supabase的SQL编辑器中执行

-- 1. 首先检查当前序列的值
SELECT currval('users_user_id_seq');

-- 2. 重置序列到当前最大user_id + 1
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users) + 1);

-- 3. 验证序列已正确设置
SELECT currval('users_user_id_seq');