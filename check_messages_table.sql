-- 检查messages表的结构
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'messages' 
ORDER BY ordinal_position;