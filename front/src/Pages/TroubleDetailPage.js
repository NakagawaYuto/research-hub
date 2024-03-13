import * as React from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import DetailCard from '../components/DetailCard';
import CommentCards from '../components/CommentCards';
import Header from '../components/Header';


const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
};

const TroubleDetailPage = () => {
  // パラメータから値を取得する.
  const { trouble_id } = useParams();
  const { user_id } = useParams();
  const [trouble, setTrouble] = React.useState(null);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8080/trouble/trouble/" + String(trouble_id) + "/";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTrouble(response.data);
    });
  }, []);
  if (!trouble) return null;
  return (
    <div style={pageStyle}>
      <Header />
      <Grid container item xs={12}>
        <Grid item xs={2}>
          <IconButton onClick={() => navigate('/user/' + String(user_id) + '/trouble/')} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginLeft: '30px' }}>
            <ArrowBackIosIcon />
            <Typography>
              悩みホームへ戻る
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <DetailCard />
          <CommentCards comments={trouble.comments} />
        </Grid>
      </Grid>




    </div>
  );
};


export default TroubleDetailPage;