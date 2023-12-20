const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios'); // For making requests to the Chat-GPT API
const { OpenAI } = require("openai");
// Middleware for serving static files from the 'public' directory
app.use(bodyParser.json());

// // const configuration = new Configuration({
//   apikey: "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",
// });
app.use(express.static('public'));

const openai = new OpenAI({ apiKey: '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' });



app.post('/generateStory', async (req, res) => {
  try {
    const { spaceTraveler, shipName, destinationPlanet } = req.body;
    const story = await generateStory(spaceTraveler, shipName, destinationPlanet);
    res.json({ story });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating story');
  }
});

async function generateStory(spaceTraveler, shipName, destinationPlanet) {
  const prompt = `Write a story about a space traveler named ${spaceTraveler}, who travels in a ship named ${shipName} to a planet called ${destinationPlanet}. Limit to 150 words.`;
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106", // or your preferred model
    messages: [
      {
        role: "system",
        content: "You are a short story writer."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });
  return response['choices'][0]['message']['content']
  // return response.data.choices[0].text;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// // const getResponse = async () => {
  // //   const response = await openai.createChatCompletion({
// //     model: 'gpt-3.5-turbo',
// //     messages: [
// //       {
// //         role: 'user',
// //         content: `write me a story about the space traveler ${spaceTraveler}, and his trusty ship the ${shipName} on his way to ${destinationPlanet}`,
// //       },
// //     ],
// //     temperature: 0,
// //     max_tokens: 500,
// //     top_p: 1.0,
// //     frequency_penalty: 0.0,
// //     presence_penalty: 0.0,
// //   });

//   console.log(response.data.choices[0].messages)
// }

// getResponse();
// Middleware for parsing JSON requests


// Start the server

