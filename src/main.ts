import "dotenv/config";
import createServer from "./utils/server"; // we haven't made this just yet

const app = createServer();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on localhost:${process.env.PORT}`);
});
