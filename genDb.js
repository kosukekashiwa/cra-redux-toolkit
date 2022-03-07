const db = {
  sample: [],
};

for (let i = 0; i < 5; i++) {
  db.sample.push({
    id: i,
    name: 'hoge' + i,
  });
}

console.log(JSON.stringify(db));
