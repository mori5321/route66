

# Exposed
## Component: Route66.Router
### 責務
- routesを受け取り、保持する
- history.listenして現在のルーティング情報を持つ
- 現在のルーティング情報をcontextに渡す

``` samp.ts
<Route66.Router routes={routes}>
  ....
</Route66.Router>
```

## Component: Route66.Route
### 責務
- Routingにマッチしているかどうかを判断し、matchした場合そのchildrenやcomponentに渡されたものをrenderする

``` samp.ts
<Route path={routes.users.getUser({ id: 1 })} />
  {({ id }) => {
    <GetUserPage id={id} />
  }}
</Route>

<Route path={routes.home} component={HomePage} />
```

## Function: Route66.createRoutes
### 責務
- ユーザーが定義するroutesオブジェクト

``` samp.ts
const routes = createRoutes({ route, nest } => {
  return {
    home: route("/home"),
    users: nest("/users", ({ route, nest }) => {
      list: route("/"),
      get: route("/:id")
    }),
  }
})


## Usage
routes.home()
// => /home

routes.users().get({ id: 1 })
// => /users/1

{
  users: () => {
    const nested = "/users"

    get: ({ id: string }): string => {
      nested + "/" + id
    }
  }
}

## Inner Function (route, nest)
route("/home")
// () => "/home"

nest("users", ({ route, nest }) => {
  list: route("/"),
  get: route("/:id")
})
// () => {
  list: () => "/users",
  get: ({ id: string }) => `/users/${id}`
}
// ※nestは再帰的な構造をとれなければいけない
// ※ObjectではなくClassで返したほうがパフォーマンスは良さそう。だが実現は難しそうな気がする。

```


## 要検討ポイント
routes と Componentを分離する設計。
これは果たして正しいのか。

メリット: ユーザー側の柔軟性は高そう
デメリット:
  - middlewareとか挟む余地はない
    => そもそもReactにmiddlewareって概念必要じゃなくない?
  - ユーザー側のRouting定義がやや冗長になる。

routeやnestはできればpathではなくて、専用のRouteObjectを返す形にしたい。
そうすれば <Route path={path}> <Link to={path} /> に文字列を渡すことを不許可にできる。
これができればナビゲーションの型安全性を担保できたと言ってよい。
