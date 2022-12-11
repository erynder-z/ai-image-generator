const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage_post = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: 'dog on the moon barking at the earth',
      n: 1,
      size: '256x256',
    });

    const imageURL = response.data.data[0].url;

    res.status(200).json({ success: true, data: imageURL });
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);

      res
        .status(400)
        .json({ success: false, err: 'Image could not be generated' });
    }
  }
};

module.exports = generateImage_post;
