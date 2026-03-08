/**
 * 模板消息模块
 * @author mrhuo (https://github.com/mrhuo)
 */

import { BaseSdk } from '../core';
import { TemplateMessageParams, WechatApiResponse } from '../types';

/**
 * 模板消息模块
 */
export class TemplateModule extends BaseSdk {
  /**
   * 发送模板消息
   * @param params 模板消息参数
   */
  async sendTemplateMessage(params: TemplateMessageParams): Promise<WechatApiResponse & { msgid?: number }> {
    const response = await this.requestWithToken({
      path: '/cgi-bin/message/wxopen/template/send',
      method: 'POST',
      data: params,
    });

    return response;
  }

  /**
   * 获取模板列表
   */
  async getTemplateList(): Promise<WechatApiResponse & { list?: Array<{ template_id: string; title: string; content: string; example: string }> }> {
    const response = await this.requestWithToken({
      path: '/cgi-bin/wxopen/template/list',
      method: 'GET',
    });

    return response;
  }

  /**
   * 删除模板
   * @param templateId 模板ID
   */
  async deleteTemplate(templateId: string): Promise<WechatApiResponse> {
    const response = await this.requestWithToken({
      path: '/cgi-bin/wxopen/template/del',
      method: 'POST',
      data: {
        template_id: templateId,
      },
    });

    return response;
  }

  /**
   * 组合模板消息数据
   * @param data 键值对数据
   * @param color 可选的颜色
   */
  buildTemplateData(
    data: Record<string, string>,
    color?: string
  ): Record<string, { value: string; color?: string }> {
    const result: Record<string, { value: string; color?: string }> = {};

    Object.entries(data).forEach(([key, value]) => {
      result[key] = {
        value,
        color,
      };
    });

    return result;
  }
}
