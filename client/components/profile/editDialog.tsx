import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from '../../context/AppContext';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ProfileStyle from '../../styles/Profile.module.css'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import TwoFaGenerate from './TwoFaGenerate';

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '200ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

interface Props {
    openState: boolean;
    closeHandler: () => void;
}

export default function EditDialog(props: Props) {
    const handleClose = props.closeHandler;
    const open = props.openState;
    const { state } = useContext(AppContext);
    const [code, setCode] = useState<any>();
    const [userName, setUserName] = useState(state.mainUser.userName);
    const [userImage, setUserImage] = useState(state.mainUser.image);
    const [modalImage, setModalImage] = useState(state.mainUser.image);
    const [is2fa, setIs2fa] = useState(state.mainUser.isTwoFactorAuthenticationEnabled);


    const handleSwitch = () => {
      setIs2fa(!is2fa);
    };

    useEffect(() => {
      setModalImage(state.mainUser.image);
    }, []);
    const handleSubmit = () => {
      console.log("validation code: ", code);
      let isCodeCorrect = true;
      console.log("switch!!!",is2fa,"twofac:",state.mainUser.isTwoFactorAuthenticationEnabled);
      if (is2fa !== state.mainUser.isTwoFactorAuthenticationEnabled) {
        console.log("switch!!!")
        if (is2fa === true) {
            axios
              .post(
                  `${process.env.SERVER_HOST}/2fa/turnOn`,
                  { twoFactorAuthenticationCode: code },
                  { withCredentials: true, }
              ).then((res) => {
                state.eventsSocket.emit(
                  "I_UPDATE_MY_PROFILE",
                  state.mainUser.id
                );
                  isCodeCorrect = true;
                  console.log("code send!", code);
              }).catch ((e) => {
                isCodeCorrect = false;
                alert("wrong code");
                console.log(e.response.data.message);
              })
        } else {
          console.log("turned offhhh")
          axios
          .post(
              `${process.env.SERVER_HOST}/2fa/turnOff`, {},
              { withCredentials: true, }
          ).then((res) => {
            state.eventsSocket.emit(
              "I_UPDATE_MY_PROFILE",
              state.mainUser.id
            );
              console.log("turned off")
          }).catch ((e) => {
            console.log("turned off error!!")
              console.log(e.response.data.message);
          })     
        }
      }
      if (userImage !== state.mainUser.image) {
        const formData = new FormData();
  
        formData.append("file", userImage);
        axios
          .post(`${process.env.SERVER_HOST}/users/updateAvatar`, formData, {
            withCredentials: true,
          })
          .then((res) => {
            state.eventsSocket.emit(
              "I_UPDATE_MY_PROFILE",
              state.mainUser.id
            );
            console.log("update avatar : ", res);
          });
      }
      if (userName != state.mainUser.userName) {
        axios
          .post(
            `${process.env.SERVER_HOST}/users/updateUserName`,
            { givenUserName: userName },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("update userName :", res);
            state.eventsSocket.emit(
              "I_UPDATE_MY_PROFILE",
              state.mainUser.id
            );
          });
      }
      { isCodeCorrect && handleClose() }
    };


  return (
    <div hidden>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className={ProfileStyle.modal_title}>
            <DialogTitle sx={{p: '0'}}>Profile Settings</DialogTitle>
            <IconButton onClick={handleClose}>
              <ClearIcon/>
            </IconButton>
        </DialogContent>
        <DialogContent>
            <DialogContentText sx={{fontSize: '.8em'}}>
                  Your Avatar
            </DialogContentText>
            <DialogActions sx={{p: '0'}} disableSpacing={true} className={ProfileStyle.modal_avatar}>
                <Avatar
                    alt={state.mainUser.userName}
                    src={modalImage}
                    sx={{width: '80px', height: '80px'}}
                />
                <Button variant="outlined" sx={{padding: '1em 1.8em', color: 'white'}} component="label" endIcon={<FileUploadRoundedIcon/>}>
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      if (
                        event.target.files &&
                        event.target.files[0]
                      ) {
                        setUserImage(event.target.files[0]);
                        let imageUrl: File =
                          event.target.files[0];
                        URL.createObjectURL(imageUrl);
                        setModalImage(
                          URL.createObjectURL(imageUrl)
                        );
                      }
                    }} />
                </Button>
            </DialogActions>

        </DialogContent>
        <DialogContent sx={{paddingTop: '0'}}>
        <DialogContentText sx={{fontSize: '.8em', paddingBottom: '1rem'}}>
              Username (8 characters max)
          </DialogContentText>
          <TextField
            inputProps={{ maxLength: 8 }}
            margin="none"
            id="name"
            spellCheck="false"
            variant="outlined"
            defaultValue={state.mainUser.userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </DialogContent>
        <DialogContent sx={{paddingTop: '0'}}>
          <DialogContentText sx={{fontSize: '.8em', paddingBottom: '1rem'}}>
              Two Factor Authentication
          </DialogContentText>
          <IOSSwitch checked={is2fa} onChange={handleSwitch}/>
          {is2fa && !state.mainUser.isTwoFactorAuthenticationEnabled && <TwoFaGenerate setCode={setCode}/>}
        </DialogContent>
        <DialogActions sx={{padding: '1em'}}>
            <Button variant='contained' sx={{padding: '1em 1.8em'}} onClick={handleSubmit}>Apply Settings</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
