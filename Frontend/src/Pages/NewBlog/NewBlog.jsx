import React from 'react'
import '/src/assets/Styles/NewBlog.scss'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newSchema } from '../../utils/formSchema/blogValidationSchema';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { CreateBlog } from '../../utils/api/blog.api';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/context/AuthContext.context';

const NewBlog = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    /* set instance for managing form */
    const {register, handleSubmit, formState:{errors}, control} = useForm({
        resolver: yupResolver(newSchema),
        defaultValues: {
            title:'',
            content:'',
            image:null ,
        }
    })
    /* Create */
    //Api mutation
    const createBlogdMutation = useMutation({
        mutationFn: CreateBlog,
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: ["simCards"] });
            //setOpenModal(false);
            navigate('/blog');
        },
        onError: (error) => {
            if (error.status == 401)
                logout()
        },
    });
    const onSubmit = (data) =>{
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('content', data.content)
        formData.append('thumbnail', data.image[0])
        createBlogdMutation.mutate(formData)
    }
    
    return (
        <div className='__NewBlog__'>
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