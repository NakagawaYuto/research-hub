import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useParams,useNavigate } from 'react-router-dom';
const detailURL = "http://127.0.0.1:8080/todo/detail/"


const Tododetail = ({ Target }) => {

  const navigate = useNavigate();
  var Cards = [];
  const [details, setDetails] = React.useState(null);
  axios.get(`${detailURL}`).then((response) => {
    setDetails(response.data);
   });
   if (details !== null){
    for (let i = 0; i < details.length; i++) {
      if(details[i].blog === Target){
        comments_for_this_blog.push(comments[i])
      }
    }
  }
  for (let i = 0; i < details.length; i++) {
    const detail = details[i]
    const title = blog.title;
    var deadline = blog.deadline;
    var done = blog.done;
    
    if(done==true){
      Cards.push(
        <Grid item key={blog.id}>
          <Card 
            sx={{ width: '50vw' }} 
            elevation={4} 
            style={{
              margin: 10,
            }}
          >
            <CardActionArea onClick={() => { }}>
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


export default Tododetail;