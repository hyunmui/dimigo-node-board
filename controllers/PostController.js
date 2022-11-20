const postRepository = require('../models/PostRepository');
const nunjucks = require('nunjucks');
const Post = require('../entity/post');

const postController = {
    async index(req, res) {
        res.render('post/index.html.njk', { posts: await postRepository.findPosts() });
    },
    async view(req, res) {
        const post = await postRepository.getPost(req.params.id);
        if (!post) {
            res.status(404).send(nunjucks.render('error.html.njk'));
            return;
        }

        res.render('post/view.html.njk', { post: post, csrfToken: req.csrfToken() });
    },
    async new(req, res) {
        postController.editPost(res, new Post(), req.csrfToken());
    },
    async edit(req, res) {
        const post = await postRepository.getPost(req.params.id);
        if (!post) {
            res.status(404).send(nunjucks.render('error.html.njk'));
            return;
        }
        postController.editPost(res, post, req.csrfToken());
    },
    editPost(res, post, csrfToken) {
        res.render('post/edit.html.njk', { post: post, csrfToken });
    },
    async save(req, res) {
        let post = req.body.id ? await postRepository.getPost(req.body.id) : new Post();
        if (!post) {
            res.status(400).send('잘못된 요청입니다');
            return;
        }

        post.title = req.body.title;
        post.content = req.body.content;
        post.authorId = req.session.loginMember.memberId;
        post.viewCount = post.viewCount ?? 0;
        post.writeDate = new Date();
        const postId = await postRepository.savePost(post);
        res.redirect('/post/' + postId);
    },
    delete(req, res) {
        postRepository.deletePost(parseInt(req.body.postId));
        res.status(200).redirect('/posts');
    },
};

module.exports = postController;
