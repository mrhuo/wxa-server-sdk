/**
 * 核心模块 - 基础SDK类和请求适配器
 * @author mrhuo (https://github.com/mrhuo)
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RequestAdapter,
  RequestOptions,
  WxaSdkConfig,
  WechatApiResponse,
  AccessTokenResponse,
} from '../types';

/**
 * 默认请求适配器（基于axios）
 */
export class DefaultRequestAdapter implements RequestAdapter {
  private axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  async request<T = any>(options: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      url: options.url,
      method: options.method,
      params: options.params,
      data: options.data,
      headers: options.headers,
      timeout: options.timeout,
      responseType: options.responseType || 'json',
    };

    const response: AxiosResponse<T> = await this.axiosInstance.request(config);
    return response.data;
  }
}

/**
 * 基础SDK类
 */
export class BaseSdk {
  protected config: WxaSdkConfig;
  protected requestAdapter: RequestAdapter;
  protected accessToken?: string;
  protected tokenExpiresAt?: number;

  constructor(config: WxaSdkConfig) {
    this.config = {
      timeout: 10000,
      debug: false,
      ...config,
    };

    this.requestAdapter = config.requestAdapter || new DefaultRequestAdapter({
      timeout: this.config.timeout,
    });
  }

  /**
   * 构建微信API URL
   */
  protected buildWechatApiUrl(path: string, params?: Record<string, any>): string {
    const baseUrl = 'https://api.weixin.qq.com';
    const url = new URL(path, baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * 检查微信API响应是否有错误
   * 微信API在成功时不会返回errcode和errmsg字段，只有在失败时才返回
   */
  protected checkWechatResponse<T>(response: T): T {
    this.debugLog('微信API响应:', response);
    
    // 检查响应是否是对象
    if (response && typeof response === 'object') {
      const resp = response as any;
      // 如果响应中包含errcode字段且不为0，表示有错误
      if ('errcode' in resp && resp.errcode !== 0) {
        // 直接返回原始错误响应，调用方需要检查errcode
        return response;
      }
    }
    
    return response;
  }

  /**
   * 获取访问令牌
   */
  public async getAccessToken(): Promise<string> {
    // 检查令牌是否有效
    if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.accessToken!;
    }

    const url = this.buildWechatApiUrl('/cgi-bin/token', {
      grant_type: 'client_credential',
      appid: this.config.appId,
      secret: this.config.appSecret,
    });

    const response = await this.requestAdapter.request<any>({
      url,
      method: 'GET',
    });

    // 检查是否有错误
    this.checkWechatResponse(response);

    // 如果响应中包含errcode字段，表示有错误
    if ('errcode' in response && response.errcode !== 0) {
      throw new Error(`获取访问令牌失败: ${response.errmsg || '未知错误'}`);
    }

    // 成功响应：{access_token: "xxx", expires_in: 7200}
    if (response.access_token) {
      this.accessToken = response.access_token;
      // 提前5分钟过期，避免边界情况
      const expiresIn = response.expires_in || 7200;
      this.tokenExpiresAt = Date.now() + (expiresIn - 300) * 1000;
      return this.accessToken!;
    }

    throw new Error('获取访问令牌失败: 响应格式错误');
  }

  /**
   * 带访问令牌的请求
   */
  protected async requestWithToken<T extends WechatApiResponse = any>(
    options: Omit<RequestOptions, 'url'> & { path: string }
  ): Promise<T> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl(options.path, {
        access_token: token,
      });

      const response = await this.requestAdapter.request<T>({
        ...options,
        url,
      });

      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '获取访问令牌失败',
      } as T;
    }
  }

  /**
   * 不带访问令牌的请求（用于code2Session等接口）
   */
  protected async requestWithoutToken<T extends WechatApiResponse = any>(
    options: Omit<RequestOptions, 'url'> & { path: string }
  ): Promise<T> {
    const url = this.buildWechatApiUrl(options.path);

    const response = await this.requestAdapter.request<T>({
      ...options,
      url,
    });

    return this.checkWechatResponse(response);
  }

  /**
   * 调试日志
   */
  protected debugLog(...args: any[]): void {
    if (this.config.debug) {
      console.log('[WXA-SDK]', ...args);
    }
  }
}