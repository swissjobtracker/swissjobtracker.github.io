import {cantons, getCantonByCode} from './cantons'

test('cantons definition is intact', () => {
  expect(cantons).toMatchSnapshot()
})

test('getCantonByCode returns canton labels', () => {
  expect(getCantonByCode('TI')).toEqual('Ticino')
})

test('getCantonByCode returns undefined when not found', () => {
  expect(getCantonByCode('xx')).toBeUndefined()
})
