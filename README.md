# EV POWER GUARD 프론트엔드

![](https://git.hrd.cloudzcp.net/attachments/bbc0f57c-e967-49eb-a3ea-87d325587b69)

# 폴더 구조

![](https://git.hrd.cloudzcp.net/attachments/f4c81225-995c-4eb9-89f4-dd6a8d7c82ef)

1. `contents.js` : 화면 중앙에 바뀌는 주요 도메인(계속 바뀌는 화면)
   contents내부 Route를 통해서 해당 화면으로 컴포넌트 교체(화면 전환)
2. `main.js` : Top/Side/Content 구분하여 구조화(따로 수정x)
3. `side.js` : 좌측 사이드메뉴창
4. `top.js` : 상단 메뉴창(고정)
5. `pages폴더` : 각 서비스별로 개인 FE폴더 생성
6. `style.js` : 디자인 설정

# 프로젝트 시작하기

- `git clone {https 주소}` : git주소에서 EV POWER GUARD 소스 가져오기
- `cd EVPOWERGUARD-FE` : 터미널에서 해당 폴더로 이동
- `npm install` : react환경 구성을 위한 npm 설치
- `npm start` : react 웹 시작

# 라이브러리

- `npm install react-redux` : redux상태관리 설치
- `npm install react-google-login --force` : google login react버전 안맞아서 강제 설치
- `yarn add @mui/x-date-pickers` : date picker 설치

# 주의 사항

- `SNS 로그인 인증` : localhost:3000, localhost:3001만 인증가능.
- `` :

# 오류 해결

1. `Type annotations can only be used in TypeScript files.(any 형식 주석은 TypeScript 파일에서만 사용할 수 있습니다)`

   vs code -> F1 -> setting.json검색 -> preferences: Open Settings(JSON) 선택 -> "javascript.validate.enable" : false 추가

2. `Module React-Google-Login not found.`

   npm install gapi-script react-google-login --save --legacy-peer-deps

3. `only one instance of babel-polyfill is allowed 오류`

```
Browser에서 직접 사용하는 standalone 방식의 경우, Windows객체에 기능을 추가하기 때문에 딱 한번 적용해줘야함 (전역 객체의 오염?)
 Web app에 babel-polyfill을 사용하고 있다면 제거해야 하고, 아니면 다른 라이브러리에서 사용하고있는지 확인해야함.

 naveridlogin sdk를 nopolyfill sdfk로 변경함.
  "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";->   'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js';
```

# YOON님 작성

패키지 구조

[components] 폴더는 공통으로 사용할 수 있는 component 정의

[frame] 폴더는 공통 layout 정의

       1) top.js

       2) slide.js

       3) main.js

       4) content.js

[pages] 폴더 아래 각자 화면 폴더 추가해서 사용하면 됩니다.

      ex) pages/reviews/*.js

package.json 에 dependency 정의 및 script 정의 해두었습니다. 필요 시 추가하면 됩니다

```
"dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.6.2",
    "@mui/material": "^5.6.4",
    "@mui/x-data-grid": "^5.10.0",
    "@mui/x-data-grid-generator": "^5.10.0",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.27.2",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

api.js 에 백엔드 호출 시 필요한 api 를 정의했는데 method 는 GET, POST, PUT, DELETE 만 있습니다. 추가 필요 시 추가하시면 됩니다

2. Component Library

React Components - Material UI 라는 library를 import 하고 있습니다. component 추가나 함수 필요할 경우 해당 페이지 참조해서 활용하시면 됩니다.

      ex) import { List } from '@mui/material'; //list component

3. 화면 개발 순서

최초 진입 시 index.js 가 실행

import 된 ./frame/main.js

main.js 는 top.js, side,js, content.js를 import 하고 있음

side.js 에 각자 메뉴 추가 및 content.js 에 router 추가 필요

[side.js]

```

  /* 메뉴 추가 */
  const itemList = [
    {
      icon: RateReviewIcon,
      url: '/review',
      name: 'Review',
      handleClick: handleListItemClick,
    },
    {
      icon: EditLocationAltIcon,
      url: '/mystations',
      name: 'MyStation',
      handleClick: handleListItemClick,
    },
  ];
```

[content.js]

```
import { Review } from '../pages/review';

function Content() {
  return (
    <div className="App">
      <Routes>
        <Route path="/review" element={<Review />}></Route>
      </Routes>
    </div>
  );
}
export default Content;

```

5. router 통해 /pages/review 찾아가고, /pages/review/index.js → review.js 실행

6. api 호출 방법

[review.js]

```
  /**
   * 전체 리뷰 리스트를 서버로 부터 받아 온다.
   */
  const getReviewList = async () => {
    const res = await api.get('/review');
    if (res.status === 200 || res.status === 302) {
      setReviewList(res.data);
    }
    return res;
  };
```

---

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
