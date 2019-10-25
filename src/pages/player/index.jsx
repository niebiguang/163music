import Taro , { Component } from '@tarojs/taro';
import { View, Text , ScrollView} from '@tarojs/components';
import { AtSlider } from 'taro-ui'
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
      currentTime: '00:00', //当前时间
      duration: "00:00", //总时间
      progressPercent: 0, //百分比，控制宽度
      width: 0, //获取progress-line的宽度
      durationTime:0,//总时间，跳转指定位置使用
      songtext: '', //歌词
      activeIndex: 0, //控制高亮
      scrolltop: 0 //滚动距离
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
    this.playMusic(id)
    // console.log('duration>>>>>>>>>',backgroundAudioManager.duration)
    // console.log('currentTime>>>>>>>>>',backgroundAudioManager.currentTime)
    // 监听播放进度
    backgroundAudioManager.onTimeUpdate(() => {
      // console.log('currentTime>>>>>>>>',backgroundAudioManager.currentTime)
      let duration = backgroundAudioManager.duration
      let currentTime = backgroundAudioManager.currentTime
      this.timeupdate(currentTime,duration)
      this.controlHighLighted()
    })
    // 获取节点，获取progress-line宽度width
    
    backgroundAudioManager.onEnded(() => {
      // console.log('播放结束')
      this.setState({
        currentTime: 0
      })
      this.goLastSong()
    })
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {

  } 
  componentDidShow () {
    const query = Taro.createSelectorQuery().in(this.$scope).select('.progress-line')
    console.log(query)
    query.boundingClientRect(rect => {
          // rect.id      // 节点的 ID
          // rect.dataset // 节点的 dataset
          // rect.left    // 节点的左边界坐标
          // rect.right   // 节点的右边界坐标
          // rect.top     // 节点的上边界坐标
          // rect.bottom  // 节点的下边界坐标
          // rect.width   // 节点的宽度
          // rect.height  // 节点的高度
          console.log(rect)
        })
        .exec()
  } 
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
      },backgroundAudioManager.title = res.data.songs[0].name || '')
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
      },
      backgroundAudioManager.src = res.data.data[0].url || '')
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
      let musicWordList = res.data.lrc.lyric.split('\n')
      musicWordList = musicWordList.map(item => {
        let musicWordList1 = item.trim().substr(1).split(']')
        return {
          time: musicWordList1[0],
          text: musicWordList1[1]
        }
      })
      musicWordList.map(item => {
        item.time = item.time.substring(0,5)
        // console.log(item.time)
      })
      // console.log(musicWordList)
      this.setState({
        songtext: musicWordList
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
    // console.log(isPlaying)
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
    // console.log('musicUrl>>>>>>>>>>>',this.state)
    backgroundAudioManager.play()
    let duration = backgroundAudioManager.duration
    // let currentTime = backgroundAudioManager.currentTime
    // console.log('时间1》》》》》》》',currentTime,duration)
    this.props.changePlayType(true)
    let isPlaying = this.props.play.isPlaying
    // console.log(isPlaying)
    this.setState({
      isPlaying
    })
    // this.timeupdate(currentTime,duration)
    // this.controlHighLighted()
  }
  // 点击播放
  handlePlayMusic = ()=> {
    backgroundAudioManager.play()
    this.props.changePlayType(true)
    let isPlaying = this.props.play.isPlaying
    // console.log(isPlaying)
    this.setState({
      isPlaying
    })
    
  }
  // 下一首
  goLastSong = (e) => {
    // console.log(e)
    let index = Number(this.state.musicIndex) + 1
    this.setState({
      musicIndex: index
    })
    // console.log('索引》》》》》》》',index)
    let list = this.state.musicList
    // console.log(list[index])
    let id = list[index].id
    // console.log('id>>>>>',id)
    this.playMusic(id)
  }

  // 上一首
  goPrevSong = () => {
    // console.log(e)
    let index = Number(this.state.musicIndex) - 1
    this.setState({
      musicIndex: index
    })
    // console.log('索引》》》》》》》',index)
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
  // 化为时分秒
  formatMs2Obj(total) {
    var h = this.repairZero(Math.floor(total / 3600))
    var m = this.repairZero(Math.floor((total - h * 3600) / 60))
    var s = this.repairZero(Math.floor(total - h * 3600 - m * 60))
    //ES6 结构  h:h
    return {
      h,
      m,
      s
    }
  }
  /**
   * 补零
   */
  repairZero(num) {
    return num < 10 ? ("0" + num) : num
  }
 timeupdate(currentTime,duration) {
    // console.log('时间2》》》》》》》',currentTime,duration)
    var obj1 = this.formatMs2Obj(currentTime)
    var obj2 = this.formatMs2Obj(duration)
    var str1 = obj1.m + ":" + obj1.s
    var str2 = obj2.m + ":" + obj2.s
    
    // 
    if (this.state.currentTime !== str1) {
      // 更新当前时间
      this.setState({
        currentTime: str1,
        progressPercent: currentTime * 100 / duration
      })
    }
    // 赋值总时间，每次总时间一致不用赋值
    if (this.state.duration !== str2) {
      this.state.durationTime=duration//总时间
      this.setState({
        duration: str2
      })
    }
  }
  // 点击白色进度条任意位置，红色进度条到达点击处
  handleSeek = (e) => {
    // 获取当前位置
    // console.log(e)
    var offsetX = e.touches[0].pageX - e.currentTarget.offsetLeft
    // 获取当前位置站总宽度的百分比
    var p = offsetX / this.state.width
    // seek跳转至指定位置，
    // this.state.durationTime*p,获取位置百分比在总时间中的占比
    backgroundAudioManager.seek(this.state.durationTime*p)
  }
  //控制高亮
  controlHighLighted(e) {
    
     // 循环数组
    //  console.log(this.state.currentTime,this.state.songtext[i])
     for (var i = 0; i < this.state.songtext.length; i++) {
       // 当前播放时间等于数组time时activeIndex才改变值
       if (this.state.currentTime === this.state.songtext[i].time) {
         // 当activeIndex不等于i时更新，当songtext有值为空格时也不更新
         if (this.state.activeIndex !== i && this.state.songtext[i].text) {
           this.setState({
             activeIndex: i,
             scrolltop: 30 * (i - 5)
           })
           if (i > 5) {
             this.setState({
               // 此处的滚动距离可以为高度*i,到第5行在进行滚动
               scrolltop: 30 * (i - 5)
             })
           }
           break
         }
       }
     }
 }
  render() {
    // let al = this.state.songDetail[0].al && this.state.songDetail[0].al
    let al = this.state.songDetail[0].al
    if (!al) return
    return (
      <View className="pages">
        <Image src={al.picUrl} className="bgImg" style="width:100%;height:100%"></Image>
        <View class="body">
            {/* <!-- 封面 --> */}
            {/* <!-- 一开始onload时,showLyric=true, 显示为转动的图标，点击图标，切换为歌词--> */}
            <View class="sing-show" onClick={this.showLyric}>
              {
                !this.state.isShowLyric ? <View class={this.state.isPlaying ? 'moveCircle play' : 'moveCircle'}>
                <image src={al.picUrl} class={ this.state.isPlaying ? 'coverImg play' : 'coverImg'} />
              </ View> : <ScrollView class="middle" scrollY="true" scrollWithAnimation="true" scrollTop={scrolltop}>
                            {
                              this.state.songtext.map((item,index) => {
                                return <view class={this.state.activeIndex===index?'active text':'text'} key={item.time}>{item.text}</view>
                              })
                            }
                          </ScrollView>
              }
            </ View>
            {/* 进度条 */}
            <View class="footer">
              <View class="progress-bar">
                <View>{this.state.currentTime}</View>
                <View class="progress-line" onClick={this.handleSeek}> 
                  <View class="progress-bg"></View>
                  <View class="progress-red"></View>
                </View>
                {/* <AtSlider max={Number(this.state.duration)} backgroundColor="#fff" blockSize={14} activeColor="#542375" onChange={this.handleSeek}></AtSlider> */}
                <View>{this.state.duration}</View>
              </View>
            </View>
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