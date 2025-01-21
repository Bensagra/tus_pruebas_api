import express from 'express';
import morgan from 'morgan';
import routes from "./routes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],

};


app.use(cors(corsOptions));
app.set("port", 3000);
app.use(morgan("dev"));
app.use(express.json());
app.use("/", routes);
/*let body = {
  cartId: 2,
  userId: 1
}*/
const startServer = () => {
  app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en puerto ${app.get('port')}`);
  });
};
startServer()

export default app;
