import { CUDAPI, RetrieveAPI } from "./packages.api";

export function RetrieveUser(user_id) {
  return RetrieveAPI(`api/account/${user_id}/`)
}

export function RetrieveUserByToken() {
  return RetrieveAPI(`api/account/${user_id}/`)
}
export function LoginUser(data) {
  return CUDAPI(`api/account/login/`, data, 'POST', false, false)
}