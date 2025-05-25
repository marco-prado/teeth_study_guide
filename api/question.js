import path from 'path';
import fs from 'fs';

const teeth = {
    "11": "Incisivo Central Superior Direito",
    "12": "Incisivo Lateral Superior Direito",
    "13": "Canino Superior Direito",
    "14": "Primeiro Pré-Molar Superior Direito",
    "15": "Segundo Pré-Molar Superior Direito",
    "16": "Primeiro Molar Superior Direito",
    "17": "Segundo Molar Superior Direito",
    "18": "Terceiro Molar Superior Direito",
    "21": "Incisivo Central Superior Esquerdo",
    "22": "Incisivo Lateral Superior Esquerdo",
    "23": "Canino Superior Esquerdo",
    "24": "Primeiro Pré-Molar Superior Esquerdo",
    "25": "Segundo Pré-Molar Superior Esquerdo",
    "26": "Primeiro Molar Superior Esquerdo",
    "27": "Segundo Molar Superior Esquerdo",
    "28": "Terceiro Molar Superior Esquerdo",
    "41": "Incisivo Central Inferior Direito",
    "42": "Incisivo Lateral Inferior Direito",
    "43": "Canino Inferior Direito",
    "44": "Primeiro Pré-Molar Inferior Direito",
    "45": "Segundo Pré-Molar Inferior Direito",
    "46": "Primeiro Molar Inferior Direito",
    "47": "Segundo Molar Inferior Direito",
    "48": "Terceiro Molar Inferior Direito",
    "31": "Incisivo Central Inferior Esquerdo",
    "32": "Incisivo Lateral Inferior Esquerdo",
    "33": "Canino Inferior Esquerdo",
    "34": "Primeiro Pré-Molar Inferior Esquerdo",
    "35": "Segundo Pré-Molar Inferior Esquerdo",
    "36": "Primeiro Molar Inferior Esquerdo",
    "37": "Segundo Molar Inferior Esquerdo",
    "38": "Terceiro Molar Inferior Esquerdo",
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
