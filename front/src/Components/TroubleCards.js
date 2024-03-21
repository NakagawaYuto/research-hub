import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import { useState } from 'react';

import DateConvert from './DateConvert';
import DetailButton from './DetailButton';

const TroubleCards = ({ Troubles, user_id, Users }) => {
  const navigate = useNavigate();
  const [hoveredTitle, setHoveredTitle] = useState(null);

  const handleTitleMouseEnter = (trouble_id) => {
    setHoveredTitle(trouble_id);
  };

  const handleTitleMouseLeave = () => {
    setHoveredTitle(null);
  };

  const user = Users.find(user => user.id === parseInt(user_id));
  const userName = user ? user.name : '';

  var Cards = [];
  for (let i = 0; i < Troubles.length; i++) {
    const trouble = Troubles[i];

    // titleの表示を制限
    let titleDisplay = trouble.title.length > 30 ? `${trouble.title.substring(0, 30)}...` : trouble.title;

    Cards.push(
      <Grid item key={trouble.id}>
        <Card
          sx={{ width: '45vw', pt: 1, pb: 0, pl: 3, pr: 3 }}
          elevation={1}
          style={{
            margin: '10px 0px 10px 0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <CardActions onClick={() => { navigate("/user/" + String(user_id) + "/trouble/" + String(trouble.id)) }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="/broken-image.jpg" sx={{ width: 20, height: 20 }} />
                <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333', marginLeft: '8px' }}>
                  {userName}
                </Typography>
              </div>
              <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#666' }}>
                投稿日 {DateConvert(trouble.created_date)}
              </Typography>
              <Typography
                variant="h4"
                align="left"
                style={{
                  fontFamily: 'Meiryo',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '10px',
                  marginBottom: '10px',
                  textDecoration: hoveredTitle === trouble.id ? 'underline' : 'none',
                  textDecorationThickness: '1px', // アンダーラインの太さ
                }}
                onMouseEnter={() => handleTitleMouseEnter(trouble.id)}
                onMouseLeave={handleTitleMouseLeave}
              >
                {titleDisplay}
              </Typography>
              <Divider style={{ width: '40vw', marginTop: '10px', marginBottom: '15px' }} />
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                <ChatBubbleOutlineIcon color="disabled" fontSize="small" style={{ marginRight: '3px' }} />
                <Typography variant="body1" align="center" style={{ fontFamily: 'Meiryo', fontSize: '14px', fontWeight: 'nomal', color: '#333' }}>
                  {trouble.comments.length}
                </Typography>
              </div>
            </CardContent>
          </CardActions>
          <div style={{ position: 'relative', top: '-60px' }}>
            <DetailButton trouble_id={trouble.id} onClick={(e) => { e.stopPropagation(); }}></DetailButton>
          </div>
        </Card>
      </Grid>
    );
  }
  return (
    <>
      <Grid container alignItems='center' justify='center' direction="column">
        {Cards.length === 0 ? (
          <Card
            sx={{ width: '45vw', pt: 1, pb: 0, pl: 3, pr: 3 }}
            elevation={1}
            style={{
              margin: '10px 0px 0px 0px',
              padding: '30px 0px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <SmsFailedIcon style={{ fontSize: 100 }} />
            <Typography variant="body1" align="center" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333' }}>
              課題・悩みはまだ投稿されていません。
            </Typography>
          </Card>

        ) : (
          Cards
        )}
      </Grid>
    </>
  );

}

export default TroubleCards;
