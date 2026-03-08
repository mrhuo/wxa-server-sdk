/**
 * URL Scheme模块
 * @author mrhuo (https://github.com/mrhuo)
 */

import { BaseSdk } from '../core';
import {
  QuerySchemeParams,
  QuerySchemeResponse,
  GenerateSchemeParams,
  GenerateSchemeResponse,
  GenerateNfcSchemeParams,
  GenerateNfcSchemeResponse,
  QueryUrlLinkParams,
  QueryUrlLinkResponse,
  GenerateUrlLinkParams,
  GenerateUrlLinkResponse,
  GenerateShortLinkParams,
  GenerateShortLinkResponse,
  WechatApiResponse,
} from '../types';

/**
 * URL Scheme模块
 */
export class UrlSchemeModule extends BaseSdk {
  /**
   * 查询 scheme 码
   * 该接口用于查询小程序 scheme 码，及长期有效 scheme 码的剩余访问次数。
   * @param params 查询scheme参数
   */
  async queryScheme(params: QuerySchemeParams): Promise<QuerySchemeResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl('/wxa/queryscheme', {
        access_token: token,
      });

      const response = await this.requestAdapter.request<QuerySchemeResponse>({
        url,
        method: 'POST',
        data: {
          scheme: params.scheme,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 检查微信API响应
      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '查询scheme失败',
      };
    }
  }

  /**
   * 生成 scheme 码
   * 该接口用于获取小程序 scheme 码，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景。
   * @param params 生成scheme参数
   */
  async generateScheme(params: GenerateSchemeParams): Promise<GenerateSchemeResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl('/wxa/generatescheme', {
        access_token: token,
      });

      // 构建请求数据
      const requestData: any = {};

      if (params.jump_wxa) {
        requestData.jump_wxa = {
          path: params.jump_wxa.path || '',
          query: params.jump_wxa.query || '',
          env_version: params.jump_wxa.env_version || 'release',
        };
      }

      if (params.is_expire !== undefined) {
        requestData.is_expire = params.is_expire;
      }

      if (params.expire_time !== undefined) {
        requestData.expire_time = params.expire_time;
      }

      if (params.expire_type !== undefined) {
        requestData.expire_type = params.expire_type;
      }

      if (params.expire_interval !== undefined) {
        requestData.expire_interval = params.expire_interval;
      }

      const response = await this.requestAdapter.request<GenerateSchemeResponse>({
        url,
        method: 'POST',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 检查微信API响应
      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '生成scheme失败',
      };
    }
  }

  /**
   * 生成 NFC scheme 码
   * 该接口用于获取 NFC 拉起小程序 scheme 码。
   * @param params 生成NFC scheme参数
   */
  async generateNfcScheme(params: GenerateNfcSchemeParams): Promise<GenerateNfcSchemeResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl('/wxa/generatenfcscheme', {
        access_token: token,
      });

      // 构建请求数据
      const requestData: any = {};

      if (params.jump_wxa) {
        requestData.jump_wxa = {
          path: params.jump_wxa.path || '',
          query: params.jump_wxa.query || '',
          env_version: params.jump_wxa.env_version || 'release',
        };
      }

      if (params.is_expire !== undefined) {
        requestData.is_expire = params.is_expire;
      }

      if (params.expire_time !== undefined) {
        requestData.expire_time = params.expire_time;
      }

      if (params.expire_type !== undefined) {
        requestData.expire_type = params.expire_type;
      }

      if (params.expire_interval !== undefined) {
        requestData.expire_interval = params.expire_interval;
      }

      if (params.nfc_scheme_param) {
        requestData.nfc_scheme_param = {
          scene: params.nfc_scheme_param.scene,
          out_trade_no: params.nfc_scheme_param.out_trade_no,
          total_fee: params.nfc_scheme_param.total_fee,
          fee_type: params.nfc_scheme_param.fee_type,
          time_end: params.nfc_scheme_param.time_end,
        };
      }

      const response = await this.requestAdapter.request<GenerateNfcSchemeResponse>({
        url,
        method: 'POST',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 检查微信API响应
      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '生成NFC scheme失败',
      };
    }
  }

  /**
   * 查询 URL Link
   * 该接口用于查询小程序 URL Link，及长期有效 URL Link 的剩余访问次数。
   * @param params 查询URL Link参数
   */
  async queryUrlLink(params: QueryUrlLinkParams): Promise<QueryUrlLinkResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl('/wxa/query_urllink', {
        access_token: token,
      });

      const response = await this.requestAdapter.request<QueryUrlLinkResponse>({
        url,
        method: 'POST',
        data: {
          url_link: params.url_link,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 检查微信API响应
      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '查询URL Link失败',
      };
    }
  }

  /**
   * 生成 URL Link
   * 该接口用于获取小程序 URL Link，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景。
   * @param params 生成URL Link参数
   */
  async generateUrlLink(params: GenerateUrlLinkParams): Promise<GenerateUrlLinkResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl('/wxa/generate_urllink', {
        access_token: token,
      });

      // 构建请求数据
      const requestData: any = {};

      if (params.path !== undefined) {
        requestData.path = params.path;
      }

      if (params.query !== undefined) {
        requestData.query = params.query;
      }

      if (params.env_version !== undefined) {
        requestData.env_version = params.env_version;
      }

      if (params.expire_type !== undefined) {
        requestData.expire_type = params.expire_type;
      }

      if (params.expire_time !== undefined) {
        requestData.expire_time = params.expire_time;
      }

      if (params.expire_interval !== undefined) {
        requestData.expire_interval = params.expire_interval;
      }

      if (params.cloud_base) {
        requestData.cloud_base = {
          env: params.cloud_base.env,
        };

        if (params.cloud_base.domain !== undefined) {
          requestData.cloud_base.domain = params.cloud_base.domain;
        }

        if (params.cloud_base.path !== undefined) {
          requestData.cloud_base.path = params.cloud_base.path;
        }

        if (params.cloud_base.query !== undefined) {
          requestData.cloud_base.query = params.cloud_base.query;
        }

        if (params.cloud_base.resource_appid !== undefined) {
          requestData.cloud_base.resource_appid = params.cloud_base.resource_appid;
        }
      }

      const response = await this.requestAdapter.request<GenerateUrlLinkResponse>({
        url,
        method: 'POST',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 检查微信API响应
      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '生成URL Link失败',
      };
    }
  }

  /**
   * 生成短链
   * 该接口用于获取小程序短链，适用于短信、邮件、网页、微信内等拉起小程序的业务场景。
   * @param params 生成短链参数
   */
  async generateShortLink(params: GenerateShortLinkParams): Promise<GenerateShortLinkResponse> {
    try {
      const token = await this.getAccessToken();
      const url = this.buildWechatApiUrl('/wxa/genwxashortlink', {
        access_token: token,
      });

      // 构建请求数据
      const requestData: any = {
        page_url: params.page_url,
        page_title: params.page_title,
      };

      if (params.is_permanent !== undefined) {
        requestData.is_permanent = params.is_permanent;
      }

      const response = await this.requestAdapter.request<GenerateShortLinkResponse>({
        url,
        method: 'POST',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 检查微信API响应
      return this.checkWechatResponse(response);
    } catch (error) {
      // 如果获取token失败或其他错误，返回错误响应
      return {
        errcode: -1,
        errmsg: error instanceof Error ? error.message : '生成短链失败',
      };
    }
  }
}
