// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/vuejs.md#vuejs
module.exports = config => {
  config.set({
    mutate: ['src/httpClient.js', 'src/**/*.vue'],
    mutator: 'vue',
    coverageAnalysis: 'off',
    commandRunner: {
      command: 'npx vue-cli-service test:unit'
    }
  })
}
