/**
 * 微信小程序服务端SDK主入口
 */

import { WxaSdkConfig } from './types';
import { UserModule } from './modules/user';
import { TemplateModule } from './modules/template';
import { CustomerServiceModule } from './modules/customer-service';
import { QrCodeModule } from './modules/qrcode';
import { UrlSchemeModule } from './modules/url-scheme';

/**
 * 微信小程序服务端SDK
 */
export class WxaServerSdk {
  private config: WxaSdkConfig;
  private _user?: UserModule;
  private _template?: TemplateModule;
  private _customerService?: CustomerServiceModule;
  private _qrCode?: QrCodeModule;
  private _urlScheme?: UrlSchemeModule;

  constructor(config: WxaSdkConfig) {
    this.config = config;
  }

  /**
   * 用户信息模块
   */
  get user(): UserModule {
    if (!this._user) {
      this._user = new UserModule(this.config);
    }
    return this._user;
  }

  /**
   * 模板消息模块
   */
  get template(): TemplateModule {
    if (!this._template) {
      this._template = new TemplateModule(this.config);
    }
    return this._template;
  }

  /**
   * 客服消息模块
   */
  get customerService(): CustomerServiceModule {
    if (!this._customerService) {
      this._customerService = new CustomerServiceModule(this.config);
    }
    return this._customerService;
  }

  /**
   * 二维码模块
   */
  get qrCode(): QrCodeModule {
    if (!this._qrCode) {
      this._qrCode = new QrCodeModule(this.config);
    }
    return this._qrCode;
  }

  /**
   * URL Scheme模块
   */
  get urlScheme(): UrlSchemeModule {
    if (!this._urlScheme) {
      this._urlScheme = new UrlSchemeModule(this.config);
    }
    return this._urlScheme;
  }

  /**
   * 获取访问令牌
   */
  async getAccessToken(): Promise<string> {
    // 直接创建BaseSdk实例来获取token
    const { BaseSdk } = await import('./core');
    const sdk = new BaseSdk(this.config);
    
    const token = await sdk.getAccessToken();
    if (!token) {
      throw new Error('获取访问令牌失败');
    }
    
    return token;
  }
}

// 导出所有类型
export * from './types';
export * from './core';
export * from './modules/user';
export * from './modules/template';
export * from './modules/customer-service';
export * from './modules/qrcode';
export * from './modules/url-scheme';

// 默认导出
export default WxaServerSdk;
