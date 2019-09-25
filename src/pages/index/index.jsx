import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'
import api from '../../utils/api'

import { AtButton } from 'taro-ui'
import Gedan from '../../components/gedan/Gedan'

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
      bannerlist: [],//轮播图列表
      songList: [],//推荐歌单列表
    }
    
  }

  componentWillMount () { }

  componentDidMount () {
    // 获取banner
    this.getBannerList()
    this.getSongList()
   
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 获取banner列表
  getBannerList() {
    let params = 'type=2'
    api.get('/banner',params)
    .then(res =>{
      console.log(res.data)
      this.setState({
        bannerlist: res.data.banners
      })
    })
  }
  // 获取推荐歌单列表
  getSongList() {
    api.get('/recommend/resource')
      .then(res => {
        console.log(res.data)
        this.setState({
          songList: res.data.recommend
        })
      })
  }

  render () {
    let bannerlist = this.state.bannerlist 
    let songList = this.state.songList 
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
        <View className="tabList">
          <Navigator className="tabItem" url="/pages/recommendList/index">
            <Text className="icon icon-meirituijian fonts"></Text>
            每日推荐
          </Navigator>
          <Navigator className="tabItem" url="/pages/songList/index">
            <Text className="icon icon-gedan fonts"></Text>
            歌单
          </Navigator>
          <Navigator className="tabItem" url="/pages/rankList/index">
            <Text className="icon icon-paihang fonts"></Text>
            排行
          </Navigator>
          <Navigator className="tabItem" url="/pages/broadcasting/index">
            <Text className="icon icon-diantai fonts"></Text>
            电台
          </Navigator>
        </View>
        {/* 推荐歌单 */}
        <Gedan {...songList}></Gedan>
        {/* <View className="songList">
          {
            songList.map((item) => {
              return <View className="listItem" key={item.id}>
                      <View className="listItem-img">
                        <Image src={item.picUrl} style='width: 100%;height: 100%;border-radius: 10px'></Image>
                      </View>
                      <Text className="listItem-text">{item.name}</Text>
                    </View>
            })
          }
            
        </View> */}
      </View>
    )
  }
}
