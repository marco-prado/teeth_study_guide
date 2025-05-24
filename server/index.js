const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

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
const support_sentences = [
  "Bom demais!", "Vamos que vamos!", "Aí sim!", "Booa!", "Tá mandando bem!",
];

// Random question
app.get('/api/question', (req, res) => {
  const keys = Object.keys(teeth);
  const randomCode = keys[Math.floor(Math.random() * keys.length)];
  const image = `/images/${randomCode}.png`;
  res.json({ code: randomCode, name: teeth[randomCode], image });
});

// Verify response
app.post('/api/verify', (req, res) => {
  const { guess, actual } = req.body;
  if (guess === actual) {
    const message = support_sentences[Math.floor(Math.random() * support_sentences.length)];
    res.json({ correct: true, message });
  } else {
    res.json({ correct: false, message: `Resposta correta: ${actual}` });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
