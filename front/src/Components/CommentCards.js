import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams } from "react-router-dom";

import CommentAddForm from './CommentAddForm';
import DateConvert from './DateConvert';
import CommentDetailButton from './CommentDetailButton';

const CommentList = ({ comments }) => {
  const params = useParams();
  const flag = comments.length === 0;
  return (
    <div>
      <Grid container alignItems='center' justify='center' direction="column">
        <Card
          sx={{ width: '60vw' }} 
          elevation={1} 
          style={{
          margin: 1,
          display: 'flex',
          justifyContent: 'center', // カードの内部で要素を左右に配置
          alignItems: 'center', // カードの内部で要素を中央に配置
          }}
        >
          <CardContent>
            <Typography variant="h4" align="left" style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '10px'}}>
              コメント
            </Typography>
            <Divider style={{ width: '55vw', marginTop: '10px', marginBottom: '10px' }}/>
            {flag && <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'nomal', color: '#333' }}>コメントはありません</Typography>}
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#333', marginBottom: '10px'}}>
                    {comment.name}
                  </Typography>
                  <Typography variant="body1" align="right" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#666' }}>
                    {DateConvert(comment.created_date)}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '18px', fontWeight: 'nomal', color: '#333' }}>
                    {comment.body}
                  </Typography>
                  <CommentDetailButton CommentId = {comment.id}></CommentDetailButton>
                </div>
                
                {index < comments.length - 1 && <Divider style={{ width: '55vw', marginTop: '10px', marginBottom: '10px' }}/>}
              </div>
            ))}
            <Divider style={{ width: '55vw', marginTop: '30px', marginBottom: '20px' }}/>
            {/*ここからコメント追加フォーム*/ }
            <CommentAddForm postId={params.id}/>
          </CardContent>
        </Card>
      </Grid>

    </div>
  );
};

export default CommentList;