/**
 * 二维码模块
 * @author mrhuo (https://github.com/mrhuo)
 */

import { BaseSdk } from '../core';
import {
  QrCodeParams,
  UnlimitedQrCodeParams,
  CreateQrCodeParams,
  QrCodeResponse,
  WechatApiResponse,
  RequestOptions,
} from '../types';

/**
 * 二维码模块
 */
export class QrCodeModule extends BaseSdk {
  /**
   * 获取小程序二维码
   * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @param params 二维码参数
   */
  async getQrCode(params: QrCodeParams): Promise<QrCodeResponse> {
    return this.requestQrCode('/cgi-bin/wxaapp/createwxaqrcode', {
      path: params.path,
      width: params.width || 430,
    });
  }

  /**
   * 获取小程序码（无限数量）
   * 适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制
   * @param params 无限数量二维码参数
   */
  async getUnlimitedQrCode(params: UnlimitedQrCodeParams): Promise<QrCodeResponse> {
    return this.requestQrCode('/wxa/getwxacodeunlimit', {
      scene: params.scene,
      page: params.page,
      width: params.width || 430,
      auto_color: params.auto_color || false,
      line_color: params.line_color,
      is_hyaline: params.is_hyaline || false,
    });
  }

  /**
   * 创建小程序二维码
   * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @param params 创建二维码参数
   */
  async createQrCode(params: CreateQrCodeParams): Promise<QrCodeResponse> {
    return this.requestQrCode('/cgi-bin/wxaapp/createwxaqrcode', {
      path: params.path,
      width: params.width || 430,
    });
  }

  /**
   * 请求二维码API（处理二进制响应）
   */
  private async requestQrCode(path: string, data: any): Promise<QrCodeResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl(path, {
        access_token: token,
      });

      // 二维码API返回二进制数据，需要特殊处理
      const response = await this.requestAdapter.request<any>({
        url,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json',
        },
        // 设置响应类型为arraybuffer以接收二进制数据
        responseType: 'arraybuffer',
      } as RequestOptions);

      // 检查响应是否是JSON错误（微信API错误时返回JSON）
      try {
        // 尝试解析为JSON，如果成功说明是错误响应
        const jsonResponse = JSON.parse(response.toString());
        if (jsonResponse && typeof jsonResponse === 'object' && 'errcode' in jsonResponse) {
          return jsonResponse as WechatApiResponse;
        }
      } catch (e) {
        // 解析失败说明是二进制图片数据，返回Buffer
        return Buffer.from(response);
      }

      // 如果解析成功但不是错误响应，返回原始响应
      return response;
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '获取二维码失败',
      };
    }
  }

  /**
   * 检查响应是否是错误响应
   */
  private isErrorResponse(response: any): response is WechatApiResponse {
    return response && typeof response === 'object' && 'errcode' in response;
  }

  /**
   * 将二维码Buffer保存为文件
   * @param buffer 二维码Buffer数据
   * @param filePath 文件保存路径
   */
  async saveQrCodeToFile(buffer: Buffer, filePath: string): Promise<void> {
    // 注意：这里需要实现文件保存逻辑
    // 由于Node.js环境需要fs模块，这里先返回占位实现
    this.debugLog('saveQrCodeToFile called', { bufferLength: buffer.length, filePath });
    
    throw new Error('保存文件功能需要实现fs模块');
  }

  /**
   * 将二维码Buffer转换为Base64字符串
   * @param buffer 二维码Buffer数据
   * @returns Base64字符串
   */
  bufferToBase64(buffer: Buffer): string {
    return buffer.toString('base64');
  }

  /**
   * 将二维码Buffer转换为Data URL
   * @param buffer 二维码Buffer数据
   * @param mimeType 图片MIME类型，默认'image/png'
   * @returns Data URL字符串
   */
  bufferToDataUrl(buffer: Buffer, mimeType: string = 'image/png'): string {
    const base64 = this.bufferToBase64(buffer);
    return `data:${mimeType};base64,${base64}`;
  }
}
