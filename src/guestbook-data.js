export const extractGuestbookMessages = (record) => {
  if (Array.isArray(record)) return record;
  if (record && Array.isArray(record.messages)) return record.messages;
  return [];
};
