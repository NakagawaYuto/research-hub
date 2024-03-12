import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';


const BlogCards = ({ Blogs, Target }) => {
  const navigate = useNavigate();
  var Cards = [];
  for (let i = 0; i < Blogs.length; i++) {
    const blog = Blogs[i]
    const title = blog.title;
    var deadline = blog.deadline;
    var done = blog.done;
    
    if(done==false){
      Cards.push(
        <Grid item key={blog.id}>
          <Card 
            sx={{ width: '50vw' }} 
            elevation={4} 
            style={{
              margin: 10,
            }}
          >
            <CardActionArea onClick={() => { Target(blog.id);}}>
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


export default BlogCards;