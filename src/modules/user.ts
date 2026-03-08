/**
 * 用户信息模块
 */

import { BaseSdk } from '../core';
import { UserSession, WechatApiResponse } from '../types';

/**
 * 用户信息模块
 */
export class UserModule extends BaseSdk {
  /**
   * 登录凭证校验
   * @param code 登录时获取的code
   */
  async code2Session(code: string): Promise<UserSession & WechatApiResponse> {
    const url = this.buildWechatApiUrl('/sns/jscode2session', {
      appid: this.config.appId,
      secret: this.config.appSecret,
      js_code: code,
      grant_type: 'authorization_code',
    });

    const response = await this.requestAdapter.request<UserSession & WechatApiResponse>({
      url,
      method: 'GET',
    });

    // code2session接口成功时返回openid和session_key，失败时返回errcode和errmsg
    return response;
  }

  /**
   * 获取用户手机号
   * @param code 动态令牌
   */
  async getPhoneNumber(code: string): Promise<{
    errcode: number;
    errmsg: string;
    phone_info?: {
      phoneNumber: string;
      purePhoneNumber: string;
      countryCode: string;
    };
  }> {
    const response = await this.requestWithToken({
      path: '/wxa/business/getuserphonenumber',
      method: 'POST',
      data: {
        code,
      },
    });

    return response;
  }

  /**
   * 检查加密数据
   * @param sessionKey 会话密钥
   * @param encryptedData 加密数据
   * @param iv 加密算法的初始向量
   */
  async decryptData<T = any>(
    sessionKey: string,
    encryptedData: string,
    iv: string
  ): Promise<T> {
    // 注意：这里需要实现解密逻辑
    // 由于Node.js环境需要crypto模块，这里先返回占位实现
    this.debugLog('decryptData called', { sessionKey, encryptedData, iv });

    throw new Error('解密功能需要实现crypto模块');
  }
}
