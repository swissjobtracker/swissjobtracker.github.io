

module.exports = api => {
  return {
    env: {
      test: {
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      }
    },
    presets: [
      [
        '@quasar/babel-preset-app',
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {}
      ]
    ]
  }
}

