import Image from "next/image";
import TextField from '@mui/material/TextField';
import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import axios from "axios";

export default function TwoFaGenerate() {
    const [Code, setCode] = useState<any>();
    const TwoFa = `${process.env.SERVER_HOST}/2fa/generate`;

    function CheckCode() {
        try {
            axios
                .post(
                    `${process.env.SERVER_HOST}/2fa/turnOn`,
                    { twoFactorAuthenticationCode: Code },
                    { withCredentials: true, }
                )
            console.log("code send!", Code)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="TwoFa">
            <Image
                loader={() => TwoFa}
                src={TwoFa}
                layout='fixed'
                width={150}
                height={150}
              />

            <TextField
                id="outlined-basic"
                label="Code"
                variant="outlined"
                sx={{width:'150px', margin:'10px'}}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={CheckCode}
              >
                Active
            </Button>
        </div>
    )
}