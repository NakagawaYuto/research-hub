import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import TroubleAddButton from '../components/TroubleAddButton';
import Header from '../components/Header';
import DateConvert from '../components/DateConvert';
import DetailButton from '../components/DetailButton';

import createAxiosInstance from '../createAxiosInstance';


const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
};

const messageStyle = {
  position: 'fixed',
  top: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10000,
};

const Home = () => {
  // ページ内で値を保持するために使う.

  const [troubles, setTroubles] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { user_id } = useParams();

  const baseURL = "trouble/trouble/?user=" + String(user_id);
  const userURL = "users/";


  function goToAddPage() {
    navigate('/user/' + String(user_id) + '/add/');
  }

  const handleTitleMouseEnter = (trouble_id) => {
    setHoveredTitle(trouble_id);
  };

  const handleTitleMouseLeave = () => {
    setHoveredTitle(null);
  };


  const deleteTrouble = (trouble_id) => { //削除する
    const troubleDeleteURL = "http://127.0.0.1:8080/trouble/trouble/" + String(trouble_id) + "/";

    axios.delete(troubleDeleteURL).then(() => {
      setIsDeleted(true);
      axios.get(baseURL).then((response) => {
        setTroubles(response.data);
        setTimeout(() => setIsDeleted(false), 1000);
      });
    });
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

  const user = users.find(user => user.id === parseInt(user_id));
  const userName = user ? user.name : '';

  var Cards = [];
  for (let i = 0; i < troubles.length; i++) {
    const trouble = troubles[i];

    // titleの表示を制限
    let titleDisplay = trouble.title.length > 30 ? `${trouble.title.substring(0, 30)}...` : trouble.title;

    Cards.push(
      <Grid item key={trouble.id}>
        <Card
          sx={{ width: '45vw', pt: 1, pb: 0, pl: 3, pr: 3 }}
          elevation={1}
          style={{
            margin: '10px 0px 10px 0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <CardActions onClick={() => { navigate("/user/" + String(user_id) + "/trouble/" + String(trouble.id)) }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="/broken-image.jpg" sx={{ width: 20, height: 20 }} />
                <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333', marginLeft: '8px' }}>
                  {userName}
                </Typography>
              </div>
              <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#666' }}>
                投稿日 {DateConvert(trouble.created_date)}
              </Typography>
              <Typography
                variant="h4"
                align="left"
                style={{
                  fontFamily: 'Meiryo',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '10px',
                  marginBottom: '10px',
                  textDecoration: hoveredTitle === trouble.id ? 'underline' : 'none',
                  textDecorationThickness: '1px', // アンダーラインの太さ
                }}
                onMouseEnter={() => handleTitleMouseEnter(trouble.id)}
                onMouseLeave={handleTitleMouseLeave}
              >
                {titleDisplay}
              </Typography>
              <Divider style={{ width: '40vw', marginTop: '10px', marginBottom: '15px' }} />
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                <ChatBubbleOutlineIcon color="disabled" fontSize="small" style={{ marginRight: '3px' }} />
                <Typography variant="body1" align="center" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#333' }}>
                  {trouble.comments.length}
                </Typography>
              </div>
            </CardContent>
          </CardActions>
          <div style={{ position: 'relative', top: '-60px' }}>
            <DetailButton trouble_id={trouble.id} onClick={(e) => { e.stopPropagation(); }} deleteTrouble={deleteTrouble} ></DetailButton>
          </div>
        </Card>
      </Grid>
    );
  }

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
          <Grid container alignItems='center' justify='center' direction="column">
            {Cards.length === 0 ? (
              <Card
                sx={{ width: '45vw', pt: 1, pb: 0, pl: 3, pr: 3 }}
                elevation={1}
                style={{
                  margin: '10px 0px 0px 0px',
                  padding: '30px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <SmsFailedIcon style={{ fontSize: 100 }} />
                <Typography variant="body1" align="center" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333' }}>
                  課題・悩みはまだ投稿されていません。
                </Typography>
              </Card>

            ) : (
              Cards
            )}
          </Grid>
        </Grid>
      </Grid>



      <TroubleAddButton onClick={goToAddPage}></TroubleAddButton>
      {isDeleted &&
        <div style={messageStyle}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            削除しました
          </Alert>
        </div>
      }
    </div>
  );
};


export default Home;
