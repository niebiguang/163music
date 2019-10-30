import { GET_SONG_INFO } from "../constants/songInfo";

export const getSongInfo = (data) => {
  return {
    type: GET_SONG_INFO,
    data: data
  }
}