import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//配置进度条参数
NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  easing: 'easing',
  speed: 1000,
  trickleSpeed: 0.2
})
//防止多次请求进度条重复加载
let loadingNum = 0
function startLoading() {
  if (loadingNum == 0) {
    NProgress.start()
  }
  loadingNum++
}
function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

const service = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_URL
})

service.interceptors.request.use(
  (config) => {
    startLoading()
    return config
  },
  (err) => {
    endLoading()
    err.message = '服务器异常，请联系管理员！'
    ElMessage.error('服务器异常，请联系管理员！')
    // 错误抛到业务代码
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (err) => {
    endLoading()
    ElMessage.error('请求超时或服务器异常，请检查网络或联系管理员！')
    err.message = '请求超时或服务器异常，请检查网络或联系管理员！'
    return Promise.reject(err)
  }
)
// export default service
export interface IResponseData<T = unknown> {
  code: number
  message: string
  result: T
}
function request<T>(config: AxiosRequestConfig) {
  return service.request<IResponseData<T>>(config).then((res) => {
    return res.data.result
  })
}

export default request
