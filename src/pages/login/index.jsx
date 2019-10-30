import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input,Label } from '@tarojs/components'
import './index.scss'
import api from '../../utils/api'
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
    super(props)
    this.state = {
      account: '',//账号
      password: '',//密码
      isLogin: false,//是否登录
      toast: false,//密码错误
    }
  }

  handleClick = (e) => {
    let isLogin = this.state.isLogin
    if(!isLogin) {
      let params = {
        phone: this.state.account || '',
        password: this.state.password || '',
      }
      api.get('/login/cellphone',params)
      .then(res => {
        if(res.data.code === 200) {
          let cookies = res.cookies[0]
          Taro.setStorageSync('cookie', cookies)
          Taro.redirectTo({
            url: '/pages/index/index'
          })
          console.log(res)
        }else if(res.data.code === 502) {
          // Taro.showToast({
          //   title: '密码错误',
          //   icon: 'success',
          //   duration: 2000
          // })
          Taro.showModal({
            title: '提示',
            content: '密码错误',
          })
        }else if(res.data.code === 509) {
          Taro.showModal({
            title: '提示',
            content: '密码错误超过限制，请稍后登录',
          })
        }
      })
    } else {
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }   
  }
  handleBlurNum = (e) => {
    // console.log(this)
    this.setState({
      account: e.detail.value
    })
  }
  handleBlurPassword = (e) => {
    this.setState({
      password: e.detail.value
    })
  }
  componentWillMount () {
    let cookie = Taro.getStorageSync('cookie')
    if(cookie) {
      this.setState({
        isLogin: true
      })
    }
   }

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
        {
          !isLogin ? <View className="loginForm">
            <View className="inputItem">
              账号:<Input className="input" placeholder="手机号码" onBlur={this.handleBlurNum}/>
            </View>
            <View className="inputItem">
              密码:<Input className="input" password="true" placeholder="密码" onBlur={this.handleBlurPassword}/>
            </View>
            </View> : null
        }
          
          <AtButton className="loginBtn" type='primary' onClick={this.handleClick}>立即体验</AtButton>
      </View>
    )
  }
}
