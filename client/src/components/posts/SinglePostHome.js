import React from 'react'
import { Typography, Grid, CardContent, Card, CardActions, Button, Divider } from '@material-ui/core';
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function SinglePostHome() {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:4000/api/posts/" + id)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data); 
      })
      .catch((err) => console.log(err));
  }, [id]);


    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={8} lg={8} classname=''>

                <Card className='single'>
                    <CardContent>
                        <Typography classname='single-title' variant="h3" gutterBottom>
                            {post?.title}
                        </Typography>
                        <Divider />
                        <img src={post?.image} className='single-img'/>
                        <Typography variant="body1" gutterBottom>
                            {post?.body}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                    </Card>
            </Grid>

            <Grid className='other-div' item sm={12} md={4} lg={4}>
                Other section
            </Grid>
            
        </Grid>
            
        
    )
}

export default SinglePostHome
