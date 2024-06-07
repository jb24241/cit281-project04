const { data } = require('./p4-data.js');

function getQuestions() {
    return data.map(item => item.question);
}

function getAnswers() {
    return data.map(item => item.answer);
}

function getQuestionsAnswers() {
    return JSON.parse(JSON.stringify(data));  // Deep copy to prevent mutation
}

function getQuestion(number = 1) {
    if (number < 1 || number > data.length) {
        return { error: 'Question number out of range', question: '', number: '' };
    }
    return { error: '', question: data[number - 1].question, number: number };
}

function getAnswer(number = 1) {
    if (number < 1 || number > data.length) {
        return { error: 'Answer number out of range', answer: '', number: '' };
    }
    return { error: '', answer: data[number - 1].answer, number: number };
}

function getQuestionAnswer(number = 1) {
    const questionAnswer = getQuestion(number);
    const answer = getAnswer(number);
    if (questionAnswer.error || answer.error) {
        return { error: questionAnswer.error || answer.error, question: '', answer: '', number: '' };
    }
    return { error: '', question: questionAnswer.question, answer: answer.answer, number: number };
}

function addQuestionAnswer(info = {}) {
    if (!info.question || !info.answer) {
        return { error: 'Object question property and answer property required', number: -1 };
    }
    const newId = data.length + 1;
    data.push({ question: info.question, answer: info.answer, id: newId });
    return { error: '', message: 'Question added', number: newId };
}

function updateQuestionAnswer(info = {}) {
    const { number, question, answer } = info;
    if (!number || data.length < number || number < 1) {
        return { error: 'Invalid number', number: '' };
    }
    let updated = false;
    if (question) {
        data[number - 1].question = question;
        updated = true;
    }
    if (answer) {
        data[number - 1].answer = answer;
        updated = true;
    }
    if (!updated) {
        return { error: 'No update performed', number: '' };
    }
    return { error: '', message: `Question ${number} updated`, number: number };
}

function deleteQuestionAnswer(number) {
    if (number < 1 || number > data.length) {
        return { error: 'Question number out of range', number: '' };
    }
    data.splice(number - 1, 1);
    return { error: '', message: `Question ${number} deleted`, number: number };
}

module.exports = {
    getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
    addQuestionAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer
};
