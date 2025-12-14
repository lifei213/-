module.exports = {
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  clearMocks: true,
  coverageDirectory: './coverage',
  collectCoverage: false,
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
  setupFiles: ['dotenv/config'],
  testMatch: ['**/__tests__/**/*.(test|spec).js'],
  // 测试报告配置
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-reports',
        outputName: 'junit-report.xml'
      }
    ],
    [
      'jest-html-reporters',
      {
        publicPath: './test-reports/html-report',
        filename: 'test-report.html',
        expand: true,
        pageTitle: '广西自动化学会会员管理系统API测试报告',
        logoImgPath: '',
        hideIcon: true,
        customInfos: [
          {
            title: '项目信息',
            value: '广西自动化学会会员管理系统后端API'
          }
        ]
      }
    ]
  ]
};