import ts from './index'

test('getLineSeries has the correct header', () => {
  return ts.getLineSeries({
    type: {
      value: 'main',
    },
    by: {
      value: 'canton',
    },
    byvalue: {
      value: 'aa'
    }
  })
            .then((data) => {
              expect(data[0]).toEqual(['date', 'ch.kof.x28.stuff.canton.aa.main'])
            })
})
