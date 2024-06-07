const fastify = require('fastify')({
    logger: true
});

const {
    getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
    addQuestionAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer
} = require('./p4-module.js');

// Route for getting all questions
fastify.get('/cit/question', async (request, reply) => {
    return {
        error: '',
        statusCode: 200,
        questions: getQuestions()
    };
});

// Route for getting all answers
fastify.get('/cit/answer', async (request, reply) => {
    return {
        error: '',
        statusCode: 200,
        answers: getAnswers()
    };
});

// Route for getting all questions and answers
fastify.get('/cit/questionanswer', async (request, reply) => {
    return {
        error: '',
        statusCode: 200,
        questions_answers: getQuestionsAnswers()
    };
});

// Route for getting a specific question
fastify.get('/cit/question/:number', async (request, reply) => {
    const number = parseInt(request.params.number);
    return {
        ...getQuestion(number),
        statusCode: 200
    };
});

// Route for getting a specific answer
fastify.get('/cit/answer/:number', async (request, reply) => {
    const number = parseInt(request.params.number);
    return {
        ...getAnswer(number),
        statusCode: 200
    };
});

// Route for getting a specific question and answer
fastify.get('/cit/questionanswer/:number', async (request, reply) => {
    const number = parseInt(request.params.number);
    return {
        ...getQuestionAnswer(number),
        statusCode: 200
    };
});

// POST route for adding a new question and answer
fastify.post('/cit/question', async (request, reply) => {
    const result = addQuestionAnswer(request.body);
    return {
        ...result,
        statusCode: result.error ? 400 : 201
    };
});

// PUT route for updating a question and/or answer
fastify.put('/cit/question', async (request, reply) => {
    const result = updateQuestionAnswer(request.body);
    return {
        ...result,
        statusCode: result.error ? 400 : 200
    };
});

// DELETE route for deleting a question and answer
fastify.delete('/cit/question/:number', async (request, reply) => {
    const number = parseInt(request.params.number);
    const result = deleteQuestionAnswer(number);
    return {
        ...result,
        statusCode: result.error ? 400 : 200
    };
});

// Route for unmatched paths
fastify.get('*', async (request, reply) => {
    return {
        error: 'Route not found',
        statusCode: 404
    };
});

// Function to start the server
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();