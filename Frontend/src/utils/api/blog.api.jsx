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
export function RetrieveBlogIsLiked(blog_id) {
  return RetrieveAPI(`api/blog/${blog_id}/like/`, true)
}
export function ToggleBlogLike(blog_id) {
  return CUDAPI(`api/blog/${blog_id}/like/`, null, 'POST')
}
export function CreateBlog(formData) {
  return CUDAPI('api/blog/', formData, 'POST')
}
export function UpdateBlog(formData) {
  return CUDAPI(`api/blog/${formData.get('id')}/`, formData, 'PUT')
}