import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import * as React from 'react';


export default function MediaCard({item,candidateShow,
    isShow,
    setcandidateData}:any) {
    // console.log(item);
    
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
          {item?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item?.desc}
        </Typography>
        <span className='font-bold text-[12px]'>
          Resource Link: 
        <Typography variant="body2" color="text.secondary" component="a" href={item?.otherLink} target='_blank'>
          {item?.otherLink}
        </Typography>

        </span>
      </CardContent>
      <CardActions>
        <Button variant='contained' onClick={()=>{setcandidateData(item), candidateShow(true)}} size="small">View Candidates</Button>
      </CardActions>
    </Card>
  );
}