import Taro , { PureComponent } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

import api from '../../utils/api'
class MusicList extends PureComponent {

   config = {
       navigationBarTitleText: ''
  }

  state={}

  componentWillMount () {}
  componentDidMount () {
    console.log(this.$router.params)
    let id = this.$router.params
    this.getMusicList(id)
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获取歌单歌曲列表
  getMusicList(id) {
    let params = {
      id
    }
    api.get('/playlist/detail',params)
    .then(res => {
      console.log(res.data)
    })
  }
  render() {
    return (
      <View>
        
      </View>
    );
  }
}
export default MusicList;