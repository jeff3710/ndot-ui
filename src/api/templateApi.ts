import api from '@/utils/http'
import type {
  SnmpTemplateRequest,
  ApiResponse,
  TemplateParams,
  SnmpTemplateResponse,
  SshTemplateRequest,
  SshTemplateResponse
} from '@/types/axios'
import { camelToSnake } from '@/utils/utils'

export class TemplateService {
  static async createSnmpTemplate(body: SnmpTemplateRequest): Promise<ApiResponse> {
    return api.post({
      url: '/device/snmptemplate',
      data: camelToSnake(body)
    })
  }

  static async getSnmpTemplateList(params: TemplateParams): Promise<SnmpTemplateResponse> {
    return api.get({
      url: '/device/snmptemplates',
      params: camelToSnake(params)
    })
  }

  static async createSshTemplate(body: SshTemplateRequest): Promise<ApiResponse> {
    return api.post({
      url: '/device/sshtemplate',
      data: camelToSnake(body)
    })
  }

  static async getSshTemplateList(params: TemplateParams): Promise<SshTemplateResponse> {
    return api.get({
      url: '/device/sshtemplates',
      params: camelToSnake(params)
    })
  }
}
