const support_sentences = [
    "Bom demais!", "Vamos que vamos!", "Aí sim!", "Booa!", "Tá mandando bem!",
  ];

export default function handler(req, res) {
    const { guess, actual } = req.body;
    if (guess === actual) {
      const message = support_sentences[Math.floor(Math.random() * support_sentences.length)];
      res.json({ correct: true, message });
    } else {
      res.json({ correct: false, message: `Resposta correta: ${actual}` });
    }
  }