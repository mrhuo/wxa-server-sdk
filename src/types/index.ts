/**
 * 微信小程序服务端SDK类型定义
 */

/**
 * SDK配置选项
 */
export interface WxaSdkConfig {
  /** 小程序appId */
  appId: string;
  /** 小程序appSecret */
  appSecret: string;
  /** 请求超时时间（毫秒），默认10000 */
  timeout?: number;
  /** 是否启用调试模式 */
  debug?: boolean;
  /** 自定义请求适配器 */
  requestAdapter?: RequestAdapter;
}

/**
 * 微信API通用响应
 * 注意：微信API在成功时不会返回errcode和errmsg字段，只有在失败时才返回
 */
export interface WechatApiResponse {
  /** 错误码，0表示成功（仅在失败时返回） */
  errcode?: number;
  /** 错误信息（仅在失败时返回） */
  errmsg?: string;
}

/**
 * 访问令牌响应
 */
export interface AccessTokenResponse extends WechatApiResponse {
  /** 获取到的凭证 */
  access_token: string;
  /** 凭证有效时间，单位：秒 */
  expires_in: number;
}

/**
 * 请求适配器接口
 */
export interface RequestAdapter {
  request<T = any>(options: RequestOptions): Promise<T>;
}

/**
 * 请求选项
 */
export interface RequestOptions {
  /** 请求URL */
  url: string;
  /** 请求方法 */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** 请求参数 */
  params?: Record<string, any>;
  /** 请求体数据 */
  data?: any;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 响应类型 */
  responseType?: 'json' | 'arraybuffer' | 'blob' | 'text' | 'stream';
}

/**
 * 用户会话信息
 */
export interface UserSession {
  /** 用户唯一标识 */
  openid: string;
  /** 会话密钥 */
  session_key: string;
  /** 用户在开放平台的唯一标识符 */
  unionid?: string;
}

/**
 * 模板消息数据项
 */
export interface TemplateMessageDataItem {
  /** 模板内容 */
  value: string;
  /** 模板内容字体颜色，不填默认为黑色 */
  color?: string;
}

/**
 * 模板消息发送参数
 */
export interface TemplateMessageParams {
  /** 接收者（用户）的openid */
  touser: string;
  /** 所需下发的模板消息的id */
  template_id: string;
  /** 点击模板卡片后的跳转页面 */
  page?: string;
  /** 表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id */
  form_id?: string;
  /** 模板内容，不填则下发空模板 */
  data: Record<string, TemplateMessageDataItem>;
  /** 模板需要放大的关键词，不填则默认无放大 */
  emphasis_keyword?: string;
}

/**
 * 客服消息类型
 */
export type CustomerServiceMessageType =
  | 'text'
  | 'image'
  | 'link'
  | 'miniprogrampage';

/**
 * 客服消息基础参数
 */
export interface CustomerServiceMessageBase {
  /** 消息类型 */
  msgtype: CustomerServiceMessageType;
  /** 接收者（用户）的openid */
  touser: string;
}

/**
 * 文本客服消息
 */
export interface TextCustomerServiceMessage extends CustomerServiceMessageBase {
  msgtype: 'text';
  text: {
    /** 文本消息内容 */
    content: string;
  };
}

/**
 * 图片客服消息
 */
export interface ImageCustomerServiceMessage extends CustomerServiceMessageBase {
  msgtype: 'image';
  image: {
    /** 发送的图片的媒体ID，通过新增素材接口上传图片文件获得 */
    media_id: string;
  };
}

/**
 * 链接客服消息
 */
export interface LinkCustomerServiceMessage extends CustomerServiceMessageBase {
  msgtype: 'link';
  link: {
    /** 消息标题 */
    title: string;
    /** 图文链接消息的描述 */
    description: string;
    /** 图文链接消息被点击后跳转的链接 */
    url: string;
    /** 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80 */
    thumb_url: string;
  };
}

/**
 * 小程序页面客服消息
 */
export interface MiniprogramPageCustomerServiceMessage
  extends CustomerServiceMessageBase {
  msgtype: 'miniprogrampage';
  miniprogrampage: {
    /** 消息标题 */
    title: string;
    /** 小程序的页面路径，要求以.html结尾 */
    pagepath: string;
    /** 小程序消息卡片的封面， image 类型的 media_id，通过新增素材接口上传图片文件获得，建议大小为 520*416 */
    thumb_media_id: string;
  };
}

/**
 * 客服消息联合类型
 */
export type CustomerServiceMessage =
  | TextCustomerServiceMessage
  | ImageCustomerServiceMessage
  | LinkCustomerServiceMessage
  | MiniprogramPageCustomerServiceMessage;

/**
 * 二维码相关类型
 */

/**
 * 获取二维码参数
 */
export interface QrCodeParams {
  /** 扫码进入的小程序页面路径，最大长度 128 字节，不能为空 */
  path: string;
  /** 二维码的宽度，单位 px。最小 280px，最大 1280px */
  width?: number;
}

/**
 * 获取无限数量二维码参数
 */
export interface UnlimitedQrCodeParams {
  /** 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~ */
  scene: string;
  /** 页面 page，例如 pages/index/index，根路径前不要填加 /，不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面 */
  page?: string;
  /** 二维码的宽度，单位 px。最小 280px，最大 1280px */
  width?: number;
  /** 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调 */
  auto_color?: boolean;
  /** auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} */
  line_color?: {
    r: string;
    g: string;
    b: string;
  };
  /** 是否需要透明底色，为 true 时，生成透明底色的小程序码 */
  is_hyaline?: boolean;
}

/**
 * 创建二维码参数
 */
export interface CreateQrCodeParams {
  /** 扫码进入的小程序页面路径，最大长度 128 字节，不能为空 */
  path: string;
  /** 二维码的宽度，单位 px。最小 280px，最大 1280px */
  width?: number;
}

/**
 * 二维码响应（成功时返回二进制图片数据，失败时返回WechatApiResponse）
 */
export type QrCodeResponse = Buffer | WechatApiResponse;

/**
 * URL Scheme相关类型
 */

/**
 * 查询scheme参数
 */
export interface QuerySchemeParams {
  /** 小程序 scheme 码 */
  scheme: string;
}

/**
 * 查询scheme响应
 */
export interface QuerySchemeResponse extends WechatApiResponse {
  /** scheme 配置 */
  scheme_info?: {
    /** 小程序 appid */
    appid: string;
    /** 小程序页面路径 */
    path: string;
    /** 小程序页面query */
    query: string;
    /** 创建时间，为 Unix 时间戳 */
    create_time: number;
    /** 到期失效时间，为 Unix 时间戳，0 表示永久生效 */
    expire_time: number;
    /** 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop" */
    env_version: string;
  };
  /** 访问的用户openid */
  visit_openid?: string;
}

/**
 * 生成scheme参数
 */
export interface GenerateSchemeParams {
  /** 跳转到的目标小程序信息 */
  jump_wxa?: {
    /** 通过 scheme 码进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query。path 为空时会跳转小程序主页 */
    path?: string;
    /** 通过 scheme 码进入小程序时的 query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~ */
    query?: string;
    /** 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"，默认"release" */
    env_version?: string;
  };
  /** 生成的 scheme 码类型，到期失效：true，永久有效：false */
  is_expire?: boolean;
  /** 到期失效的 scheme 码的失效时间，为 Unix 时间戳。生成的到期失效 scheme 码在该时间前有效。最长有效期为1年。is_expire 为 true 且 expire_type 为 0 时必填 */
  expire_time?: number;
  /** 到期失效的 scheme 码失效类型，失效时间：0，失效间隔天数：1 */
  expire_type?: number;
  /** 到期失效的 scheme 码的失效间隔天数。生成的到期失效 scheme 码在该间隔时间到达前有效。最长间隔天数为365天。is_expire 为 true 且 expire_type 为 1 时必填 */
  expire_interval?: number;
}

/**
 * 生成scheme响应
 */
export interface GenerateSchemeResponse extends WechatApiResponse {
  /** 生成的小程序 scheme 码 */
  openlink?: string;
}

/**
 * 生成NFC scheme参数
 */
export interface GenerateNfcSchemeParams {
  /** 跳转到的目标小程序信息 */
  jump_wxa?: {
    /** 通过 scheme 码进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query。path 为空时会跳转小程序主页 */
    path?: string;
    /** 通过 scheme 码进入小程序时的 query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~ */
    query?: string;
    /** 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"，默认"release" */
    env_version?: string;
  };
  /** 生成的 scheme 码类型，到期失效：true，永久有效：false */
  is_expire?: boolean;
  /** 到期失效的 scheme 码的失效时间，为 Unix 时间戳。生成的到期失效 scheme 码在该时间前有效。最长有效期为1年。is_expire 为 true 且 expire_type 为 0 时必填 */
  expire_time?: number;
  /** 到期失效的 scheme 码失效类型，失效时间：0，失效间隔天数：1 */
  expire_type?: number;
  /** 到期失效的 scheme 码的失效间隔天数。生成的到期失效 scheme 码在该间隔时间到达前有效。最长间隔天数为365天。is_expire 为 true 且 expire_type 为 1 时必填 */
  expire_interval?: number;
  /** NFC 场景参数 */
  nfc_scheme_param?: {
    /** NFC 跳转小程序场景，目前仅支持"payment" */
    scene: string;
    /** 支付订单号 */
    out_trade_no: string;
    /** 支付金额，单位分 */
    total_fee: number;
    /** 支付币种，目前仅支持"CNY" */
    fee_type: string;
    /** 支付时间，Unix 时间戳 */
    time_end: number;
  };
}

/**
 * 生成NFC scheme响应
 */
export interface GenerateNfcSchemeResponse extends WechatApiResponse {
  /** 生成的小程序 scheme 码 */
  openlink?: string;
}

/**
 * URL Link相关类型
 */

/**
 * 查询URL Link参数
 */
export interface QueryUrlLinkParams {
  /** 小程序 URL Link */
  url_link: string;
}

/**
 * 查询URL Link响应
 */
export interface QueryUrlLinkResponse extends WechatApiResponse {
  /** URL Link 配置 */
  url_link_info?: {
    /** 小程序 appid */
    appid: string;
    /** 小程序页面路径 */
    path: string;
    /** 小程序页面query */
    query: string;
    /** 创建时间，为 Unix 时间戳 */
    create_time: number;
    /** 到期失效时间，为 Unix 时间戳，0 表示永久生效 */
    expire_time: number;
    /** 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop" */
    env_version: string;
  };
  /** 访问的用户openid */
  visit_openid?: string;
}

/**
 * 生成URL Link参数
 */
export interface GenerateUrlLinkParams {
  /** 通过 URL Link 进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query。path 为空时会跳转小程序主页 */
  path?: string;
  /** 通过 URL Link 进入小程序时的query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~% */
  query?: string;
  /** 默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效。 */
  env_version?: string;
  /** 默认值0.小程序 URL Link 失效类型，失效时间：0，失效间隔天数：1 */
  expire_type?: number;
  /** 到期失效的 URL Link 的失效时间，为 Unix 时间戳。生成的到期失效 URL Link 在该时间前有效。最长有效期为30天。expire_type 为 0 必填 */
  expire_time?: number;
  /** 到期失效的URL Link的失效间隔天数。生成的到期失效URL Link在该间隔时间到达前有效。最长间隔天数为30天。expire_type 为 1 必填 */
  expire_interval?: number;
  /** 云开发静态网站自定义 H5 配置参数，可配置中转的云开发 H5 页面。不填默认用官方 H5 页面 */
  cloud_base?: {
    /** 云开发环境 */
    env: string;
    /** 静态网站自定义域名，不填则使用默认域名 */
    domain?: string;
    /** 云开发静态网站 H5 页面路径，不可携带 query */
    path?: string;
    /** 云开发静态网站 H5 页面 query 参数 */
    query?: string;
    /** 第三方平台可以添加此参数完成云开发 H5 的跳转 */
    resource_appid?: string;
  };
}

/**
 * 生成URL Link响应
 */
export interface GenerateUrlLinkResponse extends WechatApiResponse {
  /** 生成的小程序 URL Link */
  url_link?: string;
}

/**
 * 短链相关类型
 */

/**
 * 生成短链参数
 */
export interface GenerateShortLinkParams {
  /** 通过 Short Link 进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query。path 为空时会跳转小程序主页 */
  page_url: string;
  /** 页面标题，不能包含违法信息，超过20字符会用...截断代替 */
  page_title: string;
  /** 是否永久有效，默认值false。true为永久有效，false为临时有效 */
  is_permanent?: boolean;
}

/**
 * 生成短链响应
 */
export interface GenerateShortLinkResponse extends WechatApiResponse {
  /** 生成的小程序 Short Link */
  link?: string;
}
