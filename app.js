const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let blogPosts = [
  { id: 1, title: 'First Post', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Post', content: 'This is the second blog post.' }
];

app.get('/posts', (req, res) => {
  res.send(blogPosts);
});

app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === postId);

  if (!post) {
    res.status(404).send({ error: 'Post not found' });
  } else {
    res.send(post);
  }
});

app.post('/posts', (req, res) => {
  const newPost = req.body;
  blogPosts.push(newPost);

  res.status(201).send(newPost);
});

app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const updatedPost = req.body;
  const postIndex = blogPosts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    res.status(404).send({ error: 'Post not found' });
  } else {
    blogPosts[postIndex] = updatedPost;
    res.send(updatedPost);
  }
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    res.status(404).send({ error: 'Post not found' });
  } else {
    blogPosts.splice(postIndex, 1);
    res.send({ message: 'Post deleted' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
