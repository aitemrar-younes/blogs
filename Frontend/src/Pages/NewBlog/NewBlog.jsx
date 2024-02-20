import React, { useEffect } from 'react'
import '/src/assets/Styles/NewBlog.scss'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newSchema, updateSchema } from '../../utils/formSchema/blogValidationSchema';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { CreateBlog, RetrieveBlog, UpdateBlog } from '../../utils/api/blog.api';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/context/AuthContext.context';

const NewBlog = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const blog_id = useParams().id;
    
    const BlogDetailQuery = useQuery({
        queryKey: ["blog", blog_id],
        queryFn: ()=>RetrieveBlog(blog_id),
        retry:false,
        enabled:!!blog_id
    });
    
    /* set instance for managing form */
    const {register, handleSubmit, formState:{errors}, control, reset} = useForm({
        resolver: yupResolver( blog_id ? updateSchema : newSchema ),
        defaultValues: {
            title: blog_id ? BlogDetailQuery?.data?.title : "",
            content: blog_id ? BlogDetailQuery?.data?.content : "",
            image: null ,
        }
    })
    useEffect(()=>{
        if(BlogDetailQuery.data){
            const blog = BlogDetailQuery.data
            reset(
                {
                    title: blog ? blog.title : "",
                    content: blog ? blog.content : "",
                    image: null
                }
            )
        }
        else{
            reset(
                {
                    title: "",
                    content: "",
                    image: null
                }
            )
        }
    },[BlogDetailQuery.data, blog_id])
    /* Create */
    //Api mutation
    const createBlogdMutation = useMutation({
        mutationFn: blog_id ? UpdateBlog : CreateBlog,
        onSuccess: () => {
            navigate('/blog');
        },
        onError: (error) => {
            if (error.status == 401)
                logout()
        },
    });
    const onSubmit = (data) =>{
        const formData = new FormData();

        blog_id ? formData.append('id', blog_id) : null
        formData.append('title', data.title)
        formData.append('content', data.content)
        data.image ? formData.append('thumbnail',  data?.image[0] ) : null
        createBlogdMutation.mutate(formData)
    }
    
    return (
        <div className='__NewBlog__'>
            <h2>
                {
                    blog_id ? 'Update blog' : 'New blog'
                }
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_group">
                    <label htmlFor="">Title</label>
                    <input type='text' className="input" placeholder='Title' {...register('title')} />
                    {errors && errors['title'] && <span className="error pl_10">{errors['title'].message}</span>}
                </div>
                <div className="input_group">
                    <label htmlFor="">Blog content</label>
                    {/* <textarea className="input" placeholder='Content' rows={18} {...register('content')} /> */}
                    {/* <ReactQuill {...register('content')} placeholder="Write something..." /> */}
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <>
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {errors && errors['content'] && <span className="error pl_10">{errors['content'].message}</span>}
                            </>
                        )}
                    />
                    {/* {errors && errors['content'] && <span className="error pl_10">{errors['content'].message}</span>} */}
                </div>
                <div className="input_group">
                    <label className='image_upload_label' htmlFor="image_upload">Image</label>
                    <input id="image_upload" type='file' className="input" {...register('image')} accept='image/*' />
                    {errors && errors['image'] && <span className="error pl_10">{errors['image'].message}</span>}
                </div>

                <button className='btn w_100' type="submit">Create</button>

            </form>
        </div>
    )
}

export default NewBlog