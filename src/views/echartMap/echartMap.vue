<template>
  <div id="map" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import mapJson from './map.json'
onMounted(() => {
  const map = echarts.init(document.querySelector('#map') as HTMLElement)
  var mydata = [
    { name: '北京', value: '100' },
    { name: '天津', value: randomData() },
    { name: '上海', value: randomData() },
    { name: '重庆', value: randomData() },
    { name: '河北', value: randomData() },
    { name: '河南', value: randomData() },
    { name: '云南', value: randomData() },
    { name: '辽宁', value: randomData() },
    { name: '黑龙江', value: randomData() },
    { name: '湖南', value: randomData() },
    { name: '安徽', value: randomData() },
    { name: '山东', value: randomData() },
    { name: '新疆', value: randomData() },
    { name: '江苏', value: randomData() },
    { name: '浙江', value: randomData() },
    { name: '江西', value: randomData() },
    { name: '湖北', value: randomData() },
    { name: '广西', value: randomData() },
    { name: '甘肃', value: randomData() },
    { name: '山西', value: randomData() },
    { name: '内蒙古', value: randomData() },
    { name: '陕西', value: randomData() },
    { name: '吉林', value: randomData() },
    { name: '福建', value: randomData() },
    { name: '贵州', value: randomData() },
    { name: '广东', value: randomData() },
    { name: '青海', value: randomData() },
    { name: '西藏', value: randomData() },
    { name: '四川', value: randomData() },
    { name: '宁夏', value: randomData() },
    { name: '海南', value: randomData() }
  ]

  echarts.registerMap('china', mapJson as any)
  var optionMap = {
    backgroundColor: '#FFFFFF',
    title: {
      text: '全国目录电价展示',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item'
    },

    //左侧小导航图标
    visualMap: {
      left: 'right',
      inRange: {
        // 红
        // color: [
        //   '#6A040F',
        //   '#9D0208',
        //   '#D00000',
        //   '#DC2F02',
        //   '#E85D04',
        //   '#F48C06',
        //   '#FAA307',
        //   '#FFBA08'
        // ]
        // 蓝
        // color: [
        //   '#012A4A',
        //   '#013A63',
        //   '#01497C',
        //   '#014F86',
        //   '#2A6F97',
        //   '#2C7DA0',
        //   '#468FAF',
        //   '#61A5C2',
        //   '#89C2D9',
        //   '#A9D6E5'
        // ]
        // 绿
        color: [
          '#FFFF3F',
          '#EEEF20',
          '#DDDF00',
          '#D4D700',
          '#BFD200',
          '#AACC00',
          '#80B918',
          '#55A630',
          '#2B9348',
          '#007F5F'
          // '#2C7DA0',
          // '#468FAF',
          // '#61A5C2',
          // '#89C2D9',
          // '#A9D6E5'
        ]
      },
      text: ['High', 'Low'],
      calculable: true
    },

    //配置属性
    series: [
      {
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
          normal: {
            show: true,
            formatter: (params: any) => {
              console.log(params)
              if (params.data) {
                return `${params.data.name}: ${params.data.value}`
              }
            }
          },
          emphasis: {
            show: false
          }
        },
        data: mydata //数据
      }
    ]
  }
  map.setOption(optionMap)
})

function randomData() {
  return Math.round(Math.random() * 500)
}
</script>

<!-- <style scoped></style> -->
