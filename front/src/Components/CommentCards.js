import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const CommentList = ({ comments }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ margin: 20, fontFamily: 'serif' }}>
        コメント
      </Typography>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <Typography variant="subtitle1" style={{ marginBottom: 1, fontFamily: 'serif' }} >
            {comment.body}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: 15, fontFamily: 'serif' }} >
            By: {comment.name}
          </Typography>
          {index < comments.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default CommentList;