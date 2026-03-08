/**
 * 所有模块集成测试
 * 运行所有模块的测试
 */

const { testCoreModule } = require('./modules/core/test-core');
const { testUserModule } = require('./modules/user/test-user');
const { testTemplateModule } = require('./modules/template/test-template');
const { testCustomerServiceModule } = require('./modules/customer-service/test-customer-service');
const { testQrCodeModule } = require('./modules/qrcode/test-qrcode');
const { testUrlSchemeModule } = require('./modules/url-scheme/test-url-scheme');

async function runAllTests() {
  console.log('=== 微信小程序服务端SDK 所有模块测试 ===\n');
  
  const tests = [
    { name: '核心模块', test: testCoreModule },
    { name: '用户模块', test: testUserModule },
    { name: '模板消息模块', test: testTemplateModule },
    { name: '客服消息模块', test: testCustomerServiceModule },
    { name: '二维码模块', test: testQrCodeModule },
    { name: 'URL Scheme模块', test: testUrlSchemeModule },
  ];

  let passed = 0;
  let failed = 0;

  for (const { name, test } of tests) {
    console.log(`\n📦 开始测试: ${name}`);
    console.log('='.repeat(40));
    
    try {
      await test();
      console.log(`✅ ${name} 测试通过\n`);
      passed++;
    } catch (error) {
      console.error(`❌ ${name} 测试失败:`, error.message);
      console.error(error.stack);
      console.log();
      failed++;
    }
  }

  console.log('='.repeat(50));
  console.log('📊 测试结果汇总:');
  console.log(`   总测试数: ${tests.length}`);
  console.log(`   通过: ${passed}`);
  console.log(`   失败: ${failed}`);
  console.log(`   通过率: ${((passed / tests.length) * 100).toFixed(1)}%`);
  console.log();

  if (failed === 0) {
    console.log('🎉 所有模块测试通过！');
    console.log('\n✅ SDK功能完整，可以正常使用。');
    console.log('💡 提示: 要实际调用微信API，需要提供真实的appId和appSecret。');
    console.log('       请设置 WXA_APP_ID 和 WXA_APP_SECRET 环境变量。');
  } else {
    console.log('⚠️  部分模块测试失败，请检查问题。');
    process.exit(1);
  }
}

// 运行所有测试
if (require.main === module) {
  runAllTests()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试运行失败:', error);
      process.exit(1);
    });
}

module.exports = { runAllTests };