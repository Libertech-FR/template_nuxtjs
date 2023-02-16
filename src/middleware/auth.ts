import { Middleware } from '@nuxt/types'

const auth: Middleware = ({$auth, redirect}) => {
  if (!$auth.loggedIn) {
    return redirect('/login')
  }
  else {
    return redirect('/index')
  }
}

export default auth
