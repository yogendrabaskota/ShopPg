import adminSeeder from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import categoryController from "./src/controllers/categoryController";


function startServer() {
    const PORT = envConfig.port || 3000

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    adminSeeder()
    categoryController.seedCategory()
    })
}
startServer()


