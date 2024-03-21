import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const DetailCards = ({ Details, id, detailTarget }) => {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardClick = (cardId) => {
    if (selectedCardId === cardId) {
      // クリックしたカードがすでに選択されている場合、選択を解除
      setSelectedCardId(null);
      // detailTarget を呼び出して null を渡す
      detailTarget(null);
    } else {
      // クリックしたカードが選択されていない場合、選択状態を更新
      setSelectedCardId(cardId);
      // カードの詳細表示などの他の処理を追加する場合はここに追加
      detailTarget(cardId);
    }
  };

  return (
    <Grid container alignItems='center' justify='center' direction="column">
      {Details.map((blog) => {
        const { id: cardId, detail_title: title, detail_deadline: deadline, done, department } = blog;
        if (done === false && department === id) {
          return (
            <Grid item key={cardId}>
              <Card
                sx={{
                  width: '50vw',
                  border: selectedCardId === cardId ? '2px solid #1976d2' : 'none', // 選択されたカードに枠を付ける
                }}
                elevation={4}
                style={{ margin: 10 }}
              >
                <CardActionArea onClick={() => handleCardClick(cardId)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontFamily='Meiryo'>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontFamily='Meiryo'>
                      {deadline}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }
        return null; // done が true または department が id に一致しない場合は何も表示しない
      })}
    </Grid>
  );
};

export default DetailCards;