import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import api from '../../utils/api'
import './index.scss'
import {connect} from '@tarojs/redux'
import { playTypeFun } from '../../action/paly'

import prev from '../../images/shangyishou.png'
import next from '../../images/xiayishou.png'
import paly from '../../images/bofang.png'
import stop from '../../images/zanting.png'
// import { dispatch } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/observable/pairs';

const backgroundAudioManager = Taro.getBackgroundAudioManager()

@connect (({ play }) => ({
  play
}), (dispatch) => ({
  changePlayType(data) {
    dispatch(playTypeFun(data))
  }
}))

@connect (({ getMusicList }) => ({
  getMusicList
}))

export default class Player extends Component {

   config = {
       navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      musicList: [],//当前播放歌曲所在歌曲列表
      musicIndex: '',//当前播放歌曲所在歌曲列表的index
      songDetail: [],//歌曲详情
      musicUrl:'',//歌曲播放地址
      musicWord: '',//歌词
      commentList: [],//评论列表
      hotCommentList: [],//热门评论列表
      isPlaying: false,//是否播放
      isShowLyric: false,//是否显示歌词
      musicId: '',//当前歌曲id
    }
  }

  componentWillMount () {
    // backgroundAudioManager.src = this.state.musicUrls
    this.setState({
      musicList: this.props.getMusicList.musicList
    })
  }
  componentDidMount () {
    console.log('参数》》》》》》',this.$router.params)
    this.setState({
      musicIndex: this.$router.params.index,
      musicId: this.$router.params.id
    })
    let id = this.$router.params.id

    // this.getMusicUrl(id)
    // this.getMusicComment(id)
    // this.getMusicDetail(id)
    // this.getMusicWord(id)
    this.playMusic(id)
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
      // console.log('详情》》》》》',res.data)
      Taro.setNavigationBarTitle({
        title: res.data.songs[0].name
      })
      this.setState({
        songDetail: res.data.songs
      },backgroundAudioManager.title = res.data.songs[0].name)
    })
  }
  // 获取音乐url
  getMusicUrl(id) {
    let params = {
      id
    }
    api.get('/song/url',params)
    .then(res => {
      // console.log('URL》》》》》',res.data)
      // backgroundAudioManager.src = res.data.data[0].url
      this.setState({
        musicUrl: res.data.data[0].url
      },backgroundAudioManager.src = res.data.data[0].url)
    })
  }
  // 获取歌词
  getMusicWord(id) {
    let params = {
      id
    }
    api.get('/lyric',params)
    .then(res => {
      // console.log('歌词》》》》》',res.data)
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
      // console.log('评论》》》》》',res.data)
      this.setState({
        commentList: res.data.comments,
        hotCommentList: res.data.hotComments
      })
    })
  }
  // 暂停
  pauseMusic = ()=> {
    backgroundAudioManager.pause()
    this.props.changePlayType(false)
    let isPlaying = this.props.play.isPlaying
    console.log(isPlaying)
    this.setState({
      isPlaying
    })
  }
  // 播放歌曲
  playMusic(id) {
    this.getMusicUrl(id)
    this.getMusicDetail(id)
    this.getMusicComment(id)
    this.getMusicWord(id)
    console.log('musicUrl>>>>>>>>>>>',this.state)
    backgroundAudioManager.play()
    this.props.changePlayType(true)
    let isPlaying = this.props.play.isPlaying
    console.log(isPlaying)
    this.setState({
      isPlaying
    })
    BackgroundAudioManager.onEnded(() => {
      console.log('播放结束')
      this.goLastSong()
    })
  }
  // 点击播放
  handlePlayMusic = ()=> {
    backgroundAudioManager.play()
    this.props.changePlayType(true)
    let isPlaying = this.props.play.isPlaying
    console.log(isPlaying)
    this.setState({
      isPlaying
    })
    BackgroundAudioManager.onEnded(() => {
      console.log('播放结束')
      this.goLastSong()
    })
  }
  // 下一首
  goLastSong = (e) => {
    console.log(e)
    let index = Number(this.state.musicIndex) + 1
    this.setState({
      musicIndex: index
    })
    console.log('索引》》》》》》》',index)
    let list = this.state.musicList
    console.log(list[index])
    let id = list[index].id
    console.log('id>>>>>',id)
    this.playMusic(id)
  }

  // 上一首
  goPrevSong = () => {
    // console.log(e)
    let index = Number(this.state.musicIndex) - 1
    this.setState({
      musicIndex: index
    })
    console.log('索引》》》》》》》',index)
    let list = this.state.musicList
    // console.log(list[index])
    let id = list[index].id
    this.playMusic(id)
  }

  //显示歌词
  showLyric = () => {
    // console.log('props>>>>>>>',this.props)
    // this.props.changePlayType(true)
    this.setState ({
      isShowLyric: !this.state.isShowLyric
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
                !this.state.isShowLyric ? <View class={this.state.isPlaying ? 'moveCircle play' : 'moveCircle'}>
                <image src={al.picUrl} class={ this.state.isPlaying ? 'coverImg play' : 'coverImg'} />
              </ View> : <text class="songLyric">{this.state.musicWord}</text>
              }
            </ View>
            {/* <!-- 暂停播放图标 --> */}
            <View class="play_suspend">
              <View class="icon_playing " onClick={this.goPrevSong}><image src={prev} class=" icon_play" /></View>
              <View class="icon_playing">
                {
                  !this.state.isPlaying ? <View onClick={this.handlePlayMusic}><image src={paly} class="{{'img_play_suspend'}}" /></View>
                  : <View onClick={this.pauseMusic}><image src={stop} hidden="{{isPlay}}" class="{{'img_play_suspend'}}" /></View>
                }
                
                
                {/* <image onClick={this.pauseMusic} src={stop} hidden="{{isPlay}}" class="{{'img_play_suspend'}}" /> */}
              </View> 
              <View class="icon_playing " onClick={this.goLastSong}><image src={next} class=" icon_play" /></View>
            </ View>
          </ View>
        {/* <button onClick={this.goLastSong}>点击</button> */}
      </View>
    );
  }
}