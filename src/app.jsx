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
      'pages/login/index',//登录
      'pages/index/index',//首页
      'pages/rankList/index',//排行榜
      'pages/songList/index',//歌单
      'pages/recommendList/index',//每日推荐
      'pages/broadcasting/index',//电台
      'pages/musicList/index',//歌曲列表
      'pages/player/index',//播放
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#542375',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    requiredBackgroundModes: ["audio", "location"]
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
 