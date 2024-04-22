import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const BACKEND_URL = process.env.BACKEND_URL;

const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
  paddingTop: '20px', // 上部の余白を追加
};

const Login = (props) => {

  const [passwordType, setPasswordType] = useState("password");

  const history = useNavigate();
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies();
  const { register, handleSubmit, watch, errors } = useForm();

  const getJwt = async (data) => {
    await axios.post(`https://mkr7ke6tvz.ap-northeast-1.awsapprunner.com/auth/jwt/create/`,
      {
        username: data.username,
        password: data.password,
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
    <div className="top-wrapper" style={pageStyle}>
      <Typography color="primary" style={{ fontFamily: 'Arial Black', fontSize: '50px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        Research Hub
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <Card sx={{ width: 650, height: 340 }}>
          <Box p={3}>
            <Typography color="#444" style={{ fontFamily: 'Meiryo', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
              ログインする
            </Typography>
            <div class="login-block">
              <form onSubmit={handleSubmit(getJwt)}>
                <Grid container>
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label="ユーザーネーム"
                      variant="outlined"
                      margin="normal"
                      sx={{ backgroundColor: 'white' }}
                      className='form-control'
                      {...register('username')}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label="パスワード"
                      variant="outlined"
                      margin="normal"
                      sx={{ backgroundColor: 'white' }}
                      className='form-control'
                      type={passwordType}
                      {...register('password', { required: true })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {passwordType === "password" ? (
                              <IconButton onClick={() => setPasswordType("text")}>
                                <Visibility />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => setPasswordType("password")}>
                                <VisibilityOff />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}

                    />


                  </Grid>
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px', height: '50px', width: 'calc(100% - 100px)'  }} { ...navigate('/')}>
                    <Typography style={{ fontFamily: 'Meiryo', fontWeight: 'bold' }} >
                      ログイン
                    </Typography>
                  </Button>
                </div>


              </form>
            </div>
          </Box>
        </Card>
      </Box>
    </div>

  );
}

export default Login;