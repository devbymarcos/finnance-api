import { app } from "./app.js";

app.listen(process.env.PORT, () => {
    console.log("rodando porta :" + process.env.PORT);
});
