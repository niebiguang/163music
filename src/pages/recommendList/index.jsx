import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../utils/api'

import { AtActivityIndicator } from 'taro-ui'
import SongList from '../../components/songList/SongList'
import Loadding from '../../components/lodding/Loadding'
class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommendList: [],//每日推荐歌曲
      isLoadding: false
    }
  }

  config = {
    navigationBarTitleText: '每日推荐'
  }

  componentWillMount() {} 

  componentDidMount() {
    api.get('/recommend/songs')
      .then(res => {
        // console.log(res.data)
        if(res.data.code == 200) {
          this.setState({
            recommendList: res.data.recommend,
            isLoadding: true
          })
        }
      })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError() {}

  render() {
    let recommendList = this.state.recommendList
    return (
      <View>
        {
          !this.state.isLoadding ? <View className="loadding">
            <AtActivityIndicator content='加载中...' size={42} color='#542375' />
          </View> : null
        }
        <SongList {...recommendList} />
      </View>
    )
  }
}

export default Test