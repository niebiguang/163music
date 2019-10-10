import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import api from '../../utils/api'
import './index.scss'

import prev from '../../images/shangyishou.png'
import next from '../../images/xiayishou.png'
import paly from '../../images/bofang.png'
import stop from '../../images/zanting.png'

const backgroundAudioManager = Taro.getBackgroundAudioManager()

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
      isPlaying: false,//是否播放
      isShowLyric: false,//是否显示歌词
    }
  }

  componentWillMount () {
    // backgroundAudioManager.src = this.state.musicUrls
  }
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
    // backgroundAudioManager.title = name
    // backgroundAudioManager.coverImgUrl = al.picUrl
    // backgroundAudioManager.src = this.state.musicUrl
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
      Taro.setNavigationBarTitle({
        title: res.data.songs[0].name
      })
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
      // backgroundAudioManager.src = res.data.data[0].url
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
  // 暂停
  pauseMusic = ()=> {
    backgroundAudioManager.pause()
    this.setState({
      isPlaying: false
    })
  }
  // 播放
  playMusic = ()=> {
    console.log('aa')
    backgroundAudioManager.play()
    backgroundAudioManager.src = this.state.musicUrl
    backgroundAudioManager.title = this.state.songDetail[0].name
    // backgroundAudioManager.coverImgUrl = al.picUrl
    this.setState({
      isPlaying: true
    })
  }
  //显示歌词
  showLyric = () => {
    this.setState ({
      isShowLyric: true
    })
  }
  render() {
    // let al = this.state.songDetail[0].al && this.state.songDetail[0].al
    let al = this.state.songDetail[0].al
    if (!al) return
    return (
      <View className="pages">
        <Image src={al.picUrl} className="bgImg" style="width:100%;height:100%"></Image>
        <View class="body">
          {/* <!-- 歌名歌手 --> */}
            <View class="sing-brief">
              <View class="sing-name">{this.state.songDetail[0].name}</View>
              <View class="singer-name">
                {
                  this.state.songDetail.ar.map((item,index) => {
                    return <text key={index} class="singer-name-text">{item.name}</text>
                  })
                }
                
              </ View>
            </ View>
            {/* <!-- 封面 --> */}
            {/* <!-- 一开始onload时,showLyric=true, 显示为转动的图标，点击图标，切换为歌词--> */}
            <View class="sing-show" onClick={this.showLyric}>
              {
                this.state.musicWord ? <View class={this.state.isPlaying ? 'moveCircle play' : 'moveCircle'}>
                <image src={al.picUrl} class={ this.state.isPlaying ? 'coverImg play' : 'coverImg'} />
              </ View> : <text class="songLyric">纯音乐，请欣赏</text>
              }
            </ View>
            {/* <!-- 暂停播放图标 --> */}
            <View class="play_suspend">
              <View class="icon_playing "><image src={prev} class=" icon_play" bindtap="go_lastSong" /></View>
              <View class="icon_playing">
                {
                  !this.state.isPlaying ? <View onClick={this.playMusic}><image src={paly} class="{{'img_play_suspend'}}" /></View>
                  : <View onClick={this.pauseMusic}><image src={stop} hidden="{{isPlay}}" class="{{'img_play_suspend'}}" /></View>
                }
                
                
                {/* <image onClick={this.pauseMusic} src={stop} hidden="{{isPlay}}" class="{{'img_play_suspend'}}" /> */}
              </View> 
              <View class="icon_playing "><image src={next} class=" icon_play" bindtap="go_lastSong" /></View>
            </ View>
          </ View>
        {/* <button onClick={this.handleClick}>点击</button> */}
      </View>
    );
  }
}