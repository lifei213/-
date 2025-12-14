const { createClient } = require('@supabase/supabase-js');

// Supabase配置
const supabaseUrl = 'https://tdbbstlkwmautdwnrgcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYmJzdGxrd21hdXRkd25yZ2NiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY1NDM2OCwiZXhwIjoyMDgxMjMwMzY4fQ.-8weJDkyy-pXU05yx6kR_Eu37ydC1DkF_KhHP9HW3d0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSQL() {
  console.log('开始检查并修复Supabase messages表结构...\n');

  try {
    // 1. 检查messages表是否存在
    console.log('1. 检查messages表是否存在...');
    const { data: tableExists, error: tableError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);

    if (tableError && tableError.message.includes('does not exist')) {
      console.log('❌ messages表不存在，需要创建表');
      
      // 创建messages表
      console.log('创建messages表...');
      const createTableSQL = `
        CREATE TABLE messages (
          message_id SERIAL PRIMARY KEY,
          sender_id INTEGER NOT NULL,
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
      `;
      
      console.log('需要手动在Supabase SQL编辑器中执行以下SQL语句:');
      console.log(createTableSQL);
      
      // 创建索引
      const createIndexSQL = `
        CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
        CREATE INDEX idx_messages_is_read ON messages(is_read);
        CREATE INDEX idx_messages_sent_at ON messages(sent_at);
      `;
      console.log('\n创建索引:');
      console.log(createIndexSQL);
      
    } else if (tableError) {
      console.log('❌ 检查表存在时出错:', tableError);
    } else {
      console.log('✅ messages表存在');
      
      // 2. 检查表结构
      console.log('\n2. 检查messages表结构...');
      
      // 尝试查询一条记录来查看字段
      const { data: sampleData, error: sampleError } = await supabase
        .from('messages')
        .select('*')
        .limit(1);

      if (sampleError) {
        console.log('❌ 查询表结构时出错:', sampleError);
        
        if (sampleError.message.includes('recipient_id')) {
          console.log('⚠️  检测到缺少recipient_id字段，需要添加该字段');
          
          const addColumnSQL = `
            ALTER TABLE messages ADD COLUMN recipient_id INTEGER;
            CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
          `;
          
          console.log('需要手动在Supabase SQL编辑器中执行以下SQL语句:');
          console.log(addColumnSQL);
        }
      } else if (sampleData && sampleData.length > 0) {
        console.log('✅ messages表结构正常，字段:', Object.keys(sampleData[0]));
      } else {
        console.log('✅ messages表存在但为空');
      }
    }

  } catch (error) {
    console.error('执行过程中发生错误:', error);
  }
}

// 运行检查
executeSQL();