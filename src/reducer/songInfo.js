import { GET_SONG_INFO } from "../constants/songInfo";
const INITIAL_SONGINFO = {
  songInfo: {}
}

export default function songInfo(state = INITIAL_SONGINFO,actions) {
  switch (actions.type) {
    case GET_SONG_INFO:
      return {  
        ...state,
        songInfo: actions.data
      }
    default: 
      return state
  }
}