import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"
import path from "path"


const port = 5000
const app = express()
app.use(cors())
app.use(express.json()) // Parse JSON body

dotenv.config()

// app.get("/", (req, res) => {
// 	res.send("Api is Running...")
// })

// Get the directory path using __dirname
const __dirname = path.resolve();

// Serve the React build files as static assets
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});



app.post("/api/recommendations", (req, res) => {
	const apiKey = process.env.OPENAI_API_KEY
	const apiUrl = "https://api.openai.com/v1/completions"
	const prompt = `Please suggest movies based on specific genres, plot elements, or any preferences you think would suit my taste: ${req.body.inputText}`

	axios
		.post(
			apiUrl,
			{
				model: "text-davinci-003",
				prompt: prompt,
				max_tokens: 100,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			}
		)
		.then((response) => {
			res.json(response.data)
		})
		.catch((error) => {
			console.error(error)
			res.status(500).json({ error: "An error occurred" })
		})
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
