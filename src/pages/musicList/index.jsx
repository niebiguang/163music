import Taro , { PureComponent } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

import './index.scss'
import playerBtn from '../../images/playbtn.png'
import api from '../../utils/api'
import { AtActivityIndicator } from 'taro-ui'
import SongList from '../../components/songList/SongList'
class MusicList extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      playlist: {},//歌单详情
      privileges: [],//歌曲详情id
      songList: [],//歌曲列表
      isLoadding: false
    }
  }
  // `${this.state.playlist.name}`
   config = {
       navigationBarTitleText: '歌曲列表'
  }

  componentWillMount () {}
  componentDidMount () {
    console.log(this.$router.params)
    let id = this.$router.params.id
    this.getMusicList(id)
    // this.getSongList()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获取歌单详情
  getMusicList(id) {
    let params = {
      id
    }
    api.get('/playlist/detail',params)
    .then(res => {
      console.log(res.data)
      this.setState({
        playlist: res.data.playlist,
        privileges: res.data.privileges
      },this.getSongList(res.data.privileges))
    })
  }
  // 获取歌曲列表
  getSongList(arr) {
    // let songId = this.state.privileges
    console.log(arr)
    let songId = arr.map((item) => {
      return item.id
    })
    console.log(songId)
    let params = {
      ids: songId.join(',')
    }
    console.log(params)
    api.get('/song/detail',params)
    .then(res => {
      console.log(res.data)
      this.setState({
        songList: res.data.songs,
        isLoadding: true
      })
    })
  }
  render() {
    // console.log(this.state.privileges)
    let songList = this.state.songList
    let playList = this.state.playlist
    return (
      <View>
        <View className='header'>
          <Image
            className='header__bg'
            src={playList.coverImgUrl+'?imageView&thumbnail=252x252'}
          />
          <View className='header__cover'>
            <Image
              className='header__cover__img'
              src={playList.coverImgUrl+'?imageView&thumbnail=252x252'}
            />
            <Text className='header__cover__desc'>歌单</Text>
            <View className='header__cover__num'>
              <Text className='at-icon at-icon-sound'></Text>
              {
                playList.playCount < 10000 ?
                playList.playCount :
                `${Number(playList.playCount/10000).toFixed(1)}万`
              }
            </View>
          </View>
          <View className='header__info'>
            <View className='header__info__title'>
            {playList.name}
            </View>
            <View className='header__info__user'>
              <Image
                className='header__info__user_avatar'
                src={playList.creator.avatarUrl+'?imageView&thumbnail=60x60'}
              />{playList.creator.nickname}
            </View>
          </View>
        </View>
        <View className='header--more'>
          <View className='header--more__tag'>
              标签：
              {
                playList.tags.map((tag, index) => <Text key={index} className='header--more__tag__item'>{tag}</Text>)
              }
              {
                playList.tags.length === 0 ? '暂无' : ''
              }
          </View>
          <View className='header--more__desc'>
            简介：{playList.description || '暂无'}
          </View>
        </View>
        {/* <View className='play-wrapper' onClick={this.playAll.bind(this)}></View> */}
        <View className='play-wrapper'>
          <Image src={playerBtn} style="width:22px;height:24px;margin-right:20px"></Image>
          <Text className='left-text'>播放全部</Text>
          <Text className='left-text-sub'>(共{playList.tracks.length}首)</Text>
        </View>
        {
          !this.state.isLoadding ? <View className="loadding">
            <AtActivityIndicator content='加载中...' size={42} color='#542375' />
          </View> : null
        }
        <SongList {...songList}></SongList>
      </View>
    );
  }
}
export default MusicList;