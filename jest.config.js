
/*
*                             < 欲上青天揽明月>
*     配置参考:
*     https://jestjs.io/docs/en/configuration;
*     https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/
*
*     添加以下依赖包可使用 jest 单元测试的功能,在某些时刻你可能不是很需要他, 默认没有这些依赖
*     依赖包:
*         "jest": "^24.9.0",
*        "babel-core": "^7.0.0-bridge.0",
*        "babel-jest": "^24.9.0",
*        "vue-jest": "^3.0.4",
*        "vue-test-utils": "^1.0.0-beta.11",
*        "identity-obj-proxy": "^3.0.0",
*
* */

module.exports = {
   verbose: true,
   'moduleNameMapper': {
      '^vue$': 'vue/dist/vue.common.js',
      // '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
      '\\.(css|less)$': 'identity-obj-proxy',
      '^CSS(.*)$': '<rootDir>/src/assets/css$1'
   },
   'moduleFileExtensions': [
      'js',
      'vue'
   ],

   'transform': {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/unit/fileTransformer.js'
   },

};