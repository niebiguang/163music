import Taro , { PureComponent } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './Gedan.scss'
class Gedan extends PureComponent {

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {
    // console.log(nextProps)
  } 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  handleNavigator = (e) => {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    Taro.navigateTo({
      url: '/pages/musicList/index?id=' + id
    })
  }
  render() {
    let list = this.props
    return (
      <View className="songList">
        {
          list.map((item) => {
            return <View className="listItem" key={item.id} data-id={item.id} onClick={this.handleNavigator}>
                <View className="listItem-img">
                  <Image src={item.picUrl || item.coverImgUrl} style='width: 100%;height: 100%;border-radius: 10px'></Image>
                </View>
                <Text className="listItem-text">{item.name}</Text>
            </View>
            
          })
        }
      </View>
    );
  }
}
export default Gedan;