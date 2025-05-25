import path from 'path';
import fs from 'fs';

const teeth = {
    "11": "Incisivo Central Superior Direito"
};


export default function handler(req, res) {
    const imgDir = path.join(process.cwd(), 'public', 'images');
    const files = fs.readdirSync(imgDir);
  
    const keys = Object.keys(teeth);
    const randomCode = keys[Math.floor(Math.random() * keys.length)];
    const regex = new RegExp(`^${randomCode}(\\(\\d+\\))?\\.png$`);
    const matches = files.filter(file => regex.test(file));
  
    if (matches.length === 0) {
      return res.status(404).json({ error: 'No image found for this code' });
    }
  
    const selectedImage = matches[Math.floor(Math.random() * matches.length)];
    const image = `/images/${selectedImage}`;
  
    res.status(200).json({ code: randomCode, name: teeth[randomCode], image });
  }
