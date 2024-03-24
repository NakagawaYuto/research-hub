import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form";
import  { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.BACKEND_URL;


const Login = (props) => {
    const history = useNavigate();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies();
    const { register, handleSubmit, watch, errors } = useForm();

    const getJwt = async (data) =>{
        await axios.post(`https://mkr7ke6tvz.ap-northeast-1.awsapprunner.com/auth/jwt/create/`,
          {
            username:data.username,
            password:data.password,
          },
        )
        .then(function (response) {
          setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
          setCookie('refreshtoken', response.data.refresh, { path: '/' }, { httpOnly: true });
          history.push('/');
        })
        .catch(err => {
            // alert("UsernameかPasswordが違います");
            // alert("UsernameかPasswordが違います");
        });
      };

    return (
        <div className="top-wrapper">
          <div class="login">
            <h3>Login</h3>
          </div>
          <div class="login-block">
            <form onSubmit={handleSubmit(getJwt)}>
              <label for="username">Username：</label>
              <input className='form-control' {...register('username')} />
              <label for="password">Password：</label>
              <input className='form-control' type="password" {...register('password', { required: true })} />
              <input className='btn btn-secondary' type="submit" value="ログイン" { ...navigate('/')}/>
            </form>
          </div>
        </div>
    );
  }

  export default Login;