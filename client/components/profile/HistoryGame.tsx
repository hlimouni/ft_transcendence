import ProfileStyle from '../../styles/Profile.module.css'
import Avatar from '@mui/material/Avatar'
import { Chip, Typography } from '@mui/material';

const HistoryGame = ({ game }: {game: any}) => {

  return (
    <div className={ProfileStyle.historyGame}>
        <div style={{display: 'flex'}}>
          <Chip sx={{width: '8em', margin: 'auto', paddingRight: '2em', zIndex: '7'}} variant='outlined' label={game.firstPlayerUserName}/>
          <Avatar sx={{zIndex: '50', width: '70px', height: '70px', margin: 'auto 0', marginLeft: '-30px' }} alt={game.firstPlayerUserName} src={game.firstPlayerImage}/>
          </div>
            <Typography sx={{margin: 'auto'}} variant='h3' color='primary'>{game.scoreFirst} : {game.scoreSecond}</Typography>
        <div style={{display: 'flex'}}>
          <Avatar sx={{ zIndex: '50', width: '70px', height: '70px', margin: 'auto 0', marginRight: '-30px'}} alt={game.secondPlayerUserName} src={game.secondPlayerImage}/>
          <Chip sx={{width: '8em', margin: 'auto', paddingLeft: '2em', zIndex: '7'}} variant='outlined' label={game.secondPlayerUserName}/>
        </div>
    </div>
  )
}

export default HistoryGame