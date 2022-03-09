const db = {
  users: [],
  articles: [],
};

for (let i = 0; i < 5; i++) {
  db.users.push({
    id: i,
    name: `userName-${i}`,
  });
}

for (let i = 0; i < 5; i++) {
  db.articles.push({
    id: i,
    title: `articleTitle-${i}`,
    author: {
      id: i % 3,
      name: `userName-${i % 3}`,
    },
  });
}

console.log(JSON.stringify(db));
