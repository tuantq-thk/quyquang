import test from 'node:test';
import assert from 'node:assert/strict';
import { extractGuestbookMessages } from '../src/guestbook-data.js';

test('reads the new object format initialized with an empty messages array', () => {
  assert.deepEqual(extractGuestbookMessages({ messages: [] }), []);
});

test('reads messages from the new object format', () => {
  const messages = [{ from: 'Lan', text: 'Chúc may mắn!' }];
  assert.deepEqual(extractGuestbookMessages({ messages }), messages);
});

test('continues to read a legacy array bin', () => {
  const messages = [{ from: 'Minh', text: 'Sẽ nhớ bạn!' }];
  assert.deepEqual(extractGuestbookMessages(messages), messages);
});

test('returns an empty list for malformed bin contents', () => {
  assert.deepEqual(extractGuestbookMessages({ other: true }), []);
  assert.deepEqual(extractGuestbookMessages(null), []);
});
