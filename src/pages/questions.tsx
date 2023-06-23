import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions/get');

        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container">
      <h1>Questions</h1>
      <ul className="list-group">
        {questions.map((question: any) => (
          <li key={question.questionId} className="list-group-item">
            <h5 className="mb-1">{question.title}</h5>
            <p className="mb-1">{question.content}</p>
            <p className="mb-0">
              <small>
                Asked by: {question.user.firstName} {question.user.lastName}
              </small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;
