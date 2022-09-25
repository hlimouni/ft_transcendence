import Image from "next/image";
import TextField from '@mui/material/TextField';
import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import axios from "axios";

const TwoFa = `${process.env.SERVER_HOST}/2fa/generate`;

export default function TwoFaGenerate(props: any) {
   const [twofaImage, setTwofaImage ] = useState<any>(null);


   useEffect(() => {
     axios.get(TwoFa, { withCredentials : true}).then(({data}) => {
       setTwofaImage(data)
     })
   }, [])
    
    return (
        <div className="TwoFa">
            { twofaImage ? <Image
                loader={() => TwoFa}
                src={TwoFa}
                layout='fixed'
                width={150}
                height={150}
              />
              : <p>stafzok</p>
            }

            <TextField
                id="outlined-basic"
                label="Code"
                variant="outlined"
                sx={{width:'150px', margin:'10px'}}
                onChange={(e) => props.setCode(e.target.value)}
              />
        </div>
    )
}