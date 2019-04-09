// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/vuejs.md#vuejs
module.exports = function(config) {
  config.set({
    mutate: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue'],
    mutator: 'vue',
    testRunner: 'jest',
    jest: {
      // config: require('path/to/your/custom/jestConfig.js')
    },
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'off'
  })
}
