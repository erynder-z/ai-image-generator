const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage_post = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize = size === 'small' ? '256x256' : '512x512';

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({ success: true, data: imageUrl });
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);

      res.status(400).json({
        success: false,
        err: 'Image could not be generated',
      });
    }
  }
};

module.exports = generateImage_post;
