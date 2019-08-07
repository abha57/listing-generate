import * as express from 'express';
import postModel from './posts-model';
import Post from './post-interface';
import HttpException from '../exceptions/HttpException';
import validationMiddleware from '../middlewares/postDataValidation.middleware';
import CreatePostDto from './createPostDto';

class PostsController {
    public path = '/posts';
    public router = express.Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes(){
        this.router.get(this.path, this.getPosts);
        this.router.get(`${this.path}/:id`, this.getPostsById);
        this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
        this.router.patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost);
    }

    public getPosts = (request: express.Request, response: express.Response) => {
        console.log('in get post');
        postModel.find().then(posts => {
            console.log('psot', posts);
            response.send(posts);
        })
    }

    public getPostsById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        postModel.findById(id).then(post => {
            if(post){
                response.status(200).send(post);
            } else {
                next(new HttpException(404, 'Post not found.'));
            }
        })
    }

    public modifyPost(request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = request.params.id;
    const postData: Post = request.body;
    postModel.findByIdAndUpdate(id, postData, { new: true })
      .then(post => {
         if(post){
                response.status(200).send(post);
            } else {
                next(new HttpException(404, `Post with id:${id} not found.`));
            }
      })
    }

    public createPost = (request: express.Request, response: express.Response) => {
        const postData: Post = request.body;
        const createdPost = new postModel(postData);
        createdPost.save().then(savedPost => {
            response.send(savedPost);
        });
    }

    public deletePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        postModel.findByIdAndDelete(id).then( (successResponse) => {
            if(successResponse){
                response.send(200);
            } else {
                next( new HttpException(404, `Post with id:${id} not found.`));
            }
        })
    }

}

export default PostsController;