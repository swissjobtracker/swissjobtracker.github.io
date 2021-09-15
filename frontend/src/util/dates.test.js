import dates from './dates'

test('formatDate formats new Date("2021-01-01")', () => {
  expect(dates.formatDate(new Date('2021-01-01'))).toBe('2021-01-01')
})

test('formatDate formats new Date("2021-10-10")', () => {
  expect(dates.formatDate(new Date('2021-10-10'))).toBe('2021-10-10')
})
