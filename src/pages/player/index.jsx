import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import api from '../../utils/api'
import './index.scss'

import prev from '../../images/shangyishou.png'
import next from '../../images/xiayishou.png'
import paly from '../../images/bofang.png'
import stop from '../../images/zanting.png'

export default class Player extends Component {

   config = {
       navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      songDetail: [],//歌曲详情
      musicUrl:'',//歌曲播放地址
      musicWord: '',//歌词
      commentList: [],//评论列表
      hotCommentList: [],//热门评论列表
    }
  }

  componentWillMount () {}
  componentDidMount () {
    console.log(this.$router.params)
    let id = this.$router.params.id
    this.getMusicUrl(id)
    this.getMusicComment(id)
    this.getMusicDetail(id)
    this.getMusicWord(id)
    // const audioCtx = Taro.createAudioContext()
    // audioCtx.autoplay = true
    // audioCtx.loop = false
    // audioCtx.src = this.state.musicUrl
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获得歌曲详情
  getMusicDetail(id) {
    let params = {
      ids: id
    }
    api.get('/song/detail',params)
    .then(res => {
      console.log('详情》》》》》',res.data)
      this.setState({
        songDetail: res.data.songs
      })
    })
  }
  // 获取音乐url
  getMusicUrl(id) {
    let params = {
      id
    }
    api.get('/song/url',params)
    .then(res => {
      console.log('URL》》》》》',res.data)
      this.setState({
        musicUrl: res.data.data[0].url
      })
    })
  }
  // 获取歌词
  getMusicWord(id) {
    let params = {
      id
    }
    api.get('/lyric',params)
    .then(res => {
      console.log('歌词》》》》》',res.data)
      this.setState({
        musicWord: res.data.lrc.lyric
      })
    })
  }
  // 获得歌曲评论
  getMusicComment(id) {
    let params = {
      id,
      limit: 20
    }
    api.get('/comment/music',params)
    .then(res => {
      console.log('评论》》》》》',res.data)
      this.setState({
        commentList: res.data.comments,
        hotCommentList: res.data.hotComments
      })
    })
  }
  // 暂停播放
  // handlePlay = (e) => {
  //   console.log('aaa')
  //   backgroundAudioManager.pause(() => {
  //     console.log('暂停播放')
  //   })
  // }
  handleClick = () => {
    console.log('aaaa')
  }
  render() {
    return (
      <View>
        <button onClick={this.handleClick}></button>
      </View>
    );
  }
}