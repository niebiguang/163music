import Taro , { PureComponent } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

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
    return (
      <View>
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