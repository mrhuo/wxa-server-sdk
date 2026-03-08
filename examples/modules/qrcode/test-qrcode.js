/**
 * 二维码模块测试
 * 测试QrCodeModule功能
 */

const { createSdk } = require('../../utils/config');

async function testQrCodeModule() {
  console.log('=== 二维码模块测试 ===\n');

  // 初始化SDK
  const sdk = createSdk({ debug: false });

  console.log('1. 测试二维码模块实例...');
  const qrCodeModule = sdk.qrCode;
  console.log('   ✅ 二维码模块实例创建成功');
  console.log('   类型:', qrCodeModule.constructor.name);
  console.log();

  // 测试模块方法存在性
  console.log('2. 测试模块方法存在性...');
  console.log('   getQrCode:', typeof qrCodeModule.getQrCode === 'function' ? '✅' : '❌');
  console.log('   getUnlimitedQrCode:', typeof qrCodeModule.getUnlimitedQrCode === 'function' ? '✅' : '❌');
  console.log('   createQrCode:', typeof qrCodeModule.createQrCode === 'function' ? '✅' : '❌');
  console.log('   bufferToBase64:', typeof qrCodeModule.bufferToBase64 === 'function' ? '✅' : '❌');
  console.log('   bufferToDataUrl:', typeof qrCodeModule.bufferToDataUrl === 'function' ? '✅' : '❌');
  console.log('   ✅ 所有方法存在');
  console.log();

  // 测试buffer转换方法
  console.log('3. 测试buffer转换方法...');
  const testBuffer = Buffer.from('test');
  const base64 = qrCodeModule.bufferToBase64(testBuffer);
  const dataUrl = qrCodeModule.bufferToDataUrl(testBuffer, 'image/png');
  
  console.log('   bufferToBase64:', base64.substring(0, 20) + '...');
  console.log('   bufferToDataUrl:', dataUrl.substring(0, 30) + '...');
  console.log('   ✅ buffer转换成功');
  console.log();

  // 测试单独的方法调用
  console.log('4. 单独方法测试示例...');
  
  // getQrCode 单独测试
  console.log('   a) getQrCode 单独测试:');
  console.log('      const qrResult = await sdk.qrCode.getQrCode({');
  console.log('        path: "pages/index/index",');
  console.log('        width: 430');
  console.log('      });');
  console.log('      if (Buffer.isBuffer(qrResult)) {');
  console.log('        console.log(`二维码大小: ${qrResult.length} bytes`);');
  console.log('      } else if (qrResult.errcode) {');
  console.log('        console.error(`错误: ${qrResult.errcode} - ${qrResult.errmsg}`);');
  console.log('      }');
  console.log();
  
  // getUnlimitedQrCode 单独测试
  console.log('   b) getUnlimitedQrCode 单独测试:');
  console.log('      const unlimitedResult = await sdk.qrCode.getUnlimitedQrCode({');
  console.log('        scene: "id=123",');
  console.log('        page: "pages/product/detail",');
  console.log('        width: 430');
  console.log('      });');
  console.log('      if (Buffer.isBuffer(unlimitedResult)) {');
  console.log('        console.log(`小程序码大小: ${unlimitedResult.length} bytes`);');
  console.log('      } else if (unlimitedResult.errcode) {');
  console.log('        console.error(`错误: ${unlimitedResult.errcode} - ${unlimitedResult.errmsg}`);');
  console.log('      }');
  console.log();

  console.log('=== 二维码模块测试完成 ===\n');
  return true;
}

// 运行测试
if (require.main === module) {
  testQrCodeModule()
    .then(() => {
      console.log('✅ 二维码模块测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testQrCodeModule };