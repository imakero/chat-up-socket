import express, { Application, json, Request, Response } from "express"
import cors from "cors"

const app: Application = express()
app.use(cors())
app.use(json())
const PORT: number = parseInt(process.env.SERVER_PORT || "3001")

app.get("/hello", (req: Request, res: Response) => {
  return res.send("Hello World!")
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
