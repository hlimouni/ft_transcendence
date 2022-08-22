import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { User } from '../../utils/interfaces';
import { style } from '@mui/system';
import IMGBACK from '../../../files/backgroungUsers.jpeg'
import Image from 'next/image';

export default function UserCard(props: User) {
    return (
        // <Card sx={{ minWidth: 240, Height: 200 }} style={{ margin: "20px" }}>
        //     <CardMedia className="user_image"
        //         component="img"
        //         height="200"
        //         image={props.image}
        //         // object-fit="contain"
        //         alt="user image"
        //         style={{borderRadius: '50%' }}
        //     />
        //     <CardContent style={{padding :"0 0 0 0px", textAlign: 'center'}}>
        //         <Typography gutterBottom variant="h6">
        //             {props.userName}
        //         </Typography>
        //     </CardContent>
        //     <CardActions style={{display: "flex", justifyContent:"center"}}>
        //         <Button size="small" color='success' variant="outlined" >Add Friend</Button>
        //         <Button size="small" color='error' variant="outlined">Block</Button>
        //     </CardActions>
        // </Card>

        <ul className='cards'>
            <li>
                <a href="" className="card">
                    <Image src={IMGBACK} className="card__image" />
                    <div className="card__overlay">
                        <div className="card__header">
                            <img className="card__thumb" src={`${props.image}`} />
                            <div className="card__header-text">
                                <h3 className="card__title">{props.userName}</h3>            
                                <span className="card__status">{props.isOnline ? "Online" : "Ofline"}</span>
                            </div>
                        </div>
                        <div className="card__description" style={{display: "flex"}}>
                            <Button className='btn_addF' size="small" color='success' variant="outlined" >Add Friend</Button>
                            <Button className='btn_block' size="small" color='error' variant="outlined">Block</Button>
                        </div>
                    </div>
                </a>      
            </li>
        </ul>

    );
}