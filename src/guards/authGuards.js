import { isLoggedIn } from "../services/localStorage";

export default function authGuard(to, from, next) {
    if (to.name !== 'Login' && !isLoggedIn()) next({ name: 'Login' })
    else if (to.name === 'Login' && isLoggedIn()) next({ name: 'Locations' })
    else next()
}