import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './SongList.scss'
import playerBtn from '../../images/playbtn.png'
class SongList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError() {}

  render() {
    let list = this.props
    return (
      <View>
        {
          list.map((item) => {
            return <View className="listItem">
              <View className="listItem-wrap">
                <View className="listItem-img">
                  <Image src={item.album.blurPicUrl} style='width: 100%;height: 100%;border-radius: 10px'/>
                </View>
                <View className="listItem-content">
                  <View className="musicName">{item.name}</View>
                  <View className="musicPlayer">{item.artists[0].name}</View>
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