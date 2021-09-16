## 文字列ベースのルーティングの課題
### Parameterが型安全でない
useParamsを騙し放題

``` page.tsx
const UserPage = () => {
  const params = userParams<{ userId: string }>;

  return (
    <p>{ params.user }</p>
  )
}
```

しかしこれを方安全にするのは困難。
なぜならUserPageは独立したコンポーネントであり、その外側の
`<Route path="/user/:userId" />`
の情報を得ることができない。

### ナビゲーションの危険性
存在しないパスを指定しても型エラーが置きない



# インターフェイスどんな感じにしたい
## Pattern1: react-typesafe-routes 風
ref: https://github.com/innFactory/react-typesafe-routes
``` samp.tsx 
const routes = TypeRoutes(route => ({
  home: route('/', { component: HomePage }),
  users: route('/users', route => ({
    list: route('/', { component: UserListPage }),
    get: route('/:id', { component: UserGetPage }),
  }))
}));

// あるいは
const routes = TypeRoutes(route => {
  users: nest('/users', route => ({
    list: route('/', () => <UserListPage />),
    get: route('/:id', ({ id }) => <UserGetPage id={id} />)
  }))
});

<Router routes={routes} />

<Link to={routes.users.get({ id: "1" })}>;
```
### メリット
- 欲しい形安全性が一通りてにはいりそう

### デメリット
- wouterと比べてカスタマイズ性に欠ける

## Pattern2: wouter 風
``` samp.tsx
<Switch>
  <Route path="/:id">
    {( userId ) => {
      <UserPage id={userId}>
    }}
  </Route>
</Switch>
```

### メリット
シンプルでカスタマイズ性が非常に高い

### デメリット
navigationの方安全性がない


## 結論
Pattern1が良さそう
