import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../utils/api'

import SongList from '../../components/songList/SongList'
class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommendList: []//每日推荐歌曲
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
            recommendList: res.data.recommend
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
        <SongList {...recommendList} />
      </View>
    )
  }
}

export default Test