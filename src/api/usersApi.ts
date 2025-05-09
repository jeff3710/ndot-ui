import api from '@/utils/http'
// import { BaseResult } from '@/types/axios'
// import AppConfig from '@/config'
import type { LoginResponse, UserResponse } from '@/types/axios'
// import avatar from '@imgs/user/avatar.png'
import { useUserStore } from '@/store/modules/user'

export class UserService {
  static async login(options: { body: string }): Promise<LoginResponse> {
    const userStore = useUserStore()
    const { username, password } = JSON.parse(options.body)
    try {
      const res = await api.post<LoginResponse>({
        url: '/user/login',
        data: { username, password }
      })
      if (res.code === 0 && res.data) {
        userStore.setToken(res.data.access_token, res.data.refresh_token)
      }
      return res
    } catch (error) {
      console.error('登录失败:', error)
      return { code: 500, msg: '登录失败', data: null }
    }
  }
  static async getUserInfo(username: string): Promise<UserResponse> {
    try {
      const res = await api.get<UserResponse>({
        url: '/user/' + username
      })
      if (res.code === 0 && res.data) {
        const userStore = useUserStore()
        userStore.setUserInfo(res.data)
      }
      return res
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return { code: 401, msg: '获取用户信息失败', data: null }
    }
  }
  static async getUserInfoById(userid: string): Promise<UserResponse> {
    try {
      const res = await api.get<UserResponse>({
        url: '/user/id/' + userid
      })
      if (res.code === 0 && res.data) {
        const userStore = useUserStore()
        userStore.setUserInfo(res.data)
      }
      return res
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return { code: 401, msg: '获取用户信息失败', data: null }
    }
  }
  static async logout() {
    const userStore = useUserStore()
    userStore.logOut()
  }
}
