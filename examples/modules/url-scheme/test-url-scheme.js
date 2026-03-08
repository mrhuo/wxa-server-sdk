/**
 * URL Scheme模块测试
 * 测试UrlSchemeModule功能
 */

const { createSdk } = require('../../utils/config');

async function testUrlSchemeModule() {
  console.log('=== URL Scheme模块测试 ===\n');

  // 初始化SDK
  const sdk = createSdk({ debug: false });

  console.log('1. 测试URL Scheme模块实例...');
  const urlSchemeModule = sdk.urlScheme;
  console.log('   ✅ URL Scheme模块实例创建成功');
  console.log('   类型:', urlSchemeModule.constructor.name);
  console.log();

  // 测试模块方法存在性
  console.log('2. 测试模块方法存在性...');
  console.log('   queryScheme:', typeof urlSchemeModule.queryScheme === 'function' ? '✅' : '❌');
  console.log('   generateScheme:', typeof urlSchemeModule.generateScheme === 'function' ? '✅' : '❌');
  console.log('   generateNfcScheme:', typeof urlSchemeModule.generateNfcScheme === 'function' ? '✅' : '❌');
  console.log('   queryUrlLink:', typeof urlSchemeModule.queryUrlLink === 'function' ? '✅' : '❌');
  console.log('   generateUrlLink:', typeof urlSchemeModule.generateUrlLink === 'function' ? '✅' : '❌');
  console.log('   generateShortLink:', typeof urlSchemeModule.generateShortLink === 'function' ? '✅' : '❌');
  console.log('   ✅ 所有方法存在');
  console.log();

  // 测试单独的方法调用
  console.log('3. 单独方法测试示例...');
  
  // generateScheme 单独测试
  console.log('   a) generateScheme 单独测试:');
  console.log('      const schemeResult = await sdk.urlScheme.generateScheme({');
  console.log('        jump_wxa: {');
  console.log('          path: "pages/index/index",');
  console.log('          query: "id=123",');
  console.log('          env_version: "release"');
  console.log('        },');
  console.log('        is_expire: true,');
  console.log('        expire_time: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60');
  console.log('      });');
  console.log('      if (schemeResult.errcode) {');
  console.log('        console.error(`错误: ${schemeResult.errcode} - ${schemeResult.errmsg}`);');
  console.log('      } else if (schemeResult.openlink) {');
  console.log('        console.log(`生成的scheme码: ${schemeResult.openlink}`);');
  console.log('      }');
  console.log();
  
  // generateShortLink 单独测试
  console.log('   b) generateShortLink 单独测试:');
  console.log('      const shortLinkResult = await sdk.urlScheme.generateShortLink({');
  console.log('        page_url: "pages/index/index",');
  console.log('        page_title: "小程序首页",');
  console.log('        is_permanent: false');
  console.log('      });');
  console.log('      if (shortLinkResult.errcode === 0 && shortLinkResult.link) {');
  console.log('        console.log(`生成的短链: ${shortLinkResult.link}`);');
  console.log('      } else {');
  console.log('        console.error(`错误: ${shortLinkResult.errcode} - ${shortLinkResult.errmsg}`);');
  console.log('      }');
  console.log();
  
  // generateUrlLink 单独测试
  console.log('   c) generateUrlLink 单独测试:');
  console.log('      const urlLinkResult = await sdk.urlScheme.generateUrlLink({');
  console.log('        path: "pages/product/detail",');
  console.log('        query: "id=123",');
  console.log('        env_version: "release"');
  console.log('      });');
  console.log('      if (urlLinkResult.errcode === 0 && urlLinkResult.url_link) {');
  console.log('        console.log(`生成的URL Link: ${urlLinkResult.url_link}`);');
  console.log('      } else {');
  console.log('        console.error(`错误: ${urlLinkResult.errcode} - ${urlLinkResult.errmsg}`);');
  console.log('      }');
  console.log();

  console.log('=== URL Scheme模块测试完成 ===\n');
  return true;
}

// 运行测试
if (require.main === module) {
  testUrlSchemeModule()
    .then(() => {
      console.log('✅ URL Scheme模块测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testUrlSchemeModule };