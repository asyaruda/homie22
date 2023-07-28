import fastify from 'fastify';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'fastify-cors';
import fastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url);


const questions = [{
    caption: 'Подія натискання на елемент називається click?',
    correctAnswer: true
  },

  {
    caption: 'Усередині розмітки не можна додати обробник події?',
    correctAnswer: false
  },

  {
    caption: 'Припинити спливання події можна за допомогою метода stopImmediatePropagation?',
    correctAnswer: false
  },

  {
    caption: 'Припинити спливання події можна за допомогою метода stopPropagation?',
    correctAnswer: true
  }]

  
  const server = fastify({ logger: true });

  server.register(cors);
  server.register(fastifyStatic, {
    root: join(fileURLToPath(import.meta.url), 'public'),
    prefix: '/'
  });

  server.get('/questions', async (request, reply) => {
    return questions;
  });
  
  server.post('/checkAnswers', async (request, reply) => {
    const userAnswers = request.body;
    let score = 0;
  
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
  
    return { score: score };
  });
  
  server.get('/', async (request, reply) => {
    return { message: 'Вітаємо на тестовому сервері' };
  });
  
  server.get('/favicon.ico', async (request, reply) => {
    reply.code(204);
  });
  
  server.listen({ port: 5506})
    .then(() => {
      console.log('Server stared')
    })
    .catch((error) => {
      console.log('Error', error)
    })
































