// Chỉnh nội dung landing page tại đây.
export const config = {
  colleagueName: 'Huy Hoàng',
  nickname: 'Hoàng đại hiệp',
  role: 'Đồng nghiệp hệ đa năng',
  lastDay: '2026-10-15', // YYYY-MM-DD
  teamName: 'Team Thất Kiếm Anh Hùng',
  nextAdventure: 'chinh phục một vũ trụ mới',
  signOff: 'Tụi mình sẽ nhớ bạn (và cả những lần bạn cứu production lúc 5 giờ chiều).',
  guestbook: {
    // Cấu hình qua .env.local khi chạy local hoặc GitHub Actions Variables khi deploy.
    jsonBinId: import.meta.env.VITE_JSONBIN_BIN_ID || '',
    jsonBinAccessKey: import.meta.env.VITE_JSONBIN_ACCESS_KEY || '',
    storageKey: 'last-day-is-today-guestbook-v1',
  },
  memories: [
    { emoji: '🧯', title: 'Cứu production', text: 'Khi mọi người bắt đầu hoảng, Hoàng bình tĩnh hỏi: “Đã thử xem log chưa?” rồi cứu cả buổi chiều.' },
    { emoji: '☕', title: 'Nạp pin đúng giờ', text: 'Máy pha cà phê biết Hoàng đến trước cả team. Có lẽ nó cũng sẽ nhớ Hoàng.' },
    { emoji: '🧠', title: 'Kho kiến thức sống', text: 'Từ câu hỏi nhỏ đến bug bí ẩn, Hoàng luôn có câu trả lời hoặc biết ai có câu trả lời.' },
  ],
  messages: [
    { from: 'Hội hay hỏi “xong chưa?”', text: 'Cảm ơn vì đã trả lời “sắp xong” bằng cả sự kiên nhẫn. Chúc hành trình mới ít họp, nhiều ngày nghỉ!' },
    { from: 'Đồng đội bàn bên', text: 'Chỗ ngồi sẽ trống, đồ ăn vặt thì vẫn phải chia. Chúc bạn đi đâu cũng gặp team tốt như tụi mình nhé!' },
    { from: 'Team Thất Kiếm Anh Hùng', text: 'Chúc Hoàng thành công rực rỡ. Nhớ ghé thăm, đặc biệt là những hôm có trà sữa.' },
  ],
};
