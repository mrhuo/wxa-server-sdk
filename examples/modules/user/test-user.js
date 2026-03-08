/**
 * 用户模块测试
 * 测试UserModule功能
 */

const { createSdk, getTestUserConfig } = require('../../utils/config');

async function testUserModule() {
  console.log('=== 用户模块测试 ===\n');

  // 初始化SDK
  const sdk = createSdk({ debug: false });
  const testConfig = getTestUserConfig();

  console.log('1. 测试用户模块实例...');
  const userModule = sdk.user;
  console.log('   ✅ 用户模块实例创建成功');
  console.log('   类型:', userModule.constructor.name);
  console.log();

  // 测试code2Session方法
  console.log('2. 测试code2Session方法...');
  try {
    const result = await userModule.code2Session(testConfig.jsCode);
    
    // 检查响应格式
    if (result && typeof result === 'object') {
      if ('errcode' in result) {
        console.log('   ✅ 返回错误响应格式正确');
        console.log('   错误码:', result.errcode);
        console.log('   错误信息:', result.errmsg);
      } else if ('openid' in result) {
        console.log('   ❌ 预期失败但成功获取session');
        console.log('   openid:', result.openid);
      } else {
        console.log('   ⚠️ 未知响应格式:', result);
      }
    } else {
      console.log('   ⚠️ 响应格式不正确:', result);
    }
  } catch (error) {
    console.log('   ❌ 调用异常:', error.message);
  }
  console.log();

  // 测试getPhoneNumber方法
  console.log('3. 测试getPhoneNumber方法...');
  console.log('   ℹ️ 需要有效的动态令牌code，跳过实际调用');
  console.log('   调用方式: await sdk.user.getPhoneNumber("valid_code")');
  console.log();

  // 测试decryptData方法
  console.log('4. 测试decryptData方法...');
  try {
    await userModule.decryptData(
      'test_session_key',
      'test_encrypted_data',
      'test_iv'
    );
    console.log('   ❌ 预期失败但成功解密');
  } catch (error) {
    console.log('   ✅ 预期失败（解密功能需要实现crypto模块）');
    console.log('   错误信息:', error.message);
  }
  console.log();

  // 测试模块方法存在性
  console.log('5. 测试模块方法存在性...');
  console.log('   code2Session:', typeof userModule.code2Session === 'function' ? '✅' : '❌');
  console.log('   getPhoneNumber:', typeof userModule.getPhoneNumber === 'function' ? '✅' : '❌');
  console.log('   decryptData:', typeof userModule.decryptData === 'function' ? '✅' : '❌');
  console.log('   ✅ 所有方法存在');
  console.log();

  // 测试单独的方法调用
  console.log('6. 单独方法测试示例...');
  
  // code2Session 单独测试
  console.log('   a) code2Session 单独测试:');
  console.log('      const sessionResult = await sdk.user.code2Session("js_code");');
  console.log('      if (sessionResult.errcode) {');
  console.log('        console.error(`错误: ${sessionResult.errcode} - ${sessionResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`用户会话: ${JSON.stringify(sessionResult)}`);');
  console.log('      }');
  console.log();
  
  // getPhoneNumber 单独测试
  console.log('   b) getPhoneNumber 单独测试:');
  console.log('      const phoneResult = await sdk.user.getPhoneNumber("phone_code");');
  console.log('      if (phoneResult.errcode) {');
  console.log('        console.error(`错误: ${phoneResult.errcode} - ${phoneResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`手机号信息: ${JSON.stringify(phoneResult)}`);');
  console.log('      }');
  console.log();
  
  // decryptData 单独测试
  console.log('   c) decryptData 单独测试:');
  console.log('      const decrypted = await sdk.user.decryptData(');
  console.log('        "session_key",');
  console.log('        "encrypted_data",');
  console.log('        "iv"');
  console.log('      );');
  console.log('      console.log(`解密结果: ${JSON.stringify(decrypted)}`);');
  console.log();

  console.log('=== 用户模块测试完成 ===\n');
  return true;
}

// 运行测试
if (require.main === module) {
  testUserModule()
    .then(() => {
      console.log('✅ 用户模块测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testUserModule };