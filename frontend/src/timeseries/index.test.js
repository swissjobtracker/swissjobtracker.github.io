import ts from './index'

test('getLineSeries has the correct header', () => {
  return ts.getLineSeries('aa', 'bb')
            .then((data) => {
              expect(data[0]).toEqual(['date', 'ch.kof.x28.stuff.aa.bb'])
            })
})
