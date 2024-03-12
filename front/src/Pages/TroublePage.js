import * as React from 'react';
import axios from "axios";

// 外部コンポーネント
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

// 自作コンポーネント
import TroubleCards from '../Components/TroubleCards';
import TroubleAddButton from '../Components/TroubleAddButton';


const baseURL = "http://127.0.0.1:8080/trouble/"

const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
};

const Home = () => {
    // ページ内で値を保持するために使う.
    const [troubles, setTroubles] = React.useState(null);
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    function goToAddPage() {
      navigate('/add/');
    }
  
    // 初回ロード時の処理を記述する.
    React.useEffect(() => 
      {
  
        axios.get(baseURL).then((response) => {
          setTroubles(response.data);
        });
  
      }, []);
    if (!troubles) return null;
  
    return (
      <div style={pageStyle}>
      <Box sx={{ flexGrow: 1 }}>
  
        <Grid container alignItems='center' justify='center' direction="column">
          <Grid item>
            <Typography variant="h3" gutterBottom style={{ margin: 20, fontFamily:'serif', fontWeight: 'bold' }}>
              悩み投稿
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" style={{ marginBottom: 15, fontFamily:'serif' }} >
              研究における悩みや課題を投稿するページです。
            </Typography>
          </Grid>
        </Grid>
  
        <TroubleCards Troubles={troubles}></TroubleCards>
  
        <TroubleAddButton onClick={goToAddPage}></TroubleAddButton>
  
      </Box>
      </div>
    );
  };
  
  
  export default Home;