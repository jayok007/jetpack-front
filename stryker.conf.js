module.exports = config => {
  config.set({
    mutate: ['src/httpClient.js', 'src/**/*.vue'],
    mutator: 'vue',
    coverageAnalysis: 'off',
    commandRunner: {
      command: 'npx vue-cli-service test:unit'
    },
    thresholds: {
      break: 65
    }
  })
}
