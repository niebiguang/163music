// import {PLAY_TYPE} from '../constants/play'

import { GET_MUSIC_LIST } from "../constants/getMusicList";
const INITIAL_MUSICLIST = {
  musicList: []
}

export default function getMusicList(state = INITIAL_MUSICLIST,actions) {
  switch (actions.type) {
    case GET_MUSIC_LIST:
      return {
        ...state,
        musicList: actions.data
      }
    default: 
      return state
  }
}