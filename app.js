const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios'); // For making requests to the Chat-GPT API
const { OpenAI } = require("openai");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://4923:holberton@cluster0.mbo0bkj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Middleware for serving static files from the 'public' directory
app.use(bodyParser.json());
app.use(express.static('public'));
// defines new schema for user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const openai = new OpenAI({ apiKey: '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' });

const users = [];
const accessTokenSecret = 'token';
// registers user
app.post('/register', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({ username: req.body.username, password: hashedPassword });
      await user.save();
      res.status(201).send('User registered');
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (user && await bcrypt.compare(req.body.password, user.password)) {
          const accessToken = jwt.sign({ username: user.username }, accessTokenSecret);
          res.json({ accessToken });
      } else {
          res.send('Username or password incorrect');
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// Middleware for authenticating JWTs
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

