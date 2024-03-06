// DeleteMessage コンポーネント
import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const messageStyle = {
  position: 'fixed',
  top: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10000,
};

const DeleteMessage = () => {
  return (
    <div style={messageStyle}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        削除しました
      </Alert>
    </div>
  );
};

export default DeleteMessage;
