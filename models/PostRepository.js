const dbPromise = require('./DbConnection');

const postRepository = {
    findPosts: async () => {
        const connection = await dbPromise;
        let [rows] = await connection.query('');
        return rows;
    },
    getPost: async (id) => {
        const connection = await dbPromise;
        let [rows] = await connection.query('');
        return rows.length > 0 ? rows[0] : null;
    },
    savePost: async (post) => {
        const connection = await dbPromise;
        let oldPost = post.id ? await postRepository.getPost(post.id) : null;
        if (oldPost) {
            await connection.query('', []);
            return post.id;
        } else {
            delete post.id;
            let [results] = await connection.query('');
            return results.insertId;
        }
    },
    deletePost: async (id) => {
        const connection = await dbPromise;
        await connection.query('');
    },
};

module.exports = postRepository;
