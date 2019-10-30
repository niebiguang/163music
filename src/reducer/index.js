import { combineReducers } from "redux";
import play from './play'
import getMusicList from './getMusicList'
import getSongInfo from './songInfo'

export default combineReducers({
  play,
  getMusicList,
  getSongInfo
})