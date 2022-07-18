import { getFakeData } from '../api/fakeapi'
import cantons from '../util/cantons'
import tsutils from './tsutils'

test('tsToMap', () => {
  expect(tsutils.tsToMap(getFakeData(cantons, 10, true), new Date('2021-01-01'))).toMatchSnapshot()
})

test('tsToLine', () => {
  expect(tsutils.tsToLine(getFakeData(cantons, 10, true))).toMatchSnapshot()
})
