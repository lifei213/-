-- 检查members表结构的SQL语句
-- 在Supabase SQL编辑器中执行这些语句

-- 1. 查看表结构
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;

-- 2. 查看表的前几行数据（如果有的话）
SELECT * FROM members LIMIT 5;

-- 3. 检查users表结构（用于关联）
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;