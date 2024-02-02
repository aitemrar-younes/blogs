import React from 'react'
import { useAuth } from '../../utils/context/AuthContext.context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/formSchema/loginValidationSchema';
import { LoginUser } from '../../utils/api/user.api';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const { login } = useAuth();
  /* Create */
  //Api mutation
  const LoginMutation = useMutation({
      mutationFn: LoginUser,
      onSuccess: (data) => {
        login(data.token)
          //navigate('/blog');
      },
      onError: (error) => {
          
      },
  });
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username:"",
      password:""
    }
  })
  const onSubmit = (data) =>{
    
    //login(data)
    LoginMutation.mutate(data)
  }

  return (
    <div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input_group">
          <label htmlFor="">Username</label>
          <input type="text" className="input" {...register("username")} />
          { errors && errors.username && <span className="error pl_10">{errors.username.message}</span> }
        </div>
        <div className="input_group">
          <label htmlFor="">Password</label>
          <input type="password" className="input" {...register("password")} />
          { errors && errors.password && <span className="error pl_10">{errors.password.message}</span> }
        </div>
        <button className="btn w_100">Se connecter</button>
      </form>
    </div>
  )
}

export default Login