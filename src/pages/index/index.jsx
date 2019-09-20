import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'
import api from '../../utils/api'

import { AtButton } from 'taro-ui'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: "white",
    backgroundColor: "#eeeeee",
    backgroundTextStyle: "light"
  }

  constructor(props) {
    super(props)
    this.state={
      bannerlist: []//轮播图列表
    }
  }

  componentWillMount () { }

  componentDidMount () {
    let params = 'type=2'
    api.get('/banner',params)
    .then(res =>{
      console.log(res.data)
      this.setState({
        bannerlist: res.data.banners
      })
    })
   
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let bannerlist = this.state.bannerlist
    return (
      <View className='index'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#542375'
          circular
          interval='3000'
          indicatorDots
          autoplay>
            {
              bannerlist.map((item) => {
                return <SwiperItem key={item.targetId}>
                        <Image src={item.imageUrl} style='width: 100%;height: 100%;'></Image>
                      </SwiperItem>
              })
            }
          
        </Swiper>
      </View>
    )
  }
}
