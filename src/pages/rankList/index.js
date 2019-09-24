import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class Test extends Component {
  constructor(props) {
    super(props)
  }

  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError() {}

  render() {
    return (
      <View>
        <Text> 排行榜 </Text>
      </View>
    )
  }
}

export default Test