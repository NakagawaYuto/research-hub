import * as React from 'react';
import axios from "axios";
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import CommentDetailButton from '../components/CommentDetailButton';
import DateConvert from '../components/DateConvert';
import DetailCard from '../components/DetailCard';
import Header from '../components/Header';


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



const TroubleDetailPage = () => {
  // パラメータから値を取得する.
  const { trouble_id } = useParams();
  const { user_id } = useParams();
  const [trouble, setTrouble] = React.useState(null);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8080/trouble/trouble/" + String(trouble_id) + "/";
  const commentBaseURL = "http://127.0.0.1:8080/trouble/comment/";

  const addComment = () => {
    const nameOk = name.length !== 0;
    const bodyOk = body.length !== 0;
    if (nameOk && bodyOk) {
      axios.post(commentBaseURL, {
        name: String(name),
        body: String(body),
        trouble: String(trouble_id),
      })
        .then(() => {
          setName('');
          setBody('');
          axios.get(baseURL).then((response) => {
            setTrouble(response.data);
          });
        })
        .catch(error => console.error("Error adding comment: ", error));
    } else {
      setErrorMessage('全ての項目を入力してください');
    }
  }

  const deleteComment = (comment_id) => { //削除する
    const commentDeleteURL = "http://127.0.0.1:8080/trouble/comment/" + String(comment_id) + "/";
    
    axios.delete(commentDeleteURL).then(() => {
      setIsDeleted(true);
      axios.get(baseURL).then((response) => {
        setTrouble(response.data);
        setTimeout(() => setIsDeleted(false), 1000);
      });
    });
  }

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
          <div>
            <Grid container alignItems='center' justify='center' direction="column">
              <Card
                sx={{ width: '60vw' }}
                elevation={1}
                style={{
                  margin: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                      <Typography variant="h4" align="left" style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '10px' }}>
                        コメント
                      </Typography>
                      <Divider style={{ width: '49vw', marginTop: '10px', marginBottom: '10px' }} />
                      {trouble.comments.length === 0 && <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333' }}>コメントはありません</Typography>}
                      {trouble.comments.map((comment, index) => (
                        <div key={comment.id}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                              <Avatar src="/broken-image.jpg" sx={{ width: 18, height: 18 }} />
                              <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'normal', color: '#333', marginLeft: '8px' }}>
                                {comment.name}
                              </Typography>
                            </div>
                            <Typography variant="body1" align="right" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'normal', color: '#666' }}>
                              {DateConvert(comment.created_date)}
                            </Typography>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '18px', fontWeight: 'normal', color: '#333' }}>
                              {comment.body.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                            </Typography>
                            <CommentDetailButton comment_id={comment.id} deleteComment={deleteComment}></CommentDetailButton>
                          </div>

                          {index < trouble.comments.length - 1 && <Divider style={{ width: '49vw', marginTop: '10px', marginBottom: '10px' }} />}
                        </div>
                      ))}
                      <Divider style={{ width: '49vw', marginTop: '30px', marginBottom: '20px' }} />
                      <Typography variant="h4" align="left" style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '30px', marginBottom: '10px' }}>
                        コメントを入力する
                      </Typography>

                      {errorMessage && (
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

                      <form>
                        <TextField
                          fullWidth
                          label="名前"
                          variant="outlined"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="コメント"
                          multiline
                          rows={4}
                          variant="outlined"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          margin="normal"
                        />
                      </form>
                      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }} onClick={() => {
                        addComment();
                      }}>
                        投稿
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </div>
        </Grid>
      </Grid>
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

export default TroubleDetailPage;