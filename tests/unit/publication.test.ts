import { it, expect } from 'vitest';
import { torontoDate, formatCalendarDate } from '../../src/lib/content/dates';
import { publishable, sortPublished } from '../../src/lib/content/publication';
it('excludes drafts and future entries while including today', () => {
  expect(publishable({ draft: true, published: '2020-01-01' }, '2026-10-03')).toBe(false);
  expect(publishable({ draft: false, published: '2026-10-04' }, '2026-10-03')).toBe(false);
  expect(publishable({ draft: false, published: '2026-10-03' }, '2026-10-03')).toBe(true);
});
it('uses Toronto calendar day around UTC midnight and DST', () => {
  expect(torontoDate(new Date('2026-10-04T02:00:00Z'))).toBe('2026-10-03');
  expect(torontoDate(new Date('2026-03-08T06:00:00Z'))).toBe('2026-03-08');
  expect(torontoDate(new Date('2026-11-01T05:30:00Z'))).toBe('2026-11-01');
  expect(formatCalendarDate('2026-10-03')).toBe('October 3, 2026');
});
it('sorts date descending then slug ascending without mutating input', () => {
  const entries = [{ id: 'z', data: { published: '2026-10-03' } }, { id: 'a', data: { published: '2026-10-03' } }, { id: 'old', data: { published: '2020-01-01' } }];
  expect(sortPublished(entries).map(e => e.id)).toEqual(['a', 'z', 'old']); expect(entries[0].id).toBe('z');
});
