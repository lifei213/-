-- 检查Supabase messages表的实际结构
-- 在Supabase SQL编辑器中执行以下查询

-- 1. 检查messages表是否存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'messages';

-- 2. 检查messages表的字段结构
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'messages'
ORDER BY ordinal_position;

-- 3. 如果缺少recipient_id字段，需要添加该字段
ALTER TABLE messages ADD COLUMN IF NOT EXISTS recipient_id INTEGER;

-- 4. 如果messages表不存在，需要创建表
CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER,
    recipient_id INTEGER NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INTEGER,
    file_type VARCHAR(100)
);

-- 5. 创建索引
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON messages(sent_at);