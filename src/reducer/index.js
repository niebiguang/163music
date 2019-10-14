import { combineReducers } from "redux";
import play from './play'
import getMusicList from './getMusicList'

export default combineReducers({
  play,
  getMusicList
})