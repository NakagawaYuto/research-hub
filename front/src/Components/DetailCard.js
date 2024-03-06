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

import DateConvert from '../Components/DateConvert';


const DetailCards = () => {
  const navigate = useNavigate();
  const [trouble, setTrouble] = React.useState(null);
  const params = useParams();
  const baseURL = "http://127.0.0.1:8080/trouble/" + String(params.id) + "/"


  React.useEffect(() => 
    {
      axios.get(baseURL).then((response) => {
        setTrouble(response.data);
      });
    }, []);
    if (!trouble) return null;


  return (
    <>
      <Grid container alignItems='center' justify='center' direction="column">
        <Card
          sx={{ width: '60vw' }} 
          elevation={1} 
          style={{
          margin: '50px 0px 30px 0px',
          display: 'flex',
          justifyContent: 'center', // カードの内部で要素を左右に配置
          alignItems: 'center', // カードの内部で要素を中央に配置
          }}
        >
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src="/broken-image.jpg" sx={{ width: 20, height: 20 }}/>
              <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'normal', color: '#333', marginLeft: '8px' }}>
                {trouble.name}
              </Typography>
            </div>
            <Typography variant="h4" align="left" style={{ fontFamily: 'Meiryo', fontSize: '30px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '10px'}}>
              {trouble.title}
            </Typography>
            <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'nomal', color: '#666' }}>
              最終更新日 {DateConvert(trouble.updated_date)} &nbsp;&nbsp; 投稿日 {DateConvert(trouble.created_date)}
            </Typography>
                
            <Divider style={{ width: '55vw', marginTop: '10px', marginBottom: '10px' }}/>

            <Typography variant="body1" align="left" style={{ fontFamily: 'Meiryo', fontSize: '16px', fontWeight: 'nomal', color: '#333' }}>
              {trouble.body}
            </Typography>  
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}


export default DetailCards;