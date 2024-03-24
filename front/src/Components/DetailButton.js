import * as React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material';


const options = [
  '編集',
  '削除',
];

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


const ITEM_HEIGHT = 48;

export default function DetailButton({ trouble_id, deleteTrouble }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user_id } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => { // 編集ボタンがクリックされたときの処理
    navigate('/user/' + String(user_id) + '/edit/' + String(trouble_id) + '/'); // 編集ページに遷移
    handleClose(); // メニューを閉じる
  };

  const handleDelete = () => { // 削除ボタンがクリックされたときの処理
    //削除するか表示する機能を作る
    setShowDeleteConfirm(true);

    handleClose(); // メニューを閉じる
  };

  const handleNoClick = () => {
    setShowDeleteConfirm(false); // いいえボタンがクリックされたときに確認ダイアログを非表示にする
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key="edit" onClick={handleEdit}>編集</MenuItem> {/* 編集ボタン */}
        <MenuItem key="delete" onClick={handleDelete} style={{ color: 'red' }}>削除</MenuItem> {/* 削除ボタン */}
      </Menu>
      {showDeleteConfirm &&
        <div>
          <div style={overlayStyle}></div> {/* オーバーレイ */}
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="body1">本当に削除しますか？</Typography>
                  <div style={buttonContainerStyle}>
                    <Button variant="contained" color="error" style={buttonStyle} onClick={()=>deleteTrouble(trouble_id)}>はい</Button>
                    <Button variant="text" style={buttonStyle} onClick={handleNoClick}>いいえ</Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      } 
    </div>
  );
}
