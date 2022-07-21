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
      value: 'main'
    }
  })).toBe('ch.kof.x28.stuff.canton.zh.main')
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
      value: 'main'
    }
  })).toEqual([
      'ch.kof.x28.stuff.canton.zh.main'
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
      value: 'main'
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
      value: 'main'
    }
  }], 'otter')).toEqual([
    'ch.kof.x28.stuff.canton.ag.main',
    'ch.kof.x28.stuff.canton.zh.main'
  ])
})
