import * as express from "express";
import * as logger from "morgan";

const app = express();
const port = 8080;

app.use(logger("dev"));
app.get("/", (req: express.Request, res: express.Response) => res.send("Sample Application"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// Change to listen to 48555 to communicate with grakn?

