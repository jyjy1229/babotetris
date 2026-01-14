# 테트리스 게임

React로 제작된 웹 테트리스 게임입니다. 데스크톱과 모바일 모두에서 플레이할 수 있습니다.

## 기능

- 7가지 테트로미노 블록
- 블록 회전 및 이동
- 줄 제거 및 점수 계산
- 레벨 시스템
- 키보드 및 터치 컨트롤 지원
- 반응형 디자인
- **커스텀 블록 이미지 지원** 🎨
- **온라인 랭킹 시스템** 🏆
- 게임오버 시 점수 등록
- 리더보드 페이지

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 설정 (랭킹 시스템 사용 시)

#### 2.1 Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성하세요
2. 프로젝트 설정에서 **API URL**과 **anon public key**를 확인하세요

#### 2.2 데이터베이스 테이블 생성

Supabase SQL Editor에서 다음 쿼리를 실행하세요:

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

#### 2.3 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**주의**: `.env` 파일은 Git에 커밋되지 않습니다. 실제 값을 입력해야 합니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 자동으로 http://localhost:5173 이 열립니다.

### 4. 빌드

```bash
npm run build
```

## 조작법

### 키보드 (데스크톱)

- **← →** : 좌우 이동
- **↑** : 블록 회전
- **↓** : 빠른 낙하
- **Space** : 즉시 낙하 (하드 드롭)
- **P** : 일시정지/재개

### 터치 컨트롤 (모바일)

화면 하단의 버튼을 사용하여 게임을 조작할 수 있습니다.

- 버튼을 길게 누르면 연속 입력됩니다 (이동 및 하강 버튼)
- 회전 및 즉시 낙하는 한 번만 실행됩니다

## 점수 시스템

- 1줄 제거: 100점
- 2줄 제거: 300점
- 3줄 제거: 500점
- 4줄 제거: 800점

레벨은 10줄을 제거할 때마다 올라가며, 레벨이 올라갈수록 블록이 빠르게 떨어집니다.

## 기술 스택

- React 18
- Vite
- React Router DOM 6
- Supabase (Backend & Database)
- CSS3

## 커스텀 블록 이미지 추가 🎨

각 테트로미노 블록에 원하는 이미지를 적용할 수 있습니다!

### 이미지 추가 방법

1. `public/images/blocks/` 폴더에 7개의 이미지를 추가하세요:
   - `I.png` - I 블록용
   - `O.png` - O 블록용
   - `T.png` - T 블록용
   - `S.png` - S 블록용
   - `Z.png` - Z 블록용
   - `J.png` - J 블록용
   - `L.png` - L 블록용

### 이미지 규격 (간단!)

- **✅ 투명 배경 불필요!** 일반 네모 이미지 OK!
- **✅ 정사각형 이미지** (1:1 비율) 권장
- **✅ 권장 크기**: 100px × 100px 이상
- **✅ 모든 형식 지원**: PNG, JPG, WEBP 등

### 작동 방식

각 블록 타입의 모든 셀에 같은 이미지가 타일처럼 반복됩니다.

예시: T 블록에 고양이 이미지를 넣으면

```
   [🐱]
[🐱][🐱][🐱]
```

이런 식으로 각 셀마다 고양이가 표시됩니다!

### 이미지 준비 팁

- 좋아하는 **캐릭터, 패턴, 텍스처, 사진** 등 자유롭게 사용
- **네모난 일반 이미지** 그대로 사용 가능
- 파일명 정확히 지키기 (대소문자 구분)
- 이미지 없으면 자동으로 기본 색상 블록으로 표시

자세한 내용은 `public/images/blocks/README.txt` 파일을 참고하세요.

## 브라우저 호환성

모던 브라우저 (Chrome, Firefox, Safari, Edge)에서 동작합니다.
