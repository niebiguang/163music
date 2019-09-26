import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import api from '../../utils/api'

export default class Player extends Component {

   config = {
       navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
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
    // this.getMusicDetail(id)
    this.getMusicWord(id)
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获得歌曲封面
  getMusicDetail(id) {
    let params = {
      id
    }
    api.get('/album',params)
    .then(res => {
      console.log('详情》》》》》',res.data)
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
  render() {
    return (
      <View>
        <Text>《歌曲名》</Text>
        <Audio
          src={this.state.musicUrl}
          controls={true}
          autoplay={false}
          loop={false}
          muted={true}
          initialTime='30'
          id='video'
        /> 
      </View>
    );
  }
}