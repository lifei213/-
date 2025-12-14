const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tdbbstlkwmautdwnrgcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYmJzdGxrd21hdXRkd25yZ2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTQzNjgsImV4cCI6MjA4MTIzMDM2OH0.DcOLXDcoS3l_SRjwacyeMh_SgVs6s1m9eXDcliAuUJU';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  console.log('检查messages表结构...');
  
  // 获取表结构信息
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('查询表结构失败:', error);
    return;
  }
  
  if (data && data.length > 0) {
    console.log('messages表字段:', Object.keys(data[0]));
  } else {
    console.log('messages表为空');
  }
}

checkTableStructure();