# Supabase 설정 가이드

이 문서는 테트리스 게임의 온라인 랭킹 시스템을 위한 Supabase 설정 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

### 1.1 계정 생성 및 로그인

1. [https://supabase.com](https://supabase.com)에 접속합니다
2. "Start your project" 또는 "Sign Up" 버튼을 클릭합니다
3. GitHub 계정으로 로그인하거나 이메일로 가입합니다

### 1.2 새 프로젝트 생성

1. 대시보드에서 "New Project" 버튼을 클릭합니다
2. 프로젝트 정보를 입력합니다:
   - **Name**: `tetris-game` (원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (자동 생성 추천)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 사용자용)
   - **Pricing Plan**: Free 선택
3. "Create new project" 버튼을 클릭합니다
4. 프로젝트 생성이 완료될 때까지 1~2분 정도 기다립니다

## 2. 데이터베이스 테이블 생성

### 2.1 SQL Editor 열기

1. 왼쪽 사이드바에서 "SQL Editor" 메뉴를 클릭합니다
2. "+ New query" 버튼을 클릭합니다

### 2.2 테이블 생성 쿼리 실행

다음 SQL 쿼리를 복사하여 에디터에 붙여넣고 "Run" 버튼을 클릭합니다:

```sql
-- 리더보드 테이블 생성
CREATE TABLE leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 점수 내림차순 인덱스 생성 (성능 향상)
CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC);

-- 생성일자 인덱스 생성
CREATE INDEX idx_leaderboard_created_at ON leaderboard(created_at DESC);

-- RLS (Row Level Security) 활성화
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 설정
CREATE POLICY "Anyone can read leaderboard"
ON leaderboard FOR SELECT
USING (true);

-- 모든 사용자가 점수를 등록할 수 있도록 설정
CREATE POLICY "Anyone can insert scores"
ON leaderboard FOR INSERT
WITH CHECK (true);
```

### 2.3 테이블 확인

1. 왼쪽 사이드바에서 "Table Editor" 메뉴를 클릭합니다
2. `leaderboard` 테이블이 생성되었는지 확인합니다
3. 테이블 구조를 확인합니다:
   - `id`: UUID (Primary Key)
   - `player_name`: TEXT
   - `score`: INTEGER
   - `created_at`: TIMESTAMPTZ

## 3. API 키 가져오기

### 3.1 프로젝트 설정 열기

1. 왼쪽 사이드바 하단의 "Project Settings" (톱니바퀴 아이콘)를 클릭합니다
2. 왼쪽 메뉴에서 "API"를 선택합니다

### 3.2 필요한 정보 복사

다음 두 가지 정보를 복사합니다:

1. **Project URL** (API URL)

   - "Project URL" 섹션에 있습니다
   - 형식: `https://xxxxxxxxxxxxx.supabase.co`

2. **anon public key**
   - "Project API keys" 섹션의 "anon" "public" 키입니다
   - 매우 긴 문자열입니다

## 4. 환경 변수 설정

### 4.1 .env 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다:

```bash
# Windows (PowerShell)
New-Item .env -ItemType File

# Mac/Linux
touch .env
```

### 4.2 환경 변수 입력

`.env` 파일을 열고 다음 내용을 입력합니다:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**주의사항:**

- `your-project-id`를 실제 프로젝트 URL로 교체하세요
- `your-anon-key-here`를 실제 anon public key로 교체하세요
- 따옴표나 공백 없이 입력하세요

### 4.3 예시

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMzQ1NjcsImV4cCI6MTk5NjgxMDU2N30...
```

## 5. 테스트

### 5.1 개발 서버 시작

```bash
npm run dev
```

### 5.2 기능 테스트

1. 게임을 플레이하고 게임오버가 되면 이름을 입력합니다
2. "랭킹 등록" 버튼을 클릭합니다
3. 자동으로 리더보드 페이지로 이동되는지 확인합니다
4. 방금 등록한 점수가 리더보드에 표시되는지 확인합니다

### 5.3 Supabase에서 데이터 확인

1. Supabase 대시보드의 "Table Editor"로 이동합니다
2. `leaderboard` 테이블을 선택합니다
3. 등록한 데이터가 보이는지 확인합니다

## 문제 해결

### 환경 변수가 로드되지 않는 경우

1. 개발 서버를 재시작합니다 (Ctrl+C 후 `npm run dev`)
2. `.env` 파일이 프로젝트 루트에 있는지 확인합니다
3. `.env` 파일에 오타가 없는지 확인합니다 (특히 `VITE_` 접두사)

### "Failed to fetch" 오류가 발생하는 경우

1. Supabase 프로젝트 URL이 정확한지 확인합니다
2. API 키가 정확한지 확인합니다
3. 인터넷 연결 상태를 확인합니다
4. Supabase 프로젝트가 활성화되어 있는지 확인합니다

### RLS 정책 오류가 발생하는 경우

1. SQL Editor에서 정책이 올바르게 생성되었는지 확인합니다
2. Table Editor에서 "RLS enabled"가 체크되어 있는지 확인합니다
3. 정책 쿼리를 다시 실행해 봅니다

### 데이터가 저장되지 않는 경우

1. 브라우저 콘솔(F12)에서 에러 메시지를 확인합니다
2. Supabase 대시보드의 "Logs" 메뉴에서 에러를 확인합니다
3. 테이블 구조가 올바른지 확인합니다

## 보안 참고사항

- `.env` 파일은 절대 Git에 커밋하지 마세요 (`.gitignore`에 이미 추가됨)
- `anon public` 키는 클라이언트에서 사용해도 안전합니다 (RLS로 보호됨)
- 프로덕션 배포 시에는 환경 변수를 호스팅 플랫폼의 설정에서 관리하세요

## 추가 기능 아이디어

Supabase를 활용하여 다음과 같은 기능을 추가할 수 있습니다:

- 일일/주간/월간 랭킹
- 사용자 프로필 시스템
- 최고 기록 알림
- 친구 초대 및 경쟁
- 게임 통계 및 분석

자세한 내용은 [Supabase 공식 문서](https://supabase.com/docs)를 참고하세요.
