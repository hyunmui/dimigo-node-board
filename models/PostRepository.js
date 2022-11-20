const dbPromise = require('./DbConnection');

const postRepository = {
    findPosts: async () => {
        const connection = await dbPromise;
        let [rows] = await connection.query(
            `select p.*, m.nickname as author
            from posts p
            join members m on p.authorId = m.memberId
        `
        );
        return rows;
    },
    getPost: async (id) => {
        const connection = await dbPromise;
        let [rows] = await connection.query('select * from posts where id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },
    savePost: async (post) => {
        const connection = await dbPromise;
        let oldPost = post.id ? await postRepository.getPost(post.id) : null;
        if (oldPost) {
            await connection.query('update posts set title = ?, content = ? where id = ?', [
                post.title,
                post.content,
                post.id,
            ]);
            return post.id;
        } else {
            delete post.id;
            let [results] = await connection.query('insert into posts set ?', post);
            return results.insertId;
        }
    },
    deletePost: async (id) => {
        const connection = await dbPromise;
        await connection.query('delete from posts where id = ?', [id]);
    },
};

module.exports = postRepository;
