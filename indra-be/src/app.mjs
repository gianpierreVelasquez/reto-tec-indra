import express from 'express'
import cors from 'cors'
import { errorHandler } from './app/middlewares/errorMiddleware.mjs'
import { PORT, BASE_API_PATH } from './config/config.mjs'
// Routes
import productRoutes from './app/routes/productRoutes.mjs'

const app = express() // To initiliaze the app
app.use(cors()) // To enable CORS = Cross-Origin Resource Sharing
app.use(express.json()) // To convert to json all responses sent from the Backend

// Routes
app.use(`${BASE_API_PATH}/product`, productRoutes)

app.use(errorHandler)

const port = PORT ?? 3000

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
