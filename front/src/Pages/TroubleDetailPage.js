import * as React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import CommentCards from '../Components/CommentCards';



const TroubleDetailPage = () => {
  // パラメータから値を取得する.
  const params = useParams();
  const [trouble, setTrouble] = React.useState(null);
  //const [comment, setComments] = React.useState(null);
  const baseURL = "http://127.0.0.1:8080/trouble/" + String(params.id) + "/"

  React.useEffect(() => 
    {
      axios.get(baseURL).then((response) => {
        setTrouble(response.data);
        //setComments(response.comments);
      });
    }, []);
  if (!trouble) return null;
  return (
    <>
      <Grid container alignItems='center' justify='center' direction="column">
        <Grid item>
          <Typography variant="h3" gutterBottom style={{ margin: 20, fontFamily:'serif' }}>
            {trouble.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" style={{ marginBottom: 15, fontFamily:'serif' }} >
            {trouble.name}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: 15, fontFamily:'serif' }} >
            {trouble.body}
          </Typography>
        </Grid>

      </Grid>

      <CommentCards comments={trouble.comments} />

    </>
  );
};


export default TroubleDetailPage;