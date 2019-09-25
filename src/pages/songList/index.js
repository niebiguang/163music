import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import Gedan from '../../components/gedan/Gedan'
// import Loadding from '../../components/lodding/Loadding'
import { AtActivityIndicator } from 'taro-ui'
import './index.scss'
import api from '../../utils/api'
class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagList: [],//分类列表
      playlist: [],//歌单列表
      tabIndex: 0,
      tagName: '',
      isLoadding: false
    }
  }

  config = {
    navigationBarTitleText: '歌单广场'
  }

  componentWillMount() {}

  componentDidMount() {
    this.getPlayList()
    this.getCatList()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError() {}
  // 获取歌单分类
  getCatList() {
    api.get('/playlist/hot')
      .then(res => {
        console.log(res.data)
        this.setState({
          tagList: res.data.tags
        })
      })
  }
  // 获取歌单列表
  getPlayList(tag) {
    let params = {
      cat:tag || ''
    }
    api.get('/top/playlist',params)
      .then(res => {
        console.log(res.data)
        this.setState({
          playlist: res.data.playlists,
          isLoadding: true
        })
      })
  }
  // 点击tab
  handleClick(e) {
    console.log(e.target.dataset)
    this.setState({
      tabIndex: e.target.dataset.index ,
      tagName: e.target.dataset.tag,
      isLoadding: false
    })
    this.getPlayList(e.target.dataset.tag)
  }
  render() {
    let tagList = this.state.tagList
    let playlist = this.state.playlist
    let tabIndex = this.state.tabIndex
    return (
      <View className="pages">
        <View className="tabList">
          <View className="itemContent">
            <View className={tabIndex == 0 ? 'listItem active' : 'listItem'} data-index='0' onClick={this.handleClick}>推荐</View>
            {
              tagList.map((item, index) => {
                return <View className={tabIndex == index+1 ? 'listItem active' : 'listItem'} 
                        key={item.id} 
                        data-index={index+1} 
                        data-tag={item.name} 
                        onClick={this.handleClick}>
                      {item.name}</View>
              })
            }
          </View>
        </View>
        {/* 歌单 */}
        {
          !this.state.isLoadding ? <View className="loadding">
            <AtActivityIndicator content='加载中...' size={42} color='#542375' />
          </View> : null
        }
        <Gedan {...playlist}></Gedan>
      </View>
    )
  }
}

export default Test