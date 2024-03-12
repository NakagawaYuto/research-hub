import * as React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import DetailCard from '../components/DetailCard';
import CommentCards from '../components/CommentCards';


const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
};

const TroubleDetailPage = () => {
  // パラメータから値を取得する.
  const params = useParams();
  const [trouble, setTrouble] = React.useState(null);
  const baseURL = "http://127.0.0.1:8080/trouble/" + String(params.id) + "/"

  React.useEffect(() => 
    {
      axios.get(baseURL).then((response) => {
        setTrouble(response.data);
      });
    }, []);
  if (!trouble) return null;
  return (
    <div style={pageStyle}>
      <DetailCard />

      <CommentCards comments={trouble.comments} />

      
    </div>
  );
};


export default TroubleDetailPage;