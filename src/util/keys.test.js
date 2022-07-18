import keys from './keys'

test('getSingleKey', () => {
  expect(keys.getSingleKey({
    type: 'canton',
    id: 'zh'
  }, 'main')).toBe('ch.kof.x28.stuff.canton.zh.main')
})

test('getKeys with 2 arrays', () => {
  expect(keys.getKeys([{
    type: 'canton',
    id: 'ag'
  },
  {
    type: 'canton',
    id: 'zh'
  }], ['main', 'other'])).toEqual([
    'ch.kof.x28.stuff.canton.ag.main',
    'ch.kof.x28.stuff.canton.ag.other',
    'ch.kof.x28.stuff.canton.zh.main',
    'ch.kof.x28.stuff.canton.zh.other',
  ])
})

test('getKeys with single series', () => {
  expect(keys.getKeys({
      type: 'canton',
      id: 'ag'
    }, ['main', 'other'])).toEqual([
      'ch.kof.x28.stuff.canton.ag.main',
      'ch.kof.x28.stuff.canton.ag.other'
    ])
})

test('getKeys with single indicator', () => {
  expect(keys.getKeys([{
    type: 'canton',
    id: 'ag'
  },
  {
    type: 'canton',
    id: 'zh'
  }], 'otter')).toEqual([
    'ch.kof.x28.stuff.canton.ag.otter',
    'ch.kof.x28.stuff.canton.zh.otter'
  ])
})
