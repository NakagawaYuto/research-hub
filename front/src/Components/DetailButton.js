import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';

import DeleteConfirmCard from './DeleteConfirmCard';

const options = [
  '編集',
  '削除',
];

const ITEM_HEIGHT = 48;

export default function DetailButton({trouble_id}) {
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
    navigate('/user/'+String(user_id)+'/edit/'+String(trouble_id)+'/'); // 編集ページに遷移
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
      {showDeleteConfirm && <DeleteConfirmCard onNoClick={handleNoClick} trouble_id={trouble_id} />} {/* 削除確認カードを表示 */}
    </div>
  );
}
