import { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const fetchQuestion = async () => {
    try {
      const res = await fetch('/api/question');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setQuestion(data);
      setFeedback('');
      setInput('');
    } catch (err) {
      console.error("Error fetching question:", err.message);
      setFeedback('Erro ao carregar pergunta');
    }
  };

  const verifyAnswer = async () => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: input.trim(), actual: question.code })
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
      setFeedback('Erro ao verificar resposta');
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Guia de Estudo - Anatomia Dentária</h1>
      {question?.image && (
        <img src={question.image} alt="Dente" width={300} height={300} />
      )}
      <br />
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite o código (ex: 11)"
      />
      <br />
      <button onClick={verifyAnswer}>Verificar</button>
      <p>{feedback}</p>
      <p>Acertos: {score}</p>
    </div>
  );
}

export default App;
