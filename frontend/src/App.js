import { useState } from "react"
import axios from "axios"
import { Card, Button } from "react-bootstrap"
const App = () => {
	const [inputText, setInputText] = useState("")
	const [responseText, setResponseText] = useState("")
	const handleButtonClick = () => {
		const apiUrl = "http://localhost:5000/api/recommendations"

	
		const payload = {
			model: "text-davinci-003",
			prompt: `Please suggest movies based on specific genres, plot elements, or any preferences you think would suit my taste: ${inputText}`,
			max_tokens: 100,
		}

		axios
			.post(apiUrl, payload, {
				headers: {
					"Content-Type": "application/json",
				},
			})

			.then((response) => {
				setResponseText(response.data.choices[0].text)
				console.log(response.data)
			})
			.catch((error) => {
				console.error(error.response)
			})
	}

	return (
		<div className='app'>
			<Card style={{ textAlign: "center", margin: "3em" }}>
				<Card.Body className='gradient-background'>
					<div>
						<Card.Title>
							Give me one sentence and I will give you a movie title!
						</Card.Title>
						<Card.Img
							style={{ height: "10em", width: "10em", margin: "1em" }}
							src='./images/robot.jpg'
							alt='robot'
						></Card.Img>
					</div>
					<div
						style={{
							textAlign: "center",
							margin: "auto",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<textarea
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
							cols='20'
							rows='5'
						></textarea>
						<Button
							type='submit'
							className='submit-button'
							onClick={handleButtonClick}
							style={{ padding: "2em", margin: "1em" }}
						>
							<i className='fas fa-arrow-right'></i>
						</Button>
					</div>
					{responseText && (
						<div>
							<h2>Suggestion:</h2>
							<p>{responseText}</p>
						</div>
					)}
				</Card.Body>
			</Card>
		</div>
	)
}

export default App
