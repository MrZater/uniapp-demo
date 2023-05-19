export function remembPwd(isremember, loginForm) {
  if (isremember) {
    // 记住密码
    // 本地有账户缓存
    if (
      localStorage.getItem('userinfo_0413') &&
            JSON.parse(localStorage.getItem('userinfo_0413')).length > 0
    ) {
      let infoList = JSON.parse(localStorage.getItem('userinfo_0413'))
      infoList.forEach((item, i) => {
        if (item.username == loginForm.username) {
          infoList.splice(i, 1)
        }
      })
      infoList.unshift(
        JSON.parse(
          JSON.stringify({
            username: loginForm.username,
            password: loginForm.password
          })
        )
      )
      localStorage.setItem('userinfo_0413', JSON.stringify(infoList))
    } else {
      // 无缓存
      localStorage.setItem(
        'userinfo_0413',
        JSON.stringify([{
          username: loginForm.username,
          password: loginForm.password
        }])
      )
    }
  } else {
    // 不记住密码
    // 有缓存
    if (
      localStorage.getItem('userinfo_0413') &&
            JSON.parse(localStorage.getItem('userinfo_0413')).length > 1
    ) {
      let infoList = JSON.parse(localStorage.getItem('userinfo_0413'))
      infoList.forEach((item, i) => {
        if (item.username == loginForm.username) {
          infoList.splice(i, 1)
          localStorage.setItem(
            'userinfo_0413',
            JSON.stringify(infoList)
          )
          return
        }
      })
    }
  }
}
