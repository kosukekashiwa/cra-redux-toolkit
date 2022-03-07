const db = {
  users: [],
};

for (let i = 0; i < 5; i++) {
  db.users.push({
    id: i,
    name: 'userName' + i,
  });
}

console.log(JSON.stringify(db));
