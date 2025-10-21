<img width="247" height="81" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/93057916/503364858-a67411cd-e23a-437e-af78-37e756e7eada.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251020%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251020T195739Z&X-Amz-Expires=300&X-Amz-Signature=166892405eefcf77b50cca7e03bdc5d92619115d245cb4145bdd8c41ee36e710&X-Amz-SignedHeaders=host" />
<br><br><br><br>

# 1:1 매칭 플랫폼 THE JULGE

- 배포 URL : https://thejulge-mauve.vercel.app/
- Test ID : 사장 a@a.com / 알바 user@email.com
- Test Pw : 사장 1 / 알바 admin@123
  <br><br>

## 프로젝트 소개

- 급하게 일손이 필요한 사장님과 하루만 일하고 싶은 알바를 연결해주는 플랫폼으로, 고정적인 알바가 필요하지 않은 사장님, 갑자기 생긴 결원의 보충을 원하는 사장님은 기존의 시급보다 '더' 주지만 그만큼 일자리를 찾는 알바에게는 매력적인 제안으로 연결될 수 있는 1:1 매칭 플랫폼입니다.  
  <br>

## 프로젝트 선정 이유

- 매력적인 기획안과 팀원들의 선호와 아이디어를 이용해 커스텀하여 제작할 수 있을 것 같다는 점이 좋았습니다.  
  <br>

## 프로젝트 구현 내용

|                알바                 |                사장                 |
| :---------------------------------: | :---------------------------------: |
| 하나의 프로필로 모든 공고 지원 가능 |     지원 내역 승인시 바로 확정      |
|    실실간 알일므올 지원결과 확인    | 급하다면 높은 급여로 공고 강조 가능 |

<br>

## 팀원 구성

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/8ea756ce-cb72-4e2b-ba31-8d314ed0ad57" />


<br><br>

## 1.개발환경

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/9fdde1e8-fd2b-4f82-9208-e14f98df0bec" />
<br><br>

## 2. 도입 기술

<details> 
<summary>상인</summary> 
  <p> 
    - tanstack query : 기존 상태 관리 라이브러리와는 다르게, tanstack query는 서버 상태를 관리하는데에 있어서 최적화 되어있다고 생각합니다. tanstack query를 도입하여 서버에서 오는 데이터를 캐싱, 리패칭과 같은 기능으로 효율적으로 관리할 수 있을 것 같았습니다. 또, Next.js의 SSR과도 잘 연동돼서 SEO 측면에서도 유리했고, 팀 내에서도 쿼리와 뮤테이션 훅을 기준으로 API 로직을 일관되게 관리할 수 있게 만들면 가독성과 유지보수성을 높일 수 있을 것 같았습니다.
  </p>
  <p> 
    - tanstack query : 기존 상태 관리 라이브러리와는 다르게, tanstack query는 서버 상태를 관리하는데에 있어서 최적화 되어있다고 생각합니다. tanstack query를 도입하여 서버에서 오는 데이터를 캐싱, 리패칭과 같은 기능으로 효율적으로 관리할 수 있을 것 같았습니다. 또, Next.js의 SSR과도 잘 연동돼서 SEO 측면에서도 유리했고, 팀 내에서도 쿼리와 뮤테이션 훅을 기준으로 API 로직을 일관되게 관리할 수 있게 만들면 가독성과 유지보수성을 높일 수 있을 것 같았습니다.
  </p>
  <p> 
    - framer-motion : 랜딩페이지의 애니메이션을 사용하기 위해서 도입했습니다. 다른 애니메이션 라이브러리인 DOM을 직접 조작하는 GSAP과 비교하여 framer-motion은 컴포넌트의 상태 변화에 맞춰, React에 특화되어 있고, 컴포넌트 형태로 간단하고 쉽게 사용할 수 있기에, NextJs 개발을 하는 이번 프로젝트에 적합하다고 생각하여 도입하게 되었습니다.
  </p>
  <p> 
    - axios: 인증과 관련된 api 요청들이 있었기 때문에 매번 토큰을 보내는 것보다 axios의 interceptor를 활용하면 좋을 것 같아서 도입했습니다.
  </p>
  <p> 
    - react-countup : 랜딩 페이지에서 전체 공고 개수를 보여주는데, 이 부분만 데이터를 받아와서 보여주다 보니 늦게 렌더링 되는 현상이 발생했다. 이를 해결하기 위해서 스피너를 사용할까 하다가, “개수” 라는 초점에 맞춰서 0부터 전체 데이터 개수까지 카운터가 되는 애니메이션을 추가하고 싶어서 도입했다.
  </p>
</details>
<details> 
<summary>장희</summary> 
  <p>
  - svgr 라이브러리: SVG 파일을 리액트 컴포넌트로 만들어주고, 성능 최적화를 이유로 도입했습니다.
  이 라이브러리는 SVG파일을 리액트 컴포넌트처럼 import해서 사용할 수 있게 해주어서 재사용성이 극대화 됩니다. Props로 스타일링을 전달하여 동적 스타일링도 가능하고 img 태그에서는 하기 어려운 색상도 동적 제어가 가능합니다. 또한 성능 최적화를 해주는데, SVGO(SVG Optimizer)를 사용하여 SVG안에 있는 불필요한 데이터를 제거하여 파일 용량을 줄여줍니다. 더 중요한 부분은 각 파일을 서버로 HTTP 요청하여 받아오는 img 태그와 달리 SVGR을 사용하면 빌드시점에 SVG파일이 리액트 컴포넌트로 변환이 되어서, 다른 컴포넌트들과 함께 번들 파일로 합쳐집니다. 따라서 아이콘을 몇 개를 사용하든지 간에 추가 HTTP 요청이 없어 페이지 로딩 속도가 빠릅니다. 다만 번들 파일의 크기가 커지는 트레이드오프가 있습니다.
  </p>
  <p> 
  - react-intersection-observer 라이브러리: 무한스크롤을 간편하게 구현하기 위해서 적용했습니다. 해당 라이브러리는 브라우저의 기본 기능인 IntersectionObserver API를 리액트 훅 형태로 제공해주어서 손쉽게 사용할 수 있습니다. useInView 훅의 반환 값인 ref와 inView를 이용하여 사용가능합니다.
  </p>
  <p> 
  - qs 라이브러리: 필터에서 배열 파라미터인 여러 개의 주소를 API 요청할 때, axios의 기본 직렬화 방식으로는 API와 호환이 되지 않아서 사용했습니다. axios는 배열 파라미터를 직렬화할 때 brackets 방식을 사용하여 "address[]=서울시 강남구&address[]=서울시 서초구"처럼 쿼리 스트링을 만듭니다. 하지만 더 줄게 API는 repeat 방식, "address=서울시 강남구&address=서울시 서초구"처럼 같은 키를 반복하는 형식을 요구합니다.
  </p>
</details>
<details> 
<summary>민영</summary> 
  <p>
  - autoprefixer: 브라우저마다 CSS 스타일 호환성을 자동으로 맞추기 위해 사용했습니다. autoprefixer는 postcss 환경에서 최신 브라우저 정보를 기반으로 필요한 프리픽스를 자동으로 추가해주기 때문에, 스타일 코드의 유지보수성을 높이고 개발 효율을 개선할 수 있다고 생각했습니다.
  </p>
  <p> 
  - dayjs: 날짜 계산, 포맷 변환 등의 로직을 간결하게 처리하기 위해 사용했습니다.
    자바스크립트의 기본 Date 객체의 사용법이 직관적이지 않고, 시간 계산이나 포맷 변환 등이 번거롭다고 생각해 가볍고 사용이 간단한 day.js 라이브러리를 도입했습니다.
  </p>
</details>
<details> 
<summary> 현화</summary> 
  <p>
  - tailwindcss-preset-px-to-rem : tailwind css 커스텀 적용시 rem과 px 단위의 혼재를 피하고, 일관성 있되, rem의 장점을 편하게 사용할 수 있도록하는 라이브러리입니다. 
    커스텀시 단위를 제외하고 디자인 시안에서 사용한 px를 그대로 사용하면 자동으로 rem 으로 변환해줍니다.
  </p>
  <p> 
  - React-js-pagination : 페이지네이션의 기능을 간편하게 사용할 수 있는 라이브러입니다.
  </p> 
  <p> 
  - prettier-plugin-tailwindcss : 저장시 클래스를 기준된 중요도에 따라 정렬해주어, css 순서를 자유롭게 작성하더라도 가독성을 높여줍니다.
  </p>
</details>

<br><br>

## 3.프로젝트 구조

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/ad9f0b45-006d-432b-8d6b-790fda54d561" />
<br><br>

## 4.역할 분담

|      오세진      |     정상인      |      김현화      |      권민영       |    한장희    |
| :--------------: | :-------------: | :--------------: | :---------------: | :----------: | 
|     팀 리딩      |    Link 설정    |      Table       |      Hearder      |    Fiter     |
|    초기 설정     |      Post       |      Toast       |      Footer       |    Modal     |
|      Input       |    Textarea     |      Badge       |    알림 Modal     | 가게정보상세 |
|      Button      | 내 프로필 상세  |    Pagination    |  공고 등록/편집   | 공고 리스트  |
|    SelectBox     | 내 프로필 등록  |  ShopInfo Card   |   가게정보 등록   |   상세필터   |
|      로그인      |    API 연동     | 공고 상세 (사장) |   가게등록 편집   |  SVRG 설정   |
|     회원가입     |    검색구현     |  User Flow 작성  |    Readme 작성    |  404 페이지  | GitHub Wiki 작성 |
| 공고 상세 (알바) |    코드 리뷰    |                  | 컬러셋, 폰트 설정 |              |
|   노션 문서화    | 라이브러리 정리 |                  |    Layout 설정    |              |
|    코드 리뷰     |    노션 정리    |                  |                   |              |

<br><br>

## 5.개발 기간

![alt text](image-5.png)

### 개발기간

- 전체 개발 기간 : 2025.9.29 ~ 2025.10 21 (10.3~10/9 연휴기간)
- 공통 컴포넌트 개발 : 2025.9.29 ~ 2025.10.05 (2025.10.04 1차 점검)
- 페이지 개발 : 2025.10.06 ~ 2025.10.16 (2025.10.11 2차 점검)
- 추가 기능 개발 : 2025.10.15 ~ 2025.10.21
- 발표 세션 : 2025.10.21

<br><br>

## 6.작업과 브랜치 전략

### 작업관리

- 컨벤션과 가이드를 만들어 공유

  <img width="293" height="342" alt="Image" src="https://github.com/user-attachments/assets/176a7ada-982b-4c7b-a49a-5cfc67060a70" />
    <details> 
      <summary>그라운드 룰</summary> 
      <ol>
        <li>디스코드, 스레드에 올라오면 확인(체크) 표시하기</li>
        <li>본인이 작업하는거 최신화하기
          <ul>
            <li>칸반보드 팀미팅 전까지 업데이트</li>
            <li>데일리 스크럼 팀미팅 전까지 업데이트</li>
          </ul>
        </li>
        <li> PR 올라오면 24시간내로 확인하기 (안되면 얘기하기)</li>
        <li>PR 올라오면(스레드에 올라옴) 이모티콘으로 👀(보는중), 📝(리뷰 작성중) 표시하기</li>
        <li>4시간동안 해결 안되면 공유하기 (공유하면서 같이 해결을 바라는지, 조금 시간이 걸릴것 같다고 얘기하기)</li>
        <li>피그마, 노션 등 qna 적고나서, 빨리 확인을 원하는게 있다면 카톡이나 디스코드에 남기기</li>
        <li>새로운 라이브러리 설치가 되면, npm install 하기</li>
      </ol>
    </details> 
    <details>
    <summary>네이밍 컨벤션</summary>
       <img width="600" alt="Image" src="https://github.com/user-attachments/assets/74f9c19b-bd83-42c7-b636-7dfcc767a1c7" />
    </details>
  <br>

- zap에 모여서 코어타임 진행
- Notion, Figma 활용
- Github Issue 활용 : PR과 Issue 연결 Project 칸반보드 활용

  <img width="600" alt="Image" src="https://github.com/user-attachments/assets/fd09c517-2e72-4b4c-a10e-c7292114676e" />

- 폴더 관리

  <img alt="Image" src="https://github.com/user-attachments/assets/136e9438-8e14-4dc8-a244-9685e84e636c" />


### 브랜치 전략

- Git-flow 전략을 기반으로 main, dev 브랜치와 각 컴포넌트별 feat 브랜치를 운영하였습니다.
  - <b>main</b> 브랜치는 배포 단계에서 사용하는 브랜치입니다.
  - <b>dev</b> 브핸치는 개발 단계에서 master 역할을 하는 브랜치입니다.
  - <b>feat</b> 브랜치는 컴포넌트 및 기능 단위로 개발 환경에서 사용하였고 dev 로 PR 후 merge 후 삭제 하였습니다.

<br><br>

## 7.개발 이슈

- 사장님과 알바님이 같이 접근할 수 있는 Flow를 만들다 보니 생긴 개발 이슈는 getServerSideProps의 context prop을 사용할 때 쿠키에는 접근이 가능하지만, 브라우저의 저장소나 자바스크립트 코드에는 접근할 수 없는 것이었고,
  진행하는 프로젝트에서는 SSR 시에 getServerSideProps 가 접근해야하는 값들이 필요하기 때문에 쿠키에 넣어야한다는 것이 었습니다.

- 이슈를 해결해 나간 팀원의 기록입니다.

1. 현재 API 명세에 따르면 GET 요청은 모두 인증 token을 사용하지 않는다.
2. 토큰이 필요한 요청들은 POST, PUT, PATCH 요청이고, 이들은 SSR 페이지여도, getServerSideProps를 사용하지 않는다. (GET에서 사용을 하니까 성공 후 refetch시키기)
   - 지금 상황에서는 SSR 상황시 토큰을 필요로 하지 않기 때문에 토큰은 굳이 쿠키에 저장하지 않더라도 된다.
   - id 값들은 접근이 필요하니까 쿠키에 넣어야 한다.

   ### 이슈

   쿠키에 저장하기 위해서 sameSite 이슈가 있을 수 있기 때문에 (만약 이슈가 없더라도, 로컬호스트에서 되는 것이고, 배포 후에 에러가 날 수 있다.) 프록시 서버를 이용하는 것을 추천.

   ### 결론

   방법 1
   - 토큰: localStorage 저장
   - id값: 쿠키에 저장

   방법 2
   - 모두 쿠키에 저장 <br>
     주강사님은 방법2를 추천했다. <br>
     localStorage 저장을 하면 결국 인증이 필요한 SSR 개발을 할 때 제약이 걸릴 수 있다. <br>
     그래서 모두 쿠키에 저장하고 저장하는 과정에서 프록시 서버를 이용하는 방법을 권장하셨다.

<br><br>

## 8.USER FLOW

<img alt="Image" src="https://github.com/user-attachments/assets/57a6cf4d-22df-4389-a6fa-e4af92138a67" />

<br><br>

## 9.페이지별 기능

### 회원가입

- 알바님과 사장님을 구분하여 로그인/ 회원가입 및 로그인을 하여야 서비스 이용이 가능합니다.

  <img alt="Image" src="https://github.com/user-attachments/assets/3c60ed73-84c6-462c-9554-6e1cc8060845" />

<br>

### 사장님 알바님 공통

- 랜딩페이지: 제공된 시안에는 없던 내용으로 팀작업 시 추가된 페이지 입니다.

  ![Image](https://github.com/user-attachments/assets/3a6a814a-6bd0-4d7e-9239-932637f4127b)

<br>

### 알바님으로 로그인 후

- 프로필 등록에 따른 맞춤 공고를 확인 할 수 있으며, 상세 필터로 원하는 조건의 알바를 검색하여 볼 수 있습니다.

  ![Image](https://github.com/user-attachments/assets/6b05471c-2178-4e40-a810-192847d33c27)

  <img width="600" alt="Image" src="https://github.com/user-attachments/assets/87f53db8-dd55-462f-8bbe-5570657c5fac" />  
  <br><br>

- 내 프로필이 등록 되어 있으면 현재 지원한 공고에 대한 결과를 확인 하고, 선택하여 지원을 취소 할 수 있습니다.  
   또한 어느 페이지에서든 알림을 통하여 지원에 대한 승인/거부/취소 내역을 확인 할 수 있습니다.  
   ![Image](https://github.com/user-attachments/assets/90199007-c049-4454-a17b-40eb3c6145e5)  
  <br><br>
- 내 프로필을 편집하여 선호 지역을 변경 하여 맞춤 정보로 활용할 수 있습니다.

  <img width="600" alt="Image" src="https://github.com/user-attachments/assets/9afaf7ef-0380-451a-b93b-f855a05a41e2" />

<br>

### 사장님으로 로그인 후

- 사장님으로 로그인시에는 맞춤공고 제공이 되지 않습니다.

  <img width="600" width="600" alt="Image" src="https://github.com/user-attachments/assets/08314f57-62fa-46f0-b99f-37955eb81ff9" />

<br><br>

- 사장님으로 로그인시에는 공고 지원을 제공하지 않습니다

  <img width="600" width="600" alt="Image" src="https://github.com/user-attachments/assets/6e0becc6-735a-41a1-8df7-1d8bb02259b8" />

<br><br>

- 사장님은 1개의 가게를 "내 가게" 메뉴를 통해 등록할 수 있습니다.

  ![Image](https://github.com/user-attachments/assets/80cc7846-1d57-47fc-aaa8-f927ec9d73b5)

<br><br>

- 가게가 등록 되면 공고를 등록하거나 가게 정보를 편집할 수 있고, 해당 공고에 지원한 지원자를 확인하고 승인 또는 거절 할 수 있습니다.<br>
  1명의 지원자를 수락하면 공고는 자동으로 마감되고, 다른 지원자들에게도 마감으로 표시 됩니다.

  ![Image](https://github.com/user-attachments/assets/8d043336-d595-4400-aacb-88a9e9dcfefb)

<br><br>

## 10.Trouble Shooting

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/7fdde88b-5fe6-4150-a393-d4eabe914a27" />
