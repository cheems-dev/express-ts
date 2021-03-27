import express, { Application } from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes";
import postRouter from "./routes/post.routes";
import { Port } from "./types/Port";

export class App {
  private app: Application;
  constructor(private port?: Port) {
    this.app = express();
    this.settings();
    this.middleware();
    this.routes();
  }

  settings(): void {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  middleware(): void {
    this.app.use(morgan(`dev`));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use(indexRouter); 
    this.app.use('/posts',postRouter); 
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get("port"));
    console.log(`Server on port ${this.app.get("port")}`);
  }
}
