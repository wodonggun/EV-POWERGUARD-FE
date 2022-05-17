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

# 오류 해결

1. `Type annotations can only be used in TypeScript files.(any 형식 주석은 TypeScript 파일에서만 사용할 수 있습니다)`


    vs code -> F1 -> setting.json검색 -> preferences: Open Settings(JSON) 선택 -> "javascript.validate.enable" : false 추가


2. `Module React-Google-Login not found.`


    npm install gapi-script react-google-login --save --legacy-peer-deps



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
