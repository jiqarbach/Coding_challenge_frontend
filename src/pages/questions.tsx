import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import api from '../api/axiosConfig';

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem("user_id")

            const response = await api.post('/questions/add', {
                title: questionTitle,
                content: questionContent,
                lat: lat,
                lng: lng,
                userId
            });

            // Clear form inputs
            setQuestionTitle('');
            setQuestionContent('');

            // Close the modal
            setShowModal(false);

            // Do something with the response, e.g., show success message
            console.log(response.data);
        } catch (error) {
            // Handle error, e.g., show error message
            console.error(error);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

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
    const handleSuccess = (position: any) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude),
        setLng(longitude)
        console.log('GPS Coordinates:', latitude, longitude);
      };
    
      const handleError = (error: any) => {
        console.error('Failed to retrieve GPS coordinates:', error.message);
      };
    
    return (
        <div className="container">
            <h1>Questions</h1>
            <div>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Post Question
                </Button>
            </div>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label >Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={questionTitle}
                                onChange={(e) => setQuestionTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={questionContent}
                                onChange={(e) => setQuestionContent(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default QuestionsPage;
