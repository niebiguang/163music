import { PLAY_TYPE } from "../constants/play";

export const playTypeFun = (data) => {
  return {
    type: PLAY_TYPE,
    data: data
  }
}