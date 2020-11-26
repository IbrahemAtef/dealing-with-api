const express = require('express');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.use(express.json({ extended : false}));

// List of posts
app.get('/api/posts', (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((result) => {
        res.json(result.data);
    }).catch((err) => {
        res.json({error: err.message})
    });
})

// Get Single Post
app.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((result) => {
        res.json(result.data);
    }).catch((err) => {
        res.json({error: err.message})
    });
})

// Add a post to the list
app.post('/api/posts/addPost', (req, res) => {
    const {userId, title, body} = req.body;
    let post = {userId, title, body};
    axios.post(`https://jsonplaceholder.typicode.com/posts`, post)
    .then((result) => {
        res.json(result.data);
    }).catch((err) => {
        res.json({error: err.message})
    });
})

// Get Comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
    const {id} = req.params;
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((result) => {
        res.json(result.data);
    }).catch((err) => {
        res.json({error: err.message})
    });
})

// update a post in the list
app.put('/api/posts/:id/updatePost', (req, res) => {
    const {id} = req.params;
    const {userId, title, body} = req.body;
    let post = {userId, title, body};
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, post)
    .then((result) => {
        res.json(result.data);
    }).catch((err) => {
        res.json({error: err.message})
    });
})

// delete a post from the list
app.delete('/api/posts/:id/deletePost', (req, res) => {
    const {id} = req.params;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((result) => {
        res.send("Post has been deleted")
    }).catch((err) => {
        res.json({error: err.message})
    });
})

// get all posts for a single user
app.get('/api/posts/user/:userId', (req, res) => {
    const {userId} = req.params;
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((result) => {
        res.json(result.data);
    }).catch((err) => {
        res.json({error: err.message})
    });
})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));