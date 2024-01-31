import { CUD_formData_noAuth_API, RetrieveAPI } from "./packages.api";

export function ListBlog() {
  return RetrieveAPI(`api/`)
}
export function ListBlogByAccount(account_id) {
  return RetrieveAPI(`api/account/${account_id}/blogs/`)
}
export function RetrieveBlog(blog_id) {
  console.log(blog_id)
  return RetrieveAPI(`api/${blog_id}/`)
}
export function CreateBlog(formData) {
  console.log(formData)
  return CUD_formData_noAuth_API('api/', formData, 'POST')
}