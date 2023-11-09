This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)..

To learn React, check out the [React documentation](https://reactjs.org/).

1. **react-icons** 아이콘 천국
   여러가지 FRONT-END ICON을 모아둔 사이트[react-icons](https://react-icons.github.io/react-icons/)

   - 설치방법: npm install react-icons --save

2. **theme**

다크 모드, 라이트 모드를 설정하는 chakra UI..

3. **Fetch** django-cors-headers

django 에서 외부 데이터를 fetch하도록 도와주는 패키지

4. **HStack, VStack, Skeleton**

Horizontal, Vertical 속성을 제공하여, flow-direction: column, row 등의 설정을 안해도 되도록 도와준다.
Skeleton은 로딩 속성을 제공함

5. **Authentication**

5-1. Django, 페이지를 방문할 때마다 Browser는 django에게 session id를 자동으로 전송한다. 어떤 cookie를 어떤 사이트에 전송할 지 알 수 있는 방법은 cookie를 만든 사이트의 domain에 달려있다. 이러한 이유로 Django 백엔드가 google.com 도메인이 생선한 cookie를 받지 않는 것이다.

브라우저 Website에 가서 Domain을 보고, 해당 Domain이 만든 cookie만 전송하는 역할을 한다.
\*TIP: Javascript에 의해 만들어진 요청은 Cookie를 자동으로 전송하지 않는다.
Backend부분으로 가서 config > settings.py 에서 "CORS_ALLOW_CREDENTIALS = True"를 추가해줘야 한다.
\*Browser는 Browser를 통한 페이지 이동시 자동으로 서버에 Cookie를 전송하지만, Javascript를 이용할 경우 Cookie는 자동으로 서버에 전송되지 않는다. api > axios에게 credential를 보내라고 수동을 입력해줘야 정상적으로 작동한다. -하기 참고-

```javascript
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});
```

이에 대응할 수 있도록 Backend에서도 아래와 같이 config > settings.py 에 코드를 추가해줘야 한다.
이로써 domain으로부터 fetch를 하고 credentail를 받을 수 있게 된다.

```python
CORS_ALLOWED_ORIGINS = ["http://127.0.0.1:3000"]

CORS_ALLOW_CREDENTIALS = True
```

6. **CSRF (Cross Site Request Forgery )**
   웹 어플리케이션 취약점 중 하나로 인터넷사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위를 특정 웹사이트에 요청하게 만드는 공격이다.
   대표적인 방어법 2가지
1. Referrer 검증
   Backend 단에서 request의 referrer를 확인하여 domain이 일치하는지 검증하는 방법으로 이것만으로도 대부분의 CSRF공격을 방어할 수 있지만 페이지에 XSS 취약점이 있는 경우 CSRF공격에 취약할 수 있다.
1. Security Token 사용

1. **OAuth**

   1. Github 사용자 인증에 User가 redirect된다.
   2. User는 다시 Github로부터 개발자 페이지로 redirect된다.
   3. access token을 가지고 API에 접근하게 된다.

1. **react-hook-from**
   login, password, form 의 기능을 쉽게 구현하도록 해주는 라이브러리로, validation 기능도 지원하며 errors 메시지를 보낼수도 있다.

   (예시)

```javascript
const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm<IForm>();
 const onSubmit = (data: IForm) => {
   console.log(data);
 };
 console.log(errors);
```
