import * as React from 'react';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import DateConvert from './DateConvert';
import DetailButton from './DetailButton';


const DetailCard = () => {
  const navigate = useNavigate();
  const [trouble, setTrouble] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const { trouble_id } = useParams();
  const { user_id } = useParams();
  const baseURL = "http://127.0.0.1:8080/trouble/trouble/" + String(trouble_id) + "/"


  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTrouble(response.data);
    });

    //ユーザーデータ取得
    axios.get("http://127.0.0.1:8080/users/").then((userResponse) => {
      setUsers(userResponse.data);
    });
  }, []
  );
  if (!trouble || !users) return null;
  const user = users.find(user => user.id === parseInt(user_id));
  const userName = user ? user.name : '';
  console.log("user_id:", user_id);
  console.log("users:", users);


  return (
    <>
      <Grid container alignItems='center' justify='center' direction="column">
        <Card
          sx={{ width: '60vw' }}
          elevation={1}
          style={{

            margin: '0px 0px 30px 0px',

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/broken-image.jpg" sx={{ width: 20, height: 20 }} />
                    <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333', marginLeft: '8px' }}>
                      {userName}
                    </Typography>
                  </div>
                  <DetailButton trouble_id={trouble_id}></DetailButton>
                </div>

                <Typography variant="h4" align="left" style={{ fontFamily: 'Meiryo', fontSize: '30px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '10px' }}>
                  {trouble.title}
                </Typography>
                <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'nomal', color: '#666' }}>
                  最終更新日 {DateConvert(trouble.updated_date)} &nbsp;&nbsp; 投稿日 {DateConvert(trouble.created_date)}
                </Typography>

                <Divider style={{ width: '48vw', marginTop: '10px', marginBottom: '10px' }} />

                <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '18px', fontWeight: 'nomal', color: '#333' }}>
                  {trouble.body.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </CardContent>

        </Card>
      </Grid>
    </>
  )
}


export default DetailCard;