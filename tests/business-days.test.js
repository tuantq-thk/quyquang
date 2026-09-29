import test from 'node:test';
import assert from 'node:assert/strict';
import { workingDaysRemaining } from '../src/business-days.js';

test('counts weekdays from 29 September through the final day on 15 October 2026', () => {
  assert.equal(workingDaysRemaining('2026-09-29', '2026-10-15'), 12);
});

test('counts the final work day but does not count today', () => {
  assert.equal(workingDaysRemaining('2026-09-29', '2026-09-30'), 1);
  assert.equal(workingDaysRemaining('2026-09-29', '2026-09-29'), 0);
});

test('skips Saturday and Sunday', () => {
  assert.equal(workingDaysRemaining('2026-10-02', '2026-10-05'), 1);
});

test('returns -1 after the last day has passed', () => {
  assert.equal(workingDaysRemaining('2026-10-16', '2026-10-15'), -1);
});
