import Taro , { PureComponent } from '@tarojs/taro';
import { View} from '@tarojs/components';
import './Loadding.scss'

class Loadding extends PureComponent {


  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  render() {
    return (
      <View>
        <View class="loadEffect">
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
      </View>
    );
  }
}
export default Loadding;