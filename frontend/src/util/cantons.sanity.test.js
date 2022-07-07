import cantons from './cantons'

test('cantons definition is intact', () => {
  expect(cantons).toMatchSnapshot()
})
