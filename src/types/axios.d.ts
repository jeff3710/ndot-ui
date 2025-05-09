export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  joinParamsToUrl?: boolean
  formatDate?: boolean
  isTransformResponse?: boolean
  isReturnNativeResponse?: boolean
  joinPrefix?: boolean
  apiUrl?: string
  errorMessageMode?: ErrorMessageMode
  joinTime?: boolean
  ignoreCancelToken?: boolean
  withToken?: boolean
}

// 基础接口返回的数据结构
export interface BaseResult<T = any> {
  code: number // 状态码
  message: string // 消息
  data: T // 数据
  token?: string // 可选字段，用于返回 token
}

// 分页数据结构，继承基础结果结构
export interface PaginationResult<T> extends BaseResult {
  currentPage: number // 当前页
  pageSize: number // 每页条数
  lastPage: number // 总页数
  total: number // 总条数
  data: T
}

// 定义 user 类型
type User = {
  id: number
  username: string
  password_changed_at: string
  created_at: string
}
// 定义用户数据的类型
type UserData = {
  id: number
  username: string
  role: string
  active: boolean
  created_at: string
  updated_at: string
}

// 定义 data 类型
type LoginData = {
  session_id: string
  access_token: string
  access_token_expires_at: string
  refresh_token: string
  refresh_token_expires_at: string
  user: User
}

// 定义通用响应类型
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

export interface SnmpTemplateRequest {
  name: string
  protocol: string
  version: string
  description?: string
  deviceCount?: number
  port?: number
  readCommunity?: string
  writeCommunity?: string
  trapCommunity?: string
  timeout?: number
  pollInterval?: number
  retries?: number
  securityLevel?: string
  authProtocol?: string
  authPassword?: string
  privProtocol?: string
  privPassword?: string
  v3User?: string
  engineId?: string
}

export type SnmpTemplateRequest = ApiResponse<SnmpTemplateData>

// 定义登录响应类型
export type LoginResponse = ApiResponse<LoginData | null>
// 定义用户列表响应类型
export type UserResponse = ApiResponse<UserData | null>
