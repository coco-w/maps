<template>
  <div id="container">
    <div class="absolute top-0 left-0 z-20">
      <el-cascader
        v-model="value"
        :options="options"
        :props="props"
        @change="handleChange"
        size="large"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { reactive, ref, shallowRef } from 'vue'
import jsonData from './data.json'
import '@amap/amap-jsapi-types'

const path = ref<any[]>([])
const current_position = ref<any[]>([])
const value = ref<string[]>([])
const props = {
  expandTrigger: 'hover'
}
const overlays = ref<any[]>([])
const handleChange = (value: string[]) => {
  // overlays.value.forEach((ele) => {
  //   myMap.value.remove(ele)
  // })
  myMap.value?.clearMap()
  const data = jsonData.filter(
    (ele) => ele.from === value[0] && ele.to === value[1]
  )
  data.forEach((ele) => {
    const citys = ele.lable.split('<br>')

    const zb: string[] = JSON.parse(ele.zb)
    const labels: string[] = ele.lable.split('<br>')
    const path: number[][] = []
    const marks: Record<string, number[]> = {}
    zb.forEach((p, index) => {
      const ps = p.split(',')
      const postion = [Number(ps[0]), Number(ps[1])]
      marks[labels[index]] = postion
      path.push(postion)
      addMarker(postion, labels[index])
    })
    addPolyLine(path)
  })
}

const options = [
  {
    value: '河南',
    label: '河南',
    children: [
      {
        value: '湖南',
        label: '湖南'
      },
      {
        value: '湖北',
        label: '湖北'
      },
      {
        value: '江西',
        label: '江西'
      }
    ]
  },
  {
    value: '湖南',
    label: '湖南',
    children: [
      {
        value: '河南',
        label: '河南'
      },

      {
        value: '湖北',
        label: '湖北'
      },
      {
        value: '江西',
        label: '江西'
      }
    ]
  },
  {
    value: '湖北',
    label: '湖北',
    children: [
      {
        value: '河南',
        label: '河南'
      },
      {
        value: '湖南',
        label: '湖南'
      },

      {
        value: '江西',
        label: '江西'
      }
    ]
  },
  {
    value: '江西',
    label: '江西',
    children: [
      {
        value: '河南',
        label: '河南'
      },
      {
        value: '湖南',
        label: '湖南'
      },
      {
        value: '湖北',
        label: '湖北'
      }
    ]
  }
]

// eslint-disable-next-line no-undef
const myMap = shallowRef<AMap.Map>()
const myAMap = shallowRef<any>()
//进行地图初始化
function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: '729e566e898532f4db85d6a77fd976e1'
  }
  AMapLoader.load({
    key: '93f1e15e455fa05de12668b66e5cbf26', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.DistrictSearch']
  })
    .then((amap) => {
      myAMap.value = amap
      myMap.value = new amap.Map('container', {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 7, //初始化地图级别
        center: [114.159224, 29.716256] //初始化地图中心点位置
      })
      const provinces: Record<string, string> = {
        '410000': '#EB9FFA',
        '420000': '#FEFEA9',
        '430000': '#F1CDA1',
        '360000': '#81CAF9'
      }
      const disProvince = new amap.DistrictLayer.Province({
        zIndex: 12,
        adcode: ['410000', '420000', '430000', '360000'],
        depth: 0,
        styles: {
          fill: function (properties: any) {
            var adcode: number = properties.adcode
            console.log(properties)
            if (provinces[String(adcode)]) {
              return provinces[String(adcode)]
            } else {
              return ''
            }
          },
          'province-stroke': 'cornflowerblue',
          'city-stroke': 'white', //中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)' //中国区县边界
        }
      })
      disProvince.setMap(myMap.value)
      //添加插件
      amap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye'], function () {
        //异步同时加载多个插件
        myMap.value?.addControl(new amap.HawkEye()) //显示缩略图
        myMap.value?.addControl(new amap.Scale()) //显示当前地图中心的比例尺
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

// 实例化点标记
const addMarker = (postion: any, name: string) => {
  const marker = new myAMap.value.Marker({
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    position: postion,
    offset: new myAMap.value.Pixel(-26, -54)
  })
  marker.setMap(myMap.value)
  marker.setLabel({
    direction: 'bottom',
    offset: new myAMap.value.Pixel(10, 0), //设置文本标注偏移量
    content: '<div>' + name + '</div>' //设置文本标注内容
  })
  overlays.value.push(marker)
}

// 折线
const addPolyLine = (path: any) => {
  const polyline = new myAMap.value.Polyline({
    path: path,
    map: myMap.value,
    showDir: true,
    strokeColor: '#3366bb', // 线颜色
    strokeWeight: 10
  })

  polyline.on('mouseover', (e: any) => {
    polyline.setOptions({
      strokeWeight: 20
    })
  })
  polyline.on('mouseout', (e: any) => {
    // console.log(e)
    polyline.setOptions({
      strokeWeight: 10
    })
  })
  // myMap.value?.add([polyline])
  // overlays.value.push(polyline)
}
initMap()
</script>

<style scoped lang="less">
#container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 800px;
}
</style>
