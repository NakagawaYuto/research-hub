import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';


const DetailCards = ({ Details,id }) => {
  const navigate = useNavigate();
  var Cards = [];
  for (let i = 0; i < Details.length; i++) {
    const blog = Details[i]
    const title = blog.detail_title;
    var deadline = blog.detail_deadline;
    var done = blog.done;
    var department = blog.department;
    
    if(done==false && department==id){
      Cards.push(
        <Grid item key={blog.id}>
          <Card 
            sx={{ width: '50vw' }} 
            elevation={4} 
            style={{
              margin: 10,
            }}
          >
            <CardActionArea onClick={() => {}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  { title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  { deadline }
                </Typography>
                
              </CardContent>
            </CardActionArea>
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


export default DetailCards;