import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import * as React from 'react';


export default function MediaCard({item,candidateShow,
    isShow,
    setcandidateData}:any) {
    console.log(item);
    
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
        avatar={
            <Avatar alt="Remy Sharp" src={item?.user?.imageURL} />
        }
        
        title={`Assign By ${item?.user?.userName}`} 
        subheader={`Total TurnIN Students => ${item?.turnIn?.length}`}
      />
      <CardMedia
        sx={{ height: 140 }}
        image={item?.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Visit</Button>
        <Button onClick={()=>{setcandidateData(item), candidateShow(true)}} size="small">View Candidates</Button>
      </CardActions>
    </Card>
  );
}