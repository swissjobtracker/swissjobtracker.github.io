import keys from './keys'

test('getSingleKey', () => {
  expect(keys.getSingleKey({
    by: {
      value: 'canton'
    },
    byvalue: {
      value: 'zh'
    },
    type: {
      value: 'idx'
    }
  })).toBe('ch.kof.jobtracker.canton.zh.idx')
})

test('getKeys with single series', () => {
  expect(keys.getKeys({
    by: {
      value: 'canton'
    },
    byvalue: {
      value: 'zh'
    },
    type: {
      value: 'idx'
    }
  })).toEqual([
      'ch.kof.jobtracker.canton.zh.idx'
    ])
})

test('getKeys with single indicator', () => {
  expect(keys.getKeys([{
    by: {
      value: 'canton'
    },
    byvalue: {
      value: 'ag'
    },
    type: {
      value: 'idx'
    }
  },
  {
    by: {
      value: 'canton'
    },
    byvalue: {
      value: 'zh'
    },
    type: {
      value: 'idx'
    }
  }])).toEqual([
    'ch.kof.jobtracker.canton.ag.idx',
    'ch.kof.jobtracker.canton.zh.idx'
  ])
})

test('getSingleKey returns proper total key', () => {
  expect(keys.getSingleKey({
    by: {
      value: 'total'
    },
    byvalue: {
      value: 'total'
    },
    type: {
      value: 'idx'
    }
  })).toEqual('ch.kof.jobtracker.total.idx')
})

test('getSingleKey lowercases the result', () => {
  expect(keys.getSingleKey({
    by: {
      value: 'noga'
    },
    byvalue: {
      value: 3
    },
    type: {
      value: 'BIG'
    }
  })).toEqual('ch.kof.jobtracker.noga.3.big')
})
