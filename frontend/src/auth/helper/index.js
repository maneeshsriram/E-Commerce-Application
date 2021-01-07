import { API } from '../../backend'
import { emptyCart } from '../../core/helper/CartHelper'

export const signup = user => {
    return fetch(`${API}user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const signin = user => {
    const formData = new FormData()
    for (const name in user) {
        formData.append(name, user[name])
    }
    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("token", JSON.stringify(data));
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof window === undefined) {
        return false
    }
    if (localStorage.getItem("token")) {
        return JSON.parse(localStorage.getItem("token"))
    } else {
        return false
    }
}

export const signout = next => {
    const userID = isAuthenticated() && isAuthenticated().user.id
    if (typeof window !== undefined) {
        localStorage.removeItem("token")
        emptyCart(() => { })

        return fetch(`${API}user/logout/${userID}`, {
            method: "GET"
        })
            .then(res => {
                console.log("Signout success");
                next();
            })
            .catch(err => console.log(err))

    }
}