import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../utils/api'
import './index.scss'
class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rankList: [],//全部榜单列表
      artistToplist:{}//歌手榜

    }
  }

  config = {
    navigationBarTitleText: '排行榜'
  }

  componentWillMount() {}

  componentDidMount() {
    this.getTopList()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError() {}
  // 获取排行列表
  getTopList(){
    api.get('/toplist')
      .then(res => {
        console.log(res.data)
        this.setState({
          rankList: res.data.list,
          artistToplist: res.data.artistToplist
        })
      })
  }
 
  render() {
    let list = this.state.rankList
    console.log(list)
    if(!list) return
    return (
      <View>
        {/* <Text> 排行榜 </Text> */}
        {/* <View className="artistToplist">
          <Image src="http://p2.music.126.net/MJdmNzZwTCz0b4IpHJV6Wg==/109951162865487429.jpg" mode="scaleToFill" style="width:100%;"></Image>
        </View> */}
        <View className="songList">
        {
          list.map((item) => {
            return <View className="listItem" key={item.id} data-id={item.id} onClick={this.handleNavigator}>
                <View className="listItem-img">
                  <Image src={item.coverImgUrl} style='width: 100%;height: 100%;border-radius: 10px'></Image>
                </View>
                <Text className="listItem-text">{item.name}</Text>
            </View>
            
          })
        }
      </View>
      </View>
    )
  }
}

export default Test