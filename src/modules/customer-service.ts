/**
 * 客服消息模块
 */

import { BaseSdk } from '../core';
import { CustomerServiceMessage, WechatApiResponse } from '../types';

/**
 * 客服消息模块
 */
export class CustomerServiceModule extends BaseSdk {
  /**
   * 发送客服消息
   * @param message 客服消息
   */
  async sendCustomerServiceMessage(message: CustomerServiceMessage): Promise<WechatApiResponse> {
    const response = await this.requestWithToken({
      path: '/cgi-bin/message/custom/send',
      method: 'POST',
      data: message,
    });

    return response;
  }

  /**
   * 创建文本客服消息
   * @param touser 接收者openid
   * @param content 文本内容
   */
  createTextMessage(touser: string, content: string): CustomerServiceMessage {
    return {
      msgtype: 'text',
      touser,
      text: {
        content,
      },
    };
  }

  /**
   * 创建图片客服消息
   * @param touser 接收者openid
   * @param mediaId 图片媒体ID
   */
  createImageMessage(touser: string, mediaId: string): CustomerServiceMessage {
    return {
      msgtype: 'image',
      touser,
      image: {
        media_id: mediaId,
      },
    };
  }

  /**
   * 创建链接客服消息
   * @param touser 接收者openid
   * @param title 标题
   * @param description 描述
   * @param url 链接地址
   * @param thumbUrl 缩略图地址
   */
  createLinkMessage(
    touser: string,
    title: string,
    description: string,
    url: string,
    thumbUrl: string
  ): CustomerServiceMessage {
    return {
      msgtype: 'link',
      touser,
      link: {
        title,
        description,
        url,
        thumb_url: thumbUrl,
      },
    };
  }

  /**
   * 创建小程序页面客服消息
   * @param touser 接收者openid
   * @param title 标题
   * @param pagepath 页面路径
   * @param thumbMediaId 缩略图媒体ID
   */
  createMiniprogramPageMessage(
    touser: string,
    title: string,
    pagepath: string,
    thumbMediaId: string
  ): CustomerServiceMessage {
    return {
      msgtype: 'miniprogrampage',
      touser,
      miniprogrampage: {
        title,
        pagepath,
        thumb_media_id: thumbMediaId,
      },
    };
  }

  /**
   * 设置客服输入状态
   * @param touser 接收者openid
   * @param typing 是否正在输入
   */
  async setTyping(touser: string, typing: boolean): Promise<WechatApiResponse> {
    const response = await this.requestWithToken({
      path: '/cgi-bin/message/custom/typing',
      method: 'POST',
      data: {
        touser,
        command: typing ? 'Typing' : 'CancelTyping',
      },
    });

    return response;
  }
}
