import { GET_MUSIC_LIST } from "../constants/getMusicList";

export const getMusicList = (data) => {
  return {
    type: GET_MUSIC_LIST,
    data: data
  }
}