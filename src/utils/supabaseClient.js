import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 리더보드 데이터 가져오기
export const getLeaderboard = async (limit = 10) => {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data;
};

// 점수 저장하기
export const saveScore = async (playerName, score) => {
  const { data, error } = await supabase
    .from('leaderboard')
    .insert([
      {
        player_name: playerName,
        score: score,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error('Error saving score:', error);
    throw error;
  }

  return data;
};
