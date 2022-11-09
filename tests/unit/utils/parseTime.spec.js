import { parseTime } from '@/utils/index.js'

describe('Utils:parseTime', () => {
  const d = new Date('2022-11-9 14:58:30') // "2022-11-9 14:58:30"
  it('timestamp', () => {
    expect(parseTime(d)).toBe('2022-11-9 14:58:30')
  })
  it('timestamp string', () => {
    expect(parseTime((d + ''))).toBe('2022-11-9 14:58:30')
  })
  it('ten digits timestamp', () => {
    expect(parseTime((d / 1000).toFixed(0))).toBe('2022-11-9 14:58:30')
  })
  it('new Date', () => {
    expect(parseTime(new Date(d))).toBe('2022-11-9 14:58:30')
  })
  it('format', () => {
    expect(parseTime(d, '{y}-{m}-{d} {h}:{i}')).toBe('2022-11-9 14:58')
    expect(parseTime(d, '{y}-{m}-{d}')).toBe('2022-11-9')
    expect(parseTime(d, '{y}/{m}/{d} {h}-{i}')).toBe('2022/11/9 14-58')
  })
  it('get the day of the week', () => {
    expect(parseTime(d, '{a}')).toBe('五') // 星期五
  })
  it('get the day of the week', () => {
    expect(parseTime(+d + 1000 * 60 * 60 * 24 * 2, '{a}')).toBe('日') // 星期日
  })
  it('empty argument', () => {
    expect(parseTime()).toBeNull()
  })

  it('null', () => {
    expect(parseTime(null)).toBeNull()
  })
})
