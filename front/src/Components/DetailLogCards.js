import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const detailURL = "http://127.0.0.1:8080/todo/detail/"


const DetailLogCards = ({ Details,id }) => {
    const [details, setDetails] = React.useState(null);
    const details_for_this_blog = []
    axios.get(`${detailURL}`).then((response) => {
        console.log("GETのレスポンスのデータ (ここにデータはある): ", response.data);
        setDetails(response.data);
        console.log("setDetail直後のdetails (まだデータが入ってない, setは速度遅め) : ", details);
      });
      if (!details) return null;
      if (details !== null){
        for (let i = 0; i < details.length; i++) {
          if(details[i].department === id){
            details_for_this_blog.push(details[i])
          }
        }
      }
      else{
        console.log("details null!  ここの実行が早い.");
      }
    
   
  
//   const navigate = useNavigate();
  var Cards = [];
  for (let i = 0; i < details.length; i++) {
    const blog = details[i]
    const title = blog.detail_title;
    var deadline = blog.detail_deadline;
    var done = blog.done;
    var department = blog.department;
    
    if(done==true && department==id){
      Cards.push(
        <Grid item key={blog.id}>
          <Card 
            sx={{ width: '40vw' }} 
            elevation={4} 
            style={{
              margin: 10,
            }}
          >
            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily='Meiryo'>
                  { title }
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily='Meiryo'>
                  { deadline }
                </Typography>
                
              </CardContent>
            
          </Card>
        </Grid>
      );
    }
   
    
  }
  return (
    <>
      <Grid container alignItems='center' justify='center' direction="column">
        { Cards }
      </Grid>

      
    </>
  )
}


export default DetailLogCards;