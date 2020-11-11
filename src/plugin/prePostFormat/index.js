// Plugin template from https://day.js.org/docs/en/plugin/plugin

// https://github.com/moment/moment/blob/develop/src/lib/moment/format.js
// https://github.com/moment/moment/blob/e047716131e9f1650504a194b11b5405b098c603/src/test/moment/preparse_postformat.js
// https://github.com/moment/moment/blob/b7ec8e2ec068e03de4f832f28362675bb9e02261/moment.js
// https://github.com/moment/moment/blob/develop/src/locale/ar.js

// https://github.com/iamkun/dayjs/blob/dev/src/locale/ar.js

export default (
  option,
  dayjsClass
  // dayjsFactory
) => {
  // extend dayjs()
  // e.g. add dayjs().isSameOrBefore()
  dayjsClass.prototype.test = function () {
    console.log('HELLO WORLD')
  }

  // extend dayjs
  // e.g. add dayjs.utc()
  // dayjsFactory.utc = arguments => {}

  // // overriding existing API
  // // e.g. extend dayjs().format()
  // const oldFormat = dayjsClass.prototype.format
  // dayjsClass.prototype.format = function(arguments) {
  //   // original format result
  //   const result = oldFormat.bind(this)(arguments)
  //   // return modified result
  // }
}
