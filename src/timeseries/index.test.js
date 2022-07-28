import ts from './index'

test('getLineSeries has the correct header', () => {
  return ts.getLineSeries({
    type: {
      value: 'idx',
    },
    by: {
      value: 'canton',
    },
    byvalue: {
      value: 'aa'
    }
  })
            .then((data) => {
              expect(data[0]).toEqual(['date', 'ch.kof.jobtracker.canton.aa.idx'])
            })
})
