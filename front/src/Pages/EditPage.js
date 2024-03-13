import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

import Header from '../components/Header';


const Edit = () => {
  const navigate = useNavigate();
  const { trouble_id } = useParams();
  const { user_id } = useParams();
  const baseURL = "http://127.0.0.1:8080/trouble/trouble/" + String(trouble_id) + "/";
  const [trouble, setTrouble] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [users, setUsers] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');


  const pageStyle = {
    backgroundColor: '#f5f5f5', // 薄いグレー
    minHeight: '100vh', // 画面全体の高さに背景を広げる
  };

  // 初回ロード時の処理を記述する.
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      const { title, body } = response.data;
      setTitle(title);
      setBody(body);
      setTrouble(response.data);
    });
    //ユーザーデータ取得
    axios.get("http://127.0.0.1:8080/users/").then((userResponse) => {
      setUsers(userResponse.data);
    });
  }, []);
  if (!trouble || !users) return null;

  const user = users.find(user => user.id === parseInt(user_id));
  const userName = user ? user.name : '';

  const updateBlog = () => {
    const titleOk = title.length !== 0;
    const bodyOk = body.length !== 0;
    if (titleOk && bodyOk) {
      axios.patch(baseURL, { //patchで上書きする
        title: String(title),
        body: String(body),
      })
        .then(() => {
          setTitle('');
          setBody('');
          navigate('/user/' + String(user_id) + '/trouble/');
        })
    } else {
      setErrorMessage('全ての項目を入力してください');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // ページ上部にスクロール
    }
  }
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
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container alignItems='center' justify='center' direction="column">
              <Card
                sx={{ width: '55vw', pt: 3, pb: 3, pl: 1, pr: 1 }}
                elevation={1}
                style={{
                  margin: '10px 0px 30px 0px',
                  display: 'flex',
                  justifyContent: 'center', // カードの内部で要素を左右に配置
                  alignItems: 'center', // カードの内部で要素を中央に配置
                }}
              >

                <Grid container alignItems='center' justify='center' direction="column">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/broken-image.jpg" sx={{ width: 20, height: 20, color: '#FFFFFF', backgroundColor: 'primary.main' }} />
                    <Typography style={{ marginLeft: '8px' }}>
                      {userName}
                    </Typography>
                  </div>

                  {errorMessage && ( // エラーメッセージがある場合に表示
                    <Grid item>
                      <Typography
                        variant="body1"
                        style={{
                          margin: 10,
                          fontFamily: 'serif',
                          color: 'red'
                        }}
                      >
                        {errorMessage}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="タイトル"
                      multiline
                      maxRows={4}
                      style={{
                        margin: 20,
                        fontFamily: 'serif',
                        width: '50vw',
                      }}
                      value={title}
                      onChange={(e) => { setTitle(e.target.value) }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-multiline-static"
                      label="悩みや課題"
                      multiline
                      rows={15}
                      style={{
                        margin: 20,
                        fontFamily: 'serif',
                        width: '50vw',
                      }}
                      value={body}
                      onChange={(e) => { setBody(e.target.value) }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => {
                        updateBlog();
                      }}
                      style={{
                        width: 200,
                        color: "white",
                        fontSize: 20,
                        fontFamily: 'Meiryo',
                        fontWeight: 'normal',
                        background: "primary",
                        padding: 5,
                        borderRadius: 5,
                        boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
                      }}
                      size="large"
                    >編集して投稿</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Edit;
