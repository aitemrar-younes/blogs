import { RetrieveAPI, CUDAPI } from "./packages.api";

export function ListBlog() {
  return RetrieveAPI(`api/blog/`)
}
export function ListBlogByAccount(account_id) {
  return RetrieveAPI(`api/account/${account_id}/blogs/`)
}
export function RetrieveBlog(blog_id) {
  return RetrieveAPI(`api/blog/${blog_id}/`)
}
export function CreateBlog(formData) {
  return CUDAPI('api/blog/', formData, 'POST')
}