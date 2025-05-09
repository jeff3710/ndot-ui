import api from '@/utils/http'
// import AppConfig from '@/config'
import type { SnmpTemplateRequest, ApiResponse } from '@/types/axios'
import { camelToSnake } from '@/utils/utils'
// import avatar from '@imgs/user/avatar.png'
// import { useDeviceStore } from '@/store/modules/device'

export class TemplateService {
  static async NewSnmpTemplate(options: { body: SnmpTemplateRequest }): Promise<ApiResponse> {
    // const deviceStore = useDeviceStore()
    try {
      const res = await api.post<ApiResponse>({
        url: '/device/snmptemplate',
        data: camelToSnake(options.body)
      })
      console.log('创建 SNMP 模板的响应:', res)
      if (res.code === 0 && res.msg === 'success') {
        console.log('创建 SNMP 模板成功:', res.msg)
      }
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }
  static async getTemplate(templateId: number): Promise<ApiResponse> {
    try {
      const res = await api.get<ApiResponse>({
        url: '/device/snmptemplate/' + templateId
      })
      if (res.code === 0 && res.data) {
        // const userStore = useUserStore()
        // userStore.setUserInfo(res.data)
        console.log('获取 SNMP 模板成功:', res.data)
      }
      return res
    } catch (error) {
      console.error('获取模版失败:', error)
      return { code: 401, msg: '获取模版失败', data: null }
    }
  }
  static async getUserInfoById(userid: string): Promise<ApiResponse> {
    try {
      const res = await api.get<ApiResponse>({
        url: '/user/id/' + userid
      })
      if (res.code === 0 && res.data) {
        // const userStore = useUserStore()
        // userStore.setUserInfo(res.data)
      }
      return res
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return { code: 401, msg: '获取用户信息失败', data: null }
    }
  }
  static async getTemplateList(): Promise<ApiResponse> {
    try {
      const res = await api.get<ApiResponse>({
        url: '/device/snmptemplate'
      })
      if (res.code === 0 && res.data) {
        // const userStore = useUserStore()
        // userStore.setUserInfo(res.data)
      }
      return res
    } catch (error) {
      console.error('获取模版列表失败:', error)
      return { code: 401, msg: '获取模版列表失败', data: null }
    }
  }
}
