
function vote(category, side) {
  const votedKey = category + '_voted';
  if (localStorage.getItem(votedKey)) {
    document.getElementById('status').textContent = '你已經投過票了！';
    return;
  }

  const ref = firebase.database().ref('votes/' + category + '/' + side);
  ref.transaction(current => (current || 0) + 1).then(() => {
    localStorage.setItem(votedKey, 'true');
    document.getElementById('status').textContent = '投票成功，謝謝你！';
  });
}
