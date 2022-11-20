let posts = require('./demo/posts.json');
const _max = require('lodash/maxBy');
const path = require('path');
const fsPromises = require('fs').promises;

module.exports = {
    findPosts: () => posts,
    getPost: (id) => posts.find((p) => p.id === parseInt(id)),
    savePost: async (post) => {
        posts = posts.filter((p) => p.id !== post.id);
        posts.push(post);
        await fsPromises.writeFile(path.join(__dirname, 'demo', 'posts.json'), JSON.stringify(posts));
        return post;
    },
    deletePost: async (id) => {
        posts = posts.filter((p) => p.id !== id);
        await fsPromises.writeFile(path.join(__dirname, 'demo', 'posts.json'), JSON.stringify(posts));
    },
    newPostId: () => {
        return _max(posts, (p) => p.id).id + 1;
    },
};
