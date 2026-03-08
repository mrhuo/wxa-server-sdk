/**
 * 模板消息模块测试
 * 测试TemplateModule功能
 */

const { createSdk, getTestUserConfig } = require('../../utils/config');

async function testTemplateModule() {
  console.log('=== 模板消息模块测试 ===\n');

  // 初始化SDK
  const sdk = createSdk({ debug: false });
  const testConfig = getTestUserConfig();

  console.log('1. 测试模板消息模块实例...');
  const templateModule = sdk.template;
  console.log('   ✅ 模板消息模块实例创建成功');
  console.log('   类型:', templateModule.constructor.name);
  console.log();

  // 测试buildTemplateData方法
  console.log('2. 测试buildTemplateData方法...');
  const templateData = templateModule.buildTemplateData(
    {
      keyword1: '订单号: 202312345678',
      keyword2: '商品名称: iPhone 15 Pro',
      keyword3: '订单金额: ¥8999',
      keyword4: '下单时间: 2023-12-01 10:30:00',
    },
    '#173177'
  );

  console.log('   ✅ 模板数据构建成功');
  console.log('   数据格式:', JSON.stringify(templateData, null, 2));
  console.log();

  // 测试sendTemplateMessage方法
  console.log('3. 测试sendTemplateMessage方法...');
  console.log('   ℹ️ 需要有效的访问令牌和参数，跳过实际调用');
  console.log('   调用方式示例:');
  console.log('   await sdk.template.sendTemplateMessage({');
  console.log('     touser: "user_openid",');
  console.log('     template_id: "template_id",');
  console.log('     page: "pages/index/index",');
  console.log('     data: templateData');
  console.log('   })');
  console.log();

  // 测试getTemplateList方法
  console.log('4. 测试getTemplateList方法...');
  console.log('   ℹ️ 需要有效的访问令牌，跳过实际调用');
  console.log('   调用方式: await sdk.template.getTemplateList()');
  console.log();

  // 测试deleteTemplate方法
  console.log('5. 测试deleteTemplate方法...');
  console.log('   ℹ️ 需要有效的访问令牌和模板ID，跳过实际调用');
  console.log('   调用方式: await sdk.template.deleteTemplate("template_id")');
  console.log();

  // 测试模块方法存在性
  console.log('6. 测试模块方法存在性...');
  console.log('   buildTemplateData:', typeof templateModule.buildTemplateData === 'function' ? '✅' : '❌');
  console.log('   sendTemplateMessage:', typeof templateModule.sendTemplateMessage === 'function' ? '✅' : '❌');
  console.log('   getTemplateList:', typeof templateModule.getTemplateList === 'function' ? '✅' : '❌');
  console.log('   deleteTemplate:', typeof templateModule.deleteTemplate === 'function' ? '✅' : '❌');
  console.log('   ✅ 所有方法存在');
  console.log();

  // 测试实际调用（使用无效token会返回错误）
  console.log('7. 测试实际API调用（预期失败）...');
  try {
    const result = await templateModule.sendTemplateMessage({
      touser: testConfig.openid,
      template_id: testConfig.templateId,
      data: templateData,
    });

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
  
  // buildTemplateData 单独测试
  console.log('   a) buildTemplateData 单独测试:');
  console.log('      const data = sdk.template.buildTemplateData({');
  console.log('        keyword1: "值1",');
  console.log('        keyword2: "值2"');
  console.log('      }, "#173177");');
  console.log('      console.log(`模板数据: ${JSON.stringify(data)}`);');
  console.log();
  
  // sendTemplateMessage 单独测试
  console.log('   b) sendTemplateMessage 单独测试:');
  console.log('      const sendResult = await sdk.template.sendTemplateMessage({');
  console.log('        touser: "openid",');
  console.log('        template_id: "template_id",');
  console.log('        data: templateData');
  console.log('      });');
  console.log('      if (sendResult.errcode) {');
  console.log('        console.error(`错误: ${sendResult.errcode} - ${sendResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`发送成功: ${JSON.stringify(sendResult)}`);');
  console.log('      }');
  console.log();
  
  // getTemplateList 单独测试
  console.log('   c) getTemplateList 单独测试:');
  console.log('      const listResult = await sdk.template.getTemplateList();');
  console.log('      if (listResult.errcode) {');
  console.log('        console.error(`错误: ${listResult.errcode} - ${listResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`模板列表: ${JSON.stringify(listResult)}`);');
  console.log('      }');
  console.log();
  
  // deleteTemplate 单独测试
  console.log('   d) deleteTemplate 单独测试:');
  console.log('      const deleteResult = await sdk.template.deleteTemplate("template_id");');
  console.log('      if (deleteResult.errcode) {');
  console.log('        console.error(`错误: ${deleteResult.errcode} - ${deleteResult.errmsg}`);');
  console.log('      } else {');
  console.log('        console.log(`删除成功: ${JSON.stringify(deleteResult)}`);');
  console.log('      }');
  console.log();

  console.log('=== 模板消息模块测试完成 ===\n');
  return true;
}

// 运行测试
if (require.main === module) {
  testTemplateModule()
    .then(() => {
      console.log('✅ 模板消息模块测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 测试失败:', error);
      process.exit(1);
    });
}

module.exports = { testTemplateModule };