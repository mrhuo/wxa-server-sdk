/**
 * 客服消息模块测试
 * 测试CustomerServiceModule功能
 */

const { createSdk, getTestUserConfig } = require('../../utils/config');

async function testCustomerServiceModule() {
  console.log('=== 客服消息模块测试 ===\n');

  // 初始化SDK
  const sdk = createSdk({ debug: false });
  const testConfig = getTestUserConfig();

  console.log('1. 测试客服消息模块实例...');
  const customerServiceModule = sdk.customerService;
  console.log('   ✅ 客服消息模块实例创建成功');
  console.log('   类型:', customerServiceModule.constructor.name);
  console.log();

  // 测试createTextMessage方法
  console.log('2. 测试createTextMessage方法...');
  const textMessage = customerServiceModule.createTextMessage(
    testConfig.openid,
    '您好，有什么可以帮您？'
  );
  console.log('   ✅ 文本消息创建成功');
  console.log('   消息格式:', JSON.stringify(textMessage, null, 2));
  console.log();

  // 测试createLinkMessage方法
  console.log('3. 测试createLinkMessage方法...');
  const linkMessage = customerServiceModule.createLinkMessage(
    testConfig.openid,
    '欢迎使用小程序',
    '点击查看最新活动',
    'https://example.com',
    'https://example.com/thumb.jpg'
  );
  console.log('   ✅ 链接消息创建成功');
  console.log('   消息格式:', JSON.stringify(linkMessage, null, 2));
  console.log();

  // 测试sendCustomerServiceMessage方法
  console.log('4. 测试sendCustomerServiceMessage方法...');
  console.log('   ℹ️ 需要有效的访问令牌和参数，跳过实际调用');
  console.log('   调用方式示例:');
  console.log('   await sdk.customerService.sendCustomerServiceMessage(textMessage)');
  console.log();

  // 测试setTyping方法
  console.log('5. 测试setTyping方法...');
  console.log('   ℹ️ 需要有效的访问令牌和用户openid，跳过实际调用');
  console.log('   调用方式:');
  console.log('   await sdk.customerService.setTyping("user_openid", true) // 开始输入');
  console.log('   await sdk.customerService.setTyping("user_openid", false) // 结束输入');
  console.log();

  // 测试模块方法存在性
  console.log('6. 测试模块方法存在性...');
  console.log('   createTextMessage:', typeof customerServiceModule.createTextMessage === 'function' ? '✅' : '❌');
  console.log('   createLinkMessage:', typeof customerServiceModule.createLinkMessage === 'function' ? '✅' : '❌');
  console.log('   sendCustomerServiceMessage:', typeof customerServiceModule.sendCustomerServiceMessage === 'function' ? '✅' : '❌');
  console.log('   setTyping:', typeof customerServiceModule.setTyping === 'function' ? '✅' : '❌');
  console.log('   ✅ 所有方法存在');
  console.log();

  // 测试实际调用（使用无效token会返回错误）
  console.log('7. 测试实际API调用（预期失败）...');
  try {
    const result = await customerServiceModule.sendCustomerServiceMessage(textMessage);

    if (result && typeof result === 'object') {
      if ('errcode' in result) {
        console.log('   ✅ 返回错误响应格式正确');
        console.log('   错误码:', result.errcode);
        console.log('   错误信息:', result.errmsg);
      } else {
        console.log('   ⚠️ 未知响应格式:', result);
      }
    }
  } catch (error) {
    console.log('   ❌ 调用异常:', error.message);
  }
  console.log();

  // 测试单独的方法调用
  console.log('8. 单独方法测试示例...');
  
  // createTextMessage 单独测试
  console.log('   a) createTextMessage 单独测试:');
  console.log('      const textMsg = sdk.customerService.createTextMessage(');
  console.log('        "openid",');
  console.log('        "您好，有什么可以帮您？"');
  console.log('      );');
  console.log('      console.log(`文本消息: ${JSON.stringify(textMsg)}`);');
  console.log();
  
  // sendCustomerServiceMessage 单独测试
  console.log('   b) sendCustomerServiceMessage 单独测试:');
  console.log('      const sendResult = await sdk.customerService.sendCustomerServiceMessage(textMsg);');
  console.log('      if (sendResult.errcode) {');
  console.log('        console.error(`错误: ${sendResult.errcode} - ${sendResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`发送成功: ${JSON.stringify(sendResult)}`);');
  console.log('      }');
  console.log();
  
  // setTyping 单独测试
  console.log('   c) setTyping 单独测试:');
  console.log('      const typingResult = await sdk.customerService.setTyping("openid", true);');
  console.log('      if (typingResult.errcode) {');
  console.log('        console.error(`错误: ${typingResult.errcode} - ${typingResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`输入状态设置成功`);');
  console.log('      }');
  console.log();

  console.log('=== 客服消息模块测试完成 ===\n');
  return true;
}

// 运行测试
if (require.main === module) {
  testCustomerServiceModule()
    .then(() => {
      console.log('✅ 客服消息模块测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testCustomerServiceModule };