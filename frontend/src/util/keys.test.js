import keys from './keys'

test('getSingleKey', () => {
  expect(keys.getSingleKey('zh', 'main')).toBe('ch.kof.x28.stuff.zh.main')
})

test('getKeys with 2 arrays', () => {
  expect(keys.getKeys(['ag', 'zh'], ['main', 'other'])).toEqual([
    'ch.kof.x28.stuff.ag.main',
    'ch.kof.x28.stuff.ag.other',
    'ch.kof.x28.stuff.zh.main',
    'ch.kof.x28.stuff.zh.other',
  ])
})

test('getKeys with string canton', () => {
  expect(keys.getKeys('ag', ['main', 'other'])).toEqual([
    'ch.kof.x28.stuff.ag.main',
    'ch.kof.x28.stuff.ag.other'
  ])
})

test('getKeys with string indicator', () => {
  expect(keys.getKeys(['ag', 'zh'], 'otter')).toEqual([
    'ch.kof.x28.stuff.ag.otter',
    'ch.kof.x28.stuff.zh.otter'
  ])
})
