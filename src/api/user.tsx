import instance from "./instance";

export const signin = (user: any) => {
    return instance.post("/signin", user)
}
export const signup = (user: any) => {
    return instance.post("/signup", user)
}
