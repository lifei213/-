-- 检查members表结构的SQL脚本
-- 需要在Supabase SQL编辑器中执行

-- 1. 查看members表的当前结构
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;

-- 2. 查看members表的约束信息
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'members'
ORDER BY tc.constraint_type, kcu.column_name;

-- 3. 添加缺失字段的SQL语句（根据实际需要选择执行）

-- 添加education_level字段
ALTER TABLE members ADD COLUMN IF NOT EXISTS education_level VARCHAR(50);

-- 添加occupation字段
ALTER TABLE members ADD COLUMN IF NOT EXISTS occupation VARCHAR(100);

-- 添加emergency_contact字段
ALTER TABLE members ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(100);

-- 添加health_info字段
ALTER TABLE members ADD COLUMN IF NOT EXISTS health_info TEXT;

-- 添加avatar字段
ALTER TABLE members ADD COLUMN IF NOT EXISTS avatar TEXT;

-- 添加profile_updated_at字段（如果不存在）
ALTER TABLE members ADD COLUMN IF NOT EXISTS profile_updated_at TIMESTAMP WITH TIME ZONE;

-- 4. 验证字段添加结果
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;