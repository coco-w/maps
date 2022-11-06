import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import { FastCrud } from '@fast-crud/fast-crud'
import ui from '@fast-crud/ui-element'

const v = createApp(App)
v.use(ElementPlus, { size: 'small', locale: zhCn })
// 先安装ui
v.use(ui)
// 然后安装FastCrud
v.use(FastCrud, {
  //公共crud配置
  commonOptions() {
    return {
      request: {
        //接口请求配置
        //你项目后台接口大概率与fast-crud所需要的返回结构不一致，所以需要配置此项
        //请参考文档http://fast-crud.docmirror.cn/api/crud-options/request.html
        transformQuery: ({ page, form, sort }: any) => {
          //转换为你pageRequest所需要的请求参数结构
          return { page, form, sort }
        },
        transformRes: ({ res }: any) => {
          //将pageRequest的返回数据，转换为fast-crud所需要的格式
          //return {records,currentPage,pageSize,total};
          return { ...res }
        }
      }
    }
  }
})
v.use(router)
v.mount('#app')
