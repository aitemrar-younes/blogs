import { RetrieveAPI } from "./packages.api";

export function RetrieveUser(user_id) {
  return RetrieveAPI(`api/account/${user_id}/`)
}