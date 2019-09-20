import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import { AtButton } from 'taro-ui'
// 引入图片
import bgImg from '../../images/timg.jpg'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的云村',
    navigationBarBackgroundColor: "#542375",
    navigationBarTextStyle: "white",
    backgroundColor: "#eeeeee",
    backgroundTextStyle: "light"
  }

  constructor(props) {
    super()
  }

  handleClick = (e) => {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {/* <Image ></Image> */}
        <Image
          style='width: 100%;height: 100%;'
          src={bgImg}
        />
        <AtButton className="loginBtn" type='primary' onClick={this.handleClick}>立即体验</AtButton>  
      </View>
    )
  }
}
