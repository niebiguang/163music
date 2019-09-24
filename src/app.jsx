import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import Login from './pages/login'

import './app.scss'
import './fonts/iconfont.css'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/rankList/index',
      'pages/songList/index',
      'pages/recommendList/index',
      'pages/broadcasting/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#542375',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      // <Index />
      <Login />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
 