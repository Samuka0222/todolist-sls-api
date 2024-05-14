# API Rest Serverless para Lista de Tarefas

Esse é meu primeiro projeto pessoal utilizando a arquitetura serverless com o Serverless Framework e o AWS. Escolhe criar uma pequena API de uma aplicativo de lista de tarefas, já que por ser um projeto simples, poderia testar o que aprendi assistindo os conteúdos da plataforma Jstack, poder aperfeiçoar minhas técnicas de linting e de typescript com uma tecnologia nova e que me permitirá criar aplicações fullstack e disponibilizas para o mundo.

Estou muito satisfeito com o resultado, consegui bater meu record, criando esse projeto em 2 dias, enfrentando alguns problemas, maioria deles era eu mesmo 😅, mas no final curti a experiência e a forma de criar APIs utilizando essa arquitetura e fui conquistado pela AWS!

## Tecnologias e Ferramentas

### Base:
- Node.JS;
- Serverless Framework;
- Lambda Functions;
- Typescript;
- Yarn

### Linting:
- Eslint
- Prettier
- Lint-staged
- Commitlinting
- Husky
- EditorConfig

### Banco de Dados:
- DynamoDB

### Autenticação:
- AWS Cognito

### Testar a API
- Insomnia

## Funcionalidade e como testar

Para testar essa API, primeiramente vai precisar baixar o Serverless CLI, configurar o Serverless para conectar com sua conta na AWS,
clonar esse repositório e rodar o comando:

```javascript
npm install
```
Agora com o serverless configurado, rode o comando:
````serverless
serverless deploy
````

Aguarde ser feito o deploy do projeto para a AWS e depois é só usar o insomnia (ou postman) para testar a API.

### Sinta-se livre para deixar seu feedback, sugestões e reportar bugs!

---

# English version.

# To-do List Serverless API Rest

This is my first personal project using serverless architecture with the Serverless Framework and AWS. I chose to create a small API for a to-do list application, as it's a simple project that would allow me to test what I learned from the Jstack platform content, improve my linting and TypeScript skills with a new technology, and enable me to create full-stack applications and make them available to the world.

I'm very satisfied with the results. I managed to beat my record, creating this project in 2 days. I faced some challenges, mostly self-inflicted 😅, but in the end, I enjoyed the experience and the way of creating APIs using this architecture, and I've been won over by AWS!

## Technologies and Tools

### Base:
- Node.JS;
- Serverless Framework;
- Lambda Functions;
- Typescript;
- Yarn

### Linting:
- Eslint
- Prettier
- Lint-staged
- Commitlinting
- Husky
- EditorConfig

### Database:
- DynamoDB

### Authentication:
- AWS Cognito

### Testing the API:
- Insomnia

## Functionality and how to test

To test this API, you will first need to download the Serverless CLI, configure Serverless to connect to your AWS account, clone this repository, and run the following command:

```javascript
npm install
```
Now, with Serverless configured, run the following command:
````serverless
serverless deploy
````

Wait for the project deployment to AWS to complete, and then use Insomnia (or Postman) to test the API.

### Feel free to leave your feedback and suggestions!
