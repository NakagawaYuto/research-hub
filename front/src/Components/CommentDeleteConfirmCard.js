import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import DeleteMessage from './DeleteMessage';

import createAxiosInstance from '../createAxiosInstance';


const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明の黒色オーバーレイ
  zIndex: 9998,
};

const cardStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  backgroundColor: '#ffffff', // 背景色を指定
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // 影の強さを指定
  borderRadius: '8px', // カードの角丸を指定
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const buttonStyle = {
  margin: '0 10px',
};

const CommentDeleteConfirmCard = ({ onNoClick, comment_id }) => {
  const baseURL = "trouble/comment/" + String(comment_id) + "/";
  const [isDeleted, setIsDeleted] = useState(false);

  const ax = createAxiosInstance();
  const deleteTrouble = () => { //削除する
    ax.delete(baseURL).then(() => {
      window.location.reload();
      setIsDeleted(true);
    });
  }

  return (
    <div>
      <div style={overlayStyle}></div> {/* オーバーレイ */}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="body1">本当に削除しますか？</Typography>
              <div style={buttonContainerStyle}>
                <Button variant="contained" color="error" style={buttonStyle} onClick={deleteTrouble}>はい</Button>
                <Button variant="text" style={buttonStyle} onClick={onNoClick}>いいえ</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isDeleted && <DeleteMessage />}
    </div>
  );
};

export default CommentDeleteConfirmCard;
