// utils/spamDetector.js
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios'

const HF_API_URL = 'https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-sms-spam-detection';

console.log(process.env.HF_ACCESS_TOKEN);

async function spamDetect(text) {
  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        },
      }
    );

    const result = response.data[0];  //[{ label: 'LABEL_1', score: 0.98 }, ...]
    const label = result.label;
    const score = result.score;
    console.log(result);
    return {
      isSpam: label === 'LABEL_1' && score > 0.85, // LABEL_1 usually means spam
      confidence: score,
      label
    };
  } catch (err) {
    console.error('Error calling Hugging Face API:', err.response?.data || err.message);
    return { isSpam: false, error: true };
  }
}

export default spamDetect
