module.exports = function() {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts")
  const dev = this.options.dev
  // Extend build
  this.extendBuild(config => {
    if(dev){
      // config.devtool = 'inline-source-map'
      console.log(config.devtool)
    }
    const tsLoader = {
      loader: "ts-loader",
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }
    // Add TypeScript loader
    config.module.rules.push(
      Object.assign(
        {
          test: /((client|server)\.js)|(\.tsx?)$/
        },
        tsLoader
      )
    )
    // Add TypeScript loader for vue files
    for (let rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders.ts = tsLoader
      }
    }
    // Add .ts extension in webpack resolve
    if (
      config.resolve.extensions.indexOf(".ts") ===
      -1
    ) {
      config.resolve.extensions.push(".ts")
    }
  })
}
