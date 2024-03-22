import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams, useNavigate } from 'react-router-dom';

import TroubleCards from '../components/TroubleCards';
import TroubleAddButton from '../components/TroubleAddButton';
import Header from '../components/Header';

import createAxiosInstance from '../createAxiosInstance';


const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
};

const Home = () => {
  // ページ内で値を保持するために使う.

  const [troubles, setTroubles] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const navigate = useNavigate();
  const { user_id } = useParams();

  const baseURL = "trouble/trouble/?user=" + String(user_id);
  const userURL = "users/";


  function goToAddPage() {
    navigate('/user/' + String(user_id) + '/add/');
  }

  // 初回ロード時の処理を記述する.
  React.useEffect(() => {
    const ax = createAxiosInstance();
    ax.get(baseURL).then((response) => {
      setTroubles(response.data);
    });
    //ユーザーデータ取得
    ax.get(userURL).then((userResponse) => {
      setUsers(userResponse.data);
    });
  }, []);
  if (!troubles || !users) return null;

  return (
    <div style={pageStyle}>
      <Header />

      <Grid container item xs={12}>
        <Grid item xs={3}>
          <IconButton onClick={() => navigate('/user/' + String(user_id) + '/')} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginTop: '0px', marginLeft: '20px' }}>
            <ArrowBackIosIcon />
            <Typography>
              ユーザーページへ
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <TroubleCards Troubles={troubles} user_id={user_id} Users={users}></TroubleCards>
        </Grid>
      </Grid>



      <TroubleAddButton onClick={goToAddPage}></TroubleAddButton>
    </div>
  );
};


export default Home;
