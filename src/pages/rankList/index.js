import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../utils/api'
class Test extends Component {
  constructor(props) {
    super(props)
  }

  config = {
    navigationBarTitleText: ''
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
      })
  }
 
  render() {
    return (
      <View>
        <Text> 排行榜 </Text>
      </View>
    )
  }
}

export default Test