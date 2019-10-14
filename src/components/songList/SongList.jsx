import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './SongList.scss'
import playerBtn from '../../images/playbtn.png'
class SongList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SongList: []
    }
  }

  componentWillMount() {
    console.log('歌曲数据》》》》》',this.props)
  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps,nextContext) {
    console.log('歌曲数据》》》》》',nextProps)
    let arrList = []
    // nextProps.list.map((item) => {
    //   return arrList.push(item)
    // })
    
    arrList.push(nextProps)
    this.setState({
      SongList: arrList
    })

  } 

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError() {}
  // 播放音乐
  handlePlay = (e) => {
    console.log(this.state.SongList)
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    Taro.navigateTo({
      url: '/pages/player/index?id=' + id + '&index=' + index
    })
  }
  render() {
    let list = this.props
    return (
      <View>
        {
          list.map((item,index) => {
            return <View className="listItem" key={item.id} data-id={item.id} data-index={index} onClick={this.handlePlay}>
              <View className="listItem-wrap">
                <View className="listItem-img">
                  <Image src={item.album.blurPicUrl || item.al.picUrl} style='width: 100%;height: 100%;border-radius: 10px'/>
                </View>
                <View className="listItem-content">
                  <View className="musicName">{item.name}</View>
                  <View className="musicPlayer">{item.artists[0].name || item.ar[0].name}</View>
                </View>
              </View>
              <View className="listItem-operation">
                <Image src={playerBtn} style='width: 100%;height: 100%;'></Image>
              </View>
            </View>
          })
        }
      </View> 
    )
  }
}

export default SongList