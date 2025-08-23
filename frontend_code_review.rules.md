# React 코드리뷰 가이드

> **변경하기 쉬운 코드**를 만들기 위한 실용적 가이드  
> TypeScript, React, Next.js, TanStack Query, Zustand 환경 기준

## 🎯 사용법

🎨 UX/성능 (2분) → 🏗️ 아키텍처 (5분) → 📦 컴포넌트 (10분) → 📝 코드 (전체)

각 섹션은 **🚨 Critical → ⚡ High → 💡 Medium** 순으로 우선순위가 있습니다.

---

## 📝 1. 코드 레벨 리뷰

### 🚨 Critical - 즉시 수정 필요

#### **타입 안정성**

```typescript
// ❌ Bad: any 타입 남용
const handleSubmit = (data: any) => {
  console.log(data.user.name); // 런타임 에러 위험
};

// ✅ Good: 구체적 타입 정의
interface FormData {
  user: { name: string; email: string };
}
const handleSubmit = (data: FormData) => {
  console.log(data.user.name); // 타입 안전
};
```

#### **에러 처리**

```typescript
// ❌ Bad: 에러 처리 없음
const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json(); // 에러 상황 무시
};

// ✅ Good: 적절한 에러 처리
const fetchUser = async (id: string) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  } catch (error) {
    console.error("fetchUser error:", error);
    throw error;
  }
};
```

### ⚡ High - 권장 수정

#### **명명 규칙**

```typescript
// ❌ Bad: 모호한 이름
const data = useQuery('users');
const handleClick = () => {...};
const temp = users.filter(u => u.active);

// ✅ Good: 의도가 명확한 이름
const { data: userList } = useQuery('users');
const handleDeleteUser = () => {...};
const activeUsers = users.filter(user => user.isActive);
```

#### **하드코딩 제거**

```typescript
// ❌ Bad: 매직 넘버와 하드코딩
setTimeout(() => refetch(), 3000);
if (user.status === 'premium') {...}

// ✅ Good: 상수화
const CONSTANTS = {
  DEBOUNCE_DELAY: 3000,
  USER_STATUS: {
    PREMIUM: 'premium',
    BASIC: 'basic'
  }
} as const;

setTimeout(() => refetch(), CONSTANTS.DEBOUNCE_DELAY);
if (user.status === CONSTANTS.USER_STATUS.PREMIUM) {...}
```

### 💡 Medium - 개선 권장

#### **ES6+ 문법 활용**

```typescript
// ❌ Bad: 구식 문법
var isLoggedIn = user && user.isActive ? true : false;
const userName = user ? user.name : "Anonymous";

// ✅ Good: 최신 문법
const isLoggedIn = user?.isActive ?? false;
const userName = user?.name ?? "Anonymous";
```

---

## 📦 2. 컴포넌트 구조 리뷰

### 🚨 Critical - 즉시 수정 필요

#### **단일 책임 원칙**

```typescript
// ❌ Bad: 한 컴포넌트에서 모든 것 처리
function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 데이터 페칭, 필터링, UI 렌더링 모두 여기에...
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(user => user.name.includes(searchTerm));

  return (
    <div>
      <input onChange={e => setSearchTerm(e.target.value)} />
      {loading && <div>Loading...</div>}
      {filteredUsers.map(user => (
        <div key={user.id}>{/* 복잡한 사용자 카드 UI... */}</div>
      ))}
    </div>
  );
}

// ✅ Good: 책임 분리
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}

function UserDashboard() {
  const { users, loading } = useUsers();

  return (
    <div>
      <UserSearchInput />
      <UserList users={users} loading={loading} />
    </div>
  );
}
```

#### **Props 타입 정의**

```typescript
// ❌ Bad: Props 타입 없음
function UserCard({ user, onEdit, onDelete }) {
  return <div>{user.name}</div>;
}

// ✅ Good: 명확한 Props 타입
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}
```

### ⚡ High - 권장 수정

#### **상태 관리 분리**

```typescript
// ❌ Bad: 서버 데이터를 useState로 관리
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUser().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);
}

// ✅ Good: 적절한 도구로 각각 관리
function UserProfile() {
  // 서버 상태는 TanStack Query
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // UI 상태는 useState
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 전역 상태는 Zustand
  const theme = useThemeStore((state) => state.theme);
}
```

#### **불필요한 리렌더링 방지**

```typescript
// ❌ Bad: 매번 새로운 객체/함수 생성
function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={id => updateTodo(id)} // 매번 새 함수!
          style={{ padding: '8px' }} // 매번 새 객체!
        />
      ))}
    </div>
  );
}

// ✅ Good: 적절한 메모이제이션
function TodoList({ todos }) {
  const handleUpdate = useCallback((id: string) => {
    updateTodo(id);
  }, []);

  const itemStyle = useMemo(() => ({ padding: '8px' }), []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onUpdate={handleUpdate} style={itemStyle} />
      ))}
    </div>
  );
}
```

### 💡 Medium - 개선 권장

#### **컴포넌트 크기 최적화**

```typescript
// ❌ Bad: 거대한 컴포넌트 (100줄+)
function ProductPage() {
  // 50줄의 상태와 로직...
  // 100줄의 JSX...
}

// ✅ Good: 작고 명확한 컴포넌트
function ProductPage() {
  return (
    <div>
      <ProductHeader />
      <ProductDetails />
      <ProductReviews />
      <ProductActions />
    </div>
  );
}
```

---

## 🏗️ 3. 아키텍처 리뷰

### 🚨 Critical - 즉시 수정 필요

#### **순환 참조 방지**

```typescript
// ❌ Bad: 순환 참조
// components/UserCard.tsx
import { formatUserData } from "../utils/userUtils";

// utils/userUtils.tsx
import { UserCard } from "../components/UserCard"; // 순환 참조!

// ✅ Good: 단방향 의존성
// components/UserCard.tsx
import { formatUserData } from "../utils/userUtils";

// utils/userUtils.tsx
// UserCard 관련 코드는 별도 분리 또는 다른 접근법 사용
```

#### **적절한 폴더 구조**

```
// ❌ Bad: 평면적 구조
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── UserCard.tsx
│   ├── ProductCard.tsx
│   └── ... (50개 컴포넌트)

// ✅ Good: 기능별 그룹화
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── user/
│   │   ├── UserCard.tsx
│   │   └── UserList.tsx
│   └── product/
│       ├── ProductCard.tsx
│       └── ProductList.tsx
├── hooks/
├── utils/
└── types/
```

### ⚡ High - 권장 수정

#### **의존성 주입**

```typescript
// ❌ Bad: 하드코딩된 의존성
function UserService() {
  const apiClient = new ApiClient("https://api.example.com"); // 하드코딩

  return {
    getUser: (id: string) => apiClient.get(`/users/${id}`),
  };
}

// ✅ Good: 의존성 주입
interface ApiClient {
  get(url: string): Promise<any>;
}

function createUserService(apiClient: ApiClient) {
  return {
    getUser: (id: string) => apiClient.get(`/users/${id}`),
  };
}
```

---

## 🎨 4. UX/성능 리뷰

### 🚨 Critical - 즉시 수정 필요

#### **로딩/에러 상태**

```typescript
// ❌ Bad: 상태 처리 없음
function UserList() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div>
      {data?.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// ✅ Good: 모든 상태 처리
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="사용자 목록을 불러올 수 없습니다." />;
  if (!data?.length) return <EmptyState message="등록된 사용자가 없습니다." />;

  return (
    <div>
      {data.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### ⚡ High - 권장 수정

#### **이미지 최적화**

```typescript
// ❌ Bad: 일반 img 태그
function Avatar({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-10 h-10 rounded-full" />;
}

// ✅ Good: Next.js Image 최적화
import Image from 'next/image';

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="rounded-full"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
    />
  );
}
```

#### **접근성 고려**

```typescript
// ❌ Bad: 접근성 무시
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

// ✅ Good: 접근성 적용
function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="닫기" className="modal-close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

---

## 🛠️ 자동화 가능한 항목들

다음 항목들은 도구로 자동 체크 가능하므로 ESLint/Prettier 설정 권장:

### **ESLint 추천 룰**

```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "error"
  }
}
```

### **자동화 도구 설정**

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 📝 개선 가이드 템플릿

각 문제점에 대해 다음 형식으로 제시:

````
🔍 **문제**: [구체적인 문제점]
💡 **해결**: [개선 방향]
⚠️ **이유**: [왜 바꿔야 하는지]

📖 **Before**:
```typescript
// 문제가 있는 코드
````

📖 **After**:

```typescript
// 개선된 코드
```

🎯 **학습 포인트**: [핵심 개념이나 패턴]

```

---

## 🆕 추가 제안 영역

### 최신 React 패턴
- React 18+ 기능 (Suspense, Transitions)
- 최신 Hook 활용
- Server Components 고려

### 성능 최적화
- 번들 크기 줄이기
- 이미지 최적화
- 캐싱 전략

### 개발 경험 개선
- 유용한 라이브러리 추천
- 개발 도구 설정
- 디버깅 팁


```
