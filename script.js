const PHASE = 'impression'; // 可以改成 'result' 表示第二輪投票

const STORAGE_KEY = `vote_${PHASE}`;
const isAdmin = window.location.search.includes('admin=1');

const vote = (side) => {
  if (localStorage.getItem(STORAGE_KEY)) {
    document.getElementById('status').innerText = '你已經投過票囉！';
    return;
  }
  fetch(`https://winddebatevote-default-rtdb.firebaseio.com/${PHASE}/${side}.json`, {
    method: 'POST',
    body: JSON.stringify(true)
  }).then(() => {
    localStorage.setItem(STORAGE_KEY, side);
    document.getElementById('status').innerText = '投票成功！謝謝你！';
  });
};

const showResults = () => {
  Promise.all(['pro', 'con'].map(side =>
    fetch(`https://winddebatevote-default-rtdb.firebaseio.com/${PHASE}/${side}.json`).then(res => res.json())
  )).then(([pro, con]) => {
    const proVotes = pro ? Object.keys(pro).length : 0;
    const conVotes = con ? Object.keys(con).length : 0;
    document.getElementById('results').innerHTML = `
      <p>正方：${proVotes} 票</p>
      <p>反方：${conVotes} 票</p>
    `;
  });
};

if (isAdmin) {
  document.getElementById('admin-section').style.display = 'block';
}