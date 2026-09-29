import { config } from './config.js';
import { workingDaysRemaining } from './business-days.js';
import { extractGuestbookMessages } from './guestbook-data.js';
import './style.css';

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const now = new Date();
const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const daysLeft = workingDaysRemaining(todayIso, config.lastDay);
const isLastDay = daysLeft === 0;
const headline = daysLeft > 0 ? `Còn ${daysLeft} ngày làm việc nữa` : isLastDay ? 'Last day is today!' : 'Đã sang chương mới rồi!';
const subline = daysLeft > 0 ? 'Đã trừ thứ Bảy và Chủ nhật. Ngày nghỉ cuối cùng đang đến gần!' : isLastDay ? 'Hôm nay ta cười, ôm nhau và giả vờ không khóc nhé.' : 'Kỷ niệm vẫn còn nguyên. Chỉ có lịch họp là bớt một người.';
const memories = config.memories.map((m,i)=>`<article class="memory reveal"><span class="memory-number">0${i+1}</span><div class="memory-emoji">${m.emoji}</div><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></article>`).join('');

document.querySelector('#app').innerHTML = `
  <header class="topbar"><a class="brand" href="#top"><span class="brand-mark">✳</span> ${esc(config.teamName).toUpperCase()}</a><a class="top-link" href="#guestbook">Gửi lời nhắn <span>↗</span></a></header>
  <main id="top">
    <section class="hero">
      <div class="hero-copy"><span class="eyebrow"><i></i> THÔNG BÁO KHẨN CẤP TỪ PHÒNG NHÂN SỰ CẢM XÚC</span><h1>OH NO!<br/><span>${esc(config.colleagueName)}</span><br/>SẮP BAY!</h1><p class="hero-intro">${esc(config.role)} chuẩn bị lên đường. Team đang xử lý sự cố nghiêm trọng: <strong>thiếu một người để tag khi có bug.</strong></p><div class="hero-actions"><a class="button" href="#memories">Xem hồ sơ huyền thoại <span>↓</span></a><span class="scribble">không ai được khóc<br/>trước 5 giờ chiều! <b>↘</b></span></div></div>
      <div class="hero-art"><div class="sunburst"></div><div class="portrait-card"><div class="portrait-head">${esc(config.nickname)}</div><div class="portrait"><span class="portrait-fallback" aria-hidden="true">😎</span><img src="./qq.png" alt="Ảnh của Vũ Huy Hoàng" onerror="this.hidden=true" /></div><div class="portrait-footer"><span>EMPLOYEE OF THE<br/>MOMENT</span><strong>★ ★ ★</strong></div></div><span class="sticker sticker-one">✌️<small>OUT OF<br/>OFFICE SOON</small></span><span class="sticker sticker-two">${esc(config.teamName)}<b>™</b></span><span class="doodle doodle-one">↗</span><span class="doodle doodle-two">✳</span></div>
    </section>
    <section class="countdown-band"><div><span class="label">ĐẾM NGƯỢC NGÀY LÀM VIỆC ĐẾN NGÀY TỰ DO</span><h2>${headline}</h2><p>${subline}</p></div><div class="countdown-stamp"><span>NGÀY LÀM VIỆC</span><b>${daysLeft > 0 ? String(daysLeft).padStart(2,'0') : '🎉'}</b><small>${daysLeft > 0 ? 'CÒN LẠI' : 'YAY!'}</small></div></section>
    <section class="memories section" id="memories"><div class="section-heading"><span class="eyebrow">BẰNG CHỨNG KHÔNG THỂ CHỐI CÃI</span><h2>Một nhân sự.<br/><span>Quá nhiều tài năng.</span></h2><p>Hội đồng đánh giá gồm những người từng được Hoàng cứu deadline.</p></div><div class="memory-grid">${memories}</div></section>
    <section class="guestbook section" id="guestbook"><div class="guestbook-heading"><span class="eyebrow">SỔ LƯU BÚT BẤT ĐẮC DĨ</span><h2>Team có vài lời.<br/><span>Và một ít drama.</span></h2><p class="guestbook-hint" id="storage-status" role="status">Đang tải lời nhắn…</p></div><form class="message-form" id="message-form"><label for="message-name">Tên của bạn</label><input id="message-name" name="name" maxlength="60" placeholder="Ví dụ: Lục Kiếm" required /><label for="message-text">Lời nhắn dành cho Hoàng</label><textarea id="message-text" name="message" maxlength="500" rows="4" placeholder="Viết một lời chúc, một kỷ niệm, hay một câu đùa nội bộ…" required></textarea><div class="form-footer"><span id="form-feedback" role="status"></span><button class="button" type="submit">Lưu lời nhắn <span>✦</span></button></div></form><div class="notes" id="notes-list" aria-live="polite"></div></section>
    <section class="finale"><div class="finale-confetti">✳　✦　✳　✦　✳</div><span class="eyebrow">CHƯƠNG TIẾP THEO ĐANG CHỜ</span><h2>Chúc Hoàng ${esc(config.nextAdventure)}!</h2><p>${esc(config.signOff)}</p><button id="party" class="button party-button">Bấm để gửi pháo giấy <span>✦</span></button><div class="signature">Thân ái và quyết thắng,<br/><b>${esc(config.teamName)}</b></div></section>
  </main><footer><span>MADE WITH 💛 BY ${esc(config.teamName).toUpperCase()}</span><a href="#top">Lên đầu trang ↑</a></footer>
`;

const storage = config.guestbook;
const notesList = document.querySelector('#notes-list');
const status = document.querySelector('#storage-status');
const initialMessages = config.messages.map((message, index) => ({
  ...message,
  createdAt: `2026-01-01T00:00:0${index}Z`,
  seed: true,
}));
let guestMessages = [...initialMessages];
const escapeForHtml = esc;
const renderMessages = () => {
  const sorted = [...guestMessages].sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));
  notesList.innerHTML = sorted.length ? sorted.map((m,i)=>`<article class="note" style="--tilt:${i%2===0?'-1.4':'1.3'}deg"><span class="tape"></span><p>“${escapeForHtml(m.text)}”</p><b>${escapeForHtml(m.from)}</b><small>${new Date(m.createdAt).toLocaleString('vi-VN')}</small></article>`).join('') : '<p class="empty-notes">Chưa có lời nhắn nào. Hãy là người mở hàng nhé! 🥳</p>';
};
const remoteEnabled = Boolean(storage.jsonBinId && storage.jsonBinAccessKey);
const localRead = () => { try { const value=JSON.parse(localStorage.getItem(storage.storageKey)||'[]'); return Array.isArray(value)?value:[]; } catch { return []; } };
const loadMessages = async () => {
  try {
    if(remoteEnabled) {
      const res=await fetch(`https://api.jsonbin.io/v3/b/${encodeURIComponent(storage.jsonBinId)}/latest`,{headers:{'X-Access-Key':storage.jsonBinAccessKey}});
      if(!res.ok) throw new Error('Không tải được sổ lưu bút từ JSONBin.');
      const data=await res.json(); guestMessages=[...initialMessages,...extractGuestbookMessages(data.record).filter(message=>!message.seed)];
      status.textContent='Lời nhắn đang được chia sẻ với mọi người.';
    } else {
      guestMessages=[...initialMessages,...localRead().filter(message=>!message.seed)];
      status.textContent='Đang lưu trên thiết bị này. Để chia sẻ lời nhắn, hãy cấu hình JSONBin và GitHub Actions Variables.';
    }
  } catch(error) { guestMessages=[...initialMessages,...localRead().filter(message=>!message.seed)]; status.textContent=`Không kết nối được nơi lưu chung. Đang hiển thị lời nhắn trên thiết bị này.`; }
  renderMessages();
};
document.querySelector('#message-form').addEventListener('submit', async (event) => {
  event.preventDefault(); const feedback=document.querySelector('#form-feedback'); const button=event.currentTarget.querySelector('button');
  const form=new FormData(event.currentTarget); const entry={from:String(form.get('name')).trim(),text:String(form.get('message')).trim(),createdAt:new Date().toISOString()};
  if(!entry.from||!entry.text) return;
  button.disabled=true; feedback.textContent='Đang lưu…';
  const updated=[entry,...guestMessages];
  try {
    if(remoteEnabled) {
      const res=await fetch(`https://api.jsonbin.io/v3/b/${encodeURIComponent(storage.jsonBinId)}`,{method:'PUT',headers:{'Content-Type':'application/json','X-Access-Key':storage.jsonBinAccessKey},body:JSON.stringify({messages:updated.filter(message=>!message.seed)})});
      if(!res.ok) throw new Error('Không lưu được lời nhắn lên JSONBin.');
    }
    localStorage.setItem(storage.storageKey,JSON.stringify(updated)); guestMessages=updated; renderMessages(); event.currentTarget.reset(); feedback.textContent='Đã lưu lời nhắn. Cảm ơn bạn! 💛';
  } catch(error) { feedback.textContent='Chưa lưu được. Kiểm tra kết nối hoặc quyền truy cập JSONBin rồi thử lại.'; }
  finally { button.disabled=false; }
});
loadMessages();
const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)} }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('#party').addEventListener('click', () => {
  for(let i=0;i<70;i++){const bit=document.createElement('i');bit.className='confetti';bit.style.left=Math.random()*100+'vw';bit.style.setProperty('--hue',Math.floor(Math.random()*360));bit.style.setProperty('--delay',Math.random()*.5+'s');bit.style.setProperty('--drift',(Math.random()*240-120)+'px');document.body.append(bit);setTimeout(()=>bit.remove(),2600)}
  document.querySelector('#party').innerHTML='Lời chúc đã được gửi! <span>💛</span>';
});
