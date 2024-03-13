import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

import CommentAddForm from './CommentAddForm';
import DateConvert from './DateConvert';
import CommentDetailButton from './CommentDetailButton';

const CommentList = ({ comments }) => {
  const { trouble_id } = useParams();
  const flag = comments.length === 0;
  return (
    <div>
      <Grid container alignItems='center' justify='center' direction="column">
        <Card
          sx={{ width: '60vw' }}
          elevation={1}
          style={{
            margin: 1,
            justifyContent: 'center', // カードの内部で要素を左右に配置
            alignItems: 'center', // カードの内部で要素を中央に配置
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
                {flag && <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'nomal', color: '#333' }}>コメントはありません</Typography>}
                {comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Avatar src="/broken-image.jpg" sx={{ width: 18, height: 18 }} />
                        <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#333', marginLeft: '8px' }}>
                          {comment.name}
                        </Typography>
                      </div>
                      <Typography variant="body1" align="right" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#666' }}>
                        {DateConvert(comment.created_date)}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '18px', fontWeight: 'nomal', color: '#333' }}>
                        {comment.body}
                      </Typography>
                      <CommentDetailButton comment_id={comment.id}></CommentDetailButton>
                    </div>

                    {index < comments.length - 1 && <Divider style={{ width: '49vw', marginTop: '10px', marginBottom: '10px' }} />}
                  </div>
                ))}
                <Divider style={{ width: '49vw', marginTop: '30px', marginBottom: '20px' }} />
                {/*ここからコメント追加フォーム*/}
                <CommentAddForm trouble_id={trouble_id} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

    </div>
  );
};

export default CommentList;