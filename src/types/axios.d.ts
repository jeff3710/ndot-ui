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
// 定义 SNMP 模板的请求数据类型
export interface TemplateParams {
  pageNo: number
  pageSize: number
  condition?: string
}

// 定义 SNMP 模板的响应数据类型
export interface SnmpTemplateItem {
  id: number
  name: string
  protocol: string
  version: string
  description: string
  deviceCount: number
  port: number
  readCommunity: string
  writeCommunity: string
  trapCommunity: string
  timeout: number
  pollInterval: number
  retries: number
  securityLevel: string
  authProtocol: string
  authPassword: string
  privProtocol: string
  privPassword: string
  v3User: string
  engineId: string
  created_at: string
  updated_at: string
}

export type SnmpTemplateResponse = ApiResponse<PageResult<SnmpTemplateItem>>

// 定义通用响应类型
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}
// 分页数据结构
export interface PageResult<T> {
  total: number
  list: T[]
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
export interface SshTemplateRequest {
  authMode: number // 认证模式（0=密码认证，1=密钥认证, 2=密钥密码等）
  loginUser: string // 登录用户名
  password?: string // 登录密码（可选，取决于认证模式）
  port: number // SSH连接端口
  protocolType: number // 协议类型（1=SSH）
  templateName: string // 模板名称
  timeout: number // 连接超时时间（秒）
  secretKey?: string // SSH密钥（可选，取决于认证模式）
  privilegePwd?: string // 特权密码（可选）
}

/**
 * SSH配置模板的后端响应接口
 */
export interface SshTemplateItem {
  /** 模板唯一标识符（UUID格式） */
  templateId: string

  /** 模板名称 */
  templateName: string

  /** 创建模板的用户ID */
  userId: number

  /** 访问模式（public=公共，private=私有） */
  accessMode: 'public' | 'private'

  /** 使用此模板的设备数量 */
  deviceCount: number

  /** 特权级别（-1表示无特殊特权） */
  privilegeLevel: number

  /** 认证模式（0=密码认证，1=密钥认证等） */
  authMode: number

  /** 连接超时时间（秒） */
  timeout: number

  /** 协议类型（1=SSH） */
  protocolType: number

  /** SSH密钥（可能为空，取决于认证模式） */
  secretKey: string | null

  /** 登录密码（可能为空，取决于认证模式） */
  password: string | null

  /** 登录用户名 */
  loginUser: string

  /** 特权密码（可能为空） */
  privilegePwd: string | null

  /** SSH连接端口 */
  port: number
}
export type SshTemplateResponse = ApiResponse<PageResult<SshTemplateItem>>
// 定义登录响应类型
export type LoginResponse = ApiResponse<LoginData | null>
// 定义用户列表响应类型
export type UserResponse = ApiResponse<UserData | null>
