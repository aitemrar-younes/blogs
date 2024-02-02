import * as yup from 'yup'

export const loginSchema = yup.object({
    username:yup.string().required('username est obligatoire').min(2),
    password:yup.string().required('password est obligatoire').min(2),
})