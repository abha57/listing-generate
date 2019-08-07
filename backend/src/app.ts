import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';




class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port){
        this.app = express();
        this.port = port;
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeErrorHandling(){
        this.app.use(errorMiddleware);
    }

    private initializeMiddlewares(){
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: Controller[]){
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Application running on port ${this.port}`);
        })
    }
}

export default App;