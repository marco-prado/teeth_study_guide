import { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const fetchQuestion = async () => {
    try {
      const res = await fetch("/api/question");
      const data = await res.json();
      setQuestion(data);
      setFeedback("");
      setInput("");
    } catch (err) {
      console.error("Failed to fetch question:", err);
      setFeedback("Erro ao carregar pergunta.");
    }
  };

  const verifyAnswer = async () => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: input.trim(), actual: question.code }),
      });
      const data = await res.json();
      if (data.correct) {
        setScore(score + 1);
        setFeedback(`✅ ${data.message}`);
      } else {
        setFeedback(`❌ ${data.message}`);
      }
      setTimeout(fetchQuestion, 2000);
    } catch (err) {
      console.error("Failed to verify answer:", err);
      setFeedback("Erro ao verificar resposta.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Guia de Estudo - Anatomia Dentária
        </h1>

        {question?.image && (
          <img
            src={question.image}
            alt="Dente"
            className="w-64 h-64 object-contain mx-auto mb-4"
          />
        )}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o código (ex: 11)"
          className="w-full text-center text-lg border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
        />

        <button
          onClick={verifyAnswer}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Verificar
        </button>

        <p
          className={`mt-4 text-center text-lg font-medium ${
            feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </p>

        <p className="text-center text-gray-600 mt-2">Acertos: {score}</p>
      </div>
    </div>
  );
}

export default App;
