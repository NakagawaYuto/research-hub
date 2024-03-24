import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import createAxiosInstance from '../createAxiosInstance';
import { useParams } from 'react-router-dom';


const DetailLogCards = ({ id }) => {
    const { user_id } = useParams();
    const detailURL = "todo/detail/?user=" + String(user_id);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const ax = createAxiosInstance();
        ax.get(detailURL)
            .then((response) => {
                console.log("GETのレスポンスのデータ (ここにデータはある): ", response.data);
                setDetails(response.data);
            })
            .catch((error) => {
                console.error("データの取得中にエラーが発生しました:", error);
            });
    }, []); // 空の配列を渡すことで、コンポーネントがマウントされた時のみ実行されます

    if (!details) return null;

    const details_for_this_blog = details.filter(detail => detail.department === id);

    return (
        <>
            <Grid container alignItems='center' justify='center' direction="column">
                {details_for_this_blog.map(blog => (
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
                                    {blog.detail_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" fontFamily='Meiryo'>
                                    {blog.detail_deadline}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default DetailLogCards;