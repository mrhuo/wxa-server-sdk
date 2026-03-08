/**
 * 测试配置工具
 * 用于读取环境变量配置
 */

require('dotenv').config();

/**
 * 获取微信小程序配置
 * @returns {Object} 配置对象
 */
function getWxaConfig() {
  const appId = process.env.WXA_APP_ID || 'test_app_id';
  const appSecret = process.env.WXA_APP_SECRET || 'test_app_secret';
  const debug = process.env.WXA_DEBUG === 'true' || false;

  if (appId === 'your_app_id_here' || appSecret === 'your_app_secret_here') {
    console.warn('⚠️  警告: 请设置有效的 WXA_APP_ID 和 WXA_APP_SECRET 环境变量');
    console.warn('   复制 .env.example 为 .env 并填写正确的值');
  }

  return {
    appId,
    appSecret,
    debug,
  };
}

/**
 * 获取测试用户配置
 * @returns {Object} 测试用户配置
 */
function getTestUserConfig() {
  return {
    jsCode: process.env.TEST_JS_CODE || 'test_js_code',
    openid: process.env.TEST_USER_OPENID || 'test_openid',
    templateId: process.env.TEST_TEMPLATE_ID || 'test_template_id',
    phoneCode: process.env.TEST_PHONE_CODE || 'test_phone_code',
  };
}

/**
 * 创建SDK实例
 * @param {Object} [overrides] 覆盖配置
 * @returns {import('../../dist').WxaServerSdk} SDK实例
 */
function createSdk(overrides = {}) {
  const { WxaServerSdk } = require('../../dist');
  const config = { ...getWxaConfig(), ...overrides };
  return new WxaServerSdk(config);
}

/**
 * 检查环境变量是否已配置
 * @returns {boolean} 是否已配置
 */
function isEnvConfigured() {
  const appId = process.env.WXA_APP_ID;
  const appSecret = process.env.WXA_APP_SECRET;
  
  return appId && appSecret && 
         appId !== 'your_app_id_here' && 
         appSecret !== 'your_app_secret_here';
}

module.exports = {
  getWxaConfig,
  getTestUserConfig,
  createSdk,
  isEnvConfigured,
};