import {PLAY_TYPE} from '../constants/play'

const INITIAL_STATE = {
  isPlaying: false
}

export default function play(state = INITIAL_STATE,actions) {
  switch (actions.type) {
    case PLAY_TYPE:
      return {
        ...state,
        isPlaying: actions.data
      }
    default: 
      return state
  }
}