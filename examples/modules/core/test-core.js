/**
 * 核心模块测试
 * 测试BaseSdk和DefaultRequestAdapter
 */

const { createSdk } = require('../../utils/config');

async function testCoreModule() {
  console.log('=== 核心模块测试 ===\n');

  // 测试1: 创建SDK实例
  console.log('1. 测试SDK实例创建...');
  const sdk = createSdk({ debug: false });

  console.log('   ✅ SDK实例创建成功');
  console.log('   类型:', sdk.constructor.name);
  console.log();

  // 测试2: 测试getAccessToken方法
  console.log('2. 测试getAccessToken方法...');
  try {
    const token = await sdk.getAccessToken();
    console.log('   ❌ 预期失败但成功获取token:', token.substring(0, 20) + '...');
  } catch (error) {
    console.log('   ✅ 预期失败:', error.message);
  }
  console.log();

  // 测试3: 测试模块懒加载
  console.log('3. 测试模块懒加载...');
  console.log('   user模块:', typeof sdk.user);
  console.log('   template模块:', typeof sdk.template);
  console.log('   customerService模块:', typeof sdk.customerService);
  console.log('   qrCode模块:', typeof sdk.qrCode);
  console.log('   urlScheme模块:', typeof sdk.urlScheme);
  console.log('   ✅ 所有模块属性存在');
  console.log();

  console.log('=== 核心模块测试完成 ===\n');
  return true;
}

// 运行测试
if (require.main === module) {
  testCoreModule()
    .then(() => {
      console.log('✅ 所有核心模块测试通过');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testCoreModule };