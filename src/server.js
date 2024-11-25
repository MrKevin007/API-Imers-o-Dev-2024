import express from "express";
import routes from "./routes/postRoutes.js";

//declara a variavel  que inicia o express
const app = express();
app.use(express.static("upload"));
routes(app);
//a função que inicia o servidor e define a porta que ele ira operar. Sendo 3000 uma porta padrão.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
