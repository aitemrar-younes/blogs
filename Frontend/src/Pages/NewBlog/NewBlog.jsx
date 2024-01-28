import React from 'react'
import '/src/assets/Styles/NewBlog.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newSchema } from '../../utils/formSchema/blogValidationSchema';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const NewBlog = () => {
    /* set instance for managing form */
    const {register, handleSubmit, formState:{errors}, control} = useForm({
        resolver: yupResolver(newSchema),
        defaultValues: {
            title:'',
            content:'',
            image:null ,
        }
    })
    const onSubmit = (data) =>{
        console.log(data)
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
                    <ReactQuill {...register('content')} placeholder="Write something..." />
                    {errors && errors['content'] && <span className="error pl_10">{errors['content'].message}</span>}
                </div>
                <div className="input_group">
                    <label className='image_upload_label' htmlFor="image_upload">Image</label>
                    <input id="image_upload" type='file' className="input" {...register('image')} />
                    {errors && errors['image'] && <span className="error pl_10">{errors['image'].message}</span>}
                </div>

                <button className='btn w_100' type="submit">Create</button>

            </form>
        </div>
    )
}

export default NewBlog