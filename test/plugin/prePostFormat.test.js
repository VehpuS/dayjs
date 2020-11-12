import MockDate from 'mockdate'
// import moment from 'moment'
import dayjs from '../../src'
import prePostFormat from '../../src/plugin/prePostFormat'
import utc from '../../src/plugin/utc'
import arraySupport from '../../src/plugin/arraySupport'

dayjs.extend(utc)
dayjs.extend(arraySupport)
dayjs.extend(prePostFormat)

const symbolMap = {
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&',
  8: '*',
  9: '(',
  0: ')'
}
const numberMap = {
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0'
}

beforeEach(() => {
  MockDate.set(new Date())
  dayjs.locale('symbol', {
    preparse(string) {
      return string.replace(/[!@#$%^&*()]/g, match => numberMap[match])
    },
    postformat(string) {
      return string.replace(/\d/g, match => symbolMap[match])
    }
  })
})

afterEach(() => {
  MockDate.reset()
  dayjs.locale('symbol', null)
})

describe('preparse and postformat', () => {
  describe('transform', () => {
    const TEST_DATE = '@)!@-)*-@&'
    it('preparse string + format', () =>
      expect(dayjs.utc(TEST_DATE, 'YYYY-MM-DD').unix()).toBe(1346025600))
    it('preparse ISO8601 string', () =>
      expect(dayjs.utc(TEST_DATE).unix()).toBe(1346025600))
    it('postformat', () =>
      expect(dayjs.utc().format('YYYY-MM-DD')).toBe(TEST_DATE))
  })

  describe('transform from', () => {
    const start = dayjs([2007, 1, 28])
    it('postformat should work on moment.fn.from', () =>
      expect(start.from(dayjs([2007, 1, 28]).add({ s: 90 }), true)).toBe('@ minutes'))

    it('postformat should work on moment.fn.fromNow', () =>
      expect(dayjs()
        .add(6, 'd')
        .fromNow(true)).toBe('^ days'))

    it('postformat should work on moment.duration.fn.humanize', () =>
      expect(dayjs.duration(10, 'h').humanize()).toBe('!) hours'))
  })
})

// test('transform from', (assert) => {
//   const start = moment([2007, 1, 28])

//   assert.equal(
//     start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
//     '@ minutes',
//     'postformat should work on moment.fn.from'
//   )
//   assert.equal(
//     moment()
//       .add(6, 'd')
//       .fromNow(true),
//     '^ days',
//     'postformat should work on moment.fn.fromNow'
//   )
//   assert.equal(
//     moment.duration(10, 'h').humanize(),
//     '!) hours',
//     'postformat should work on moment.duration.fn.humanize'
//   )
// })

// test('calendar day', (assert) => {
//   const a = moment()
//     .hours(12)
//     .minutes(0)
//     .seconds(0)

//   assert.equal(
//     moment(a).calendar(),
//     'Today at !@:)) PM',
//     'today at the same time'
//   )
//   assert.equal(
//     moment(a)
//       .add({ m: 25 })
//       .calendar(),
//     'Today at !@:@% PM',
//     'Now plus 25 min'
//   )
//   assert.equal(
//     moment(a)
//       .add({ h: 1 })
//       .calendar(),
//     'Today at !:)) PM',
//     'Now plus 1 hour'
//   )
//   assert.equal(
//     moment(a)
//       .add({ d: 1 })
//       .calendar(),
//     'Tomorrow at !@:)) PM',
//     'tomorrow at the same time'
//   )
//   assert.equal(
//     moment(a)
//       .subtract({ h: 1 })
//       .calendar(),
//     'Today at !!:)) AM',
//     'Now minus 1 hour'
//   )
//   assert.equal(
//     moment(a)
//       .subtract({ d: 1 })
//       .calendar(),
//     'Yesterday at !@:)) PM',
//     'yesterday at the same time'
//   )
// })
