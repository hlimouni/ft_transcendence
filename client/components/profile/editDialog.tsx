import React, { useContext } from 'react'
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
import { themeOptions } from '../../unity';

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
                    src={state.mainUser.image}
                    sx={{width: '80px', height: '80px'}}
                />
                <Button variant="outlined" sx={{padding: '1em 1.8em', color: 'white'}} component="label" endIcon={<FileUploadRoundedIcon/>}>
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                {/* <Button sx={{padding: '1em 1.8em'}} variant='contained'>
                    Upload Photo
                </Button> */}
            </DialogActions>

        </DialogContent>
        <DialogContent sx={{paddingTop: '0'}}>
        <DialogContentText sx={{fontSize: '.8em', paddingBottom: '1rem'}}>
              Username
          </DialogContentText>
          <TextField
            margin="none"
            id="name"
            spellCheck="false"
            variant="outlined"
            defaultValue={state.mainUser.userName}
          />
        </DialogContent>
        <DialogContent sx={{paddingTop: '0'}}>
          <DialogContentText sx={{fontSize: '.8em', paddingBottom: '1rem'}}>
              Two Factor Authentication
          </DialogContentText>
          <IOSSwitch/>
        </DialogContent>
        <DialogActions sx={{padding: '1em'}}>
            <Button variant='contained' sx={{padding: '1em 1.8em'}} onClick={handleClose}>Apply Settings</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
