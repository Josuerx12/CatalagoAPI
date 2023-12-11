# Projeto Backend - Catálogo e Administração

Bem-vindo ao projeto backend da aplicação de catálogo com funções administrativas. Este sistema permite que administradores gerenciem produtos e usuários de forma eficiente.

## Rotas de Autenticação

- **[POST]** `/auth/register`: Registra novos usuários. Os dados devem ser inseridos no corpo da requisição.

- **[POST]** `/auth/login`: Realiza o login do usuário. Os dados de login devem ser inseridos no corpo da requisição.

- **[POST]** `/auth/recovery`: Permite a recuperação de conta. Os dados para recuperação devem ser inseridos no corpo da requisição.

## Rotas de Administradores

### Produtos

- **[POST]** `/products/new`: Cria um novo produto. Os dados devem ser inseridos através de um formulário (`form-data`).

- **[DELETE]** `/products/:productID`: Deleta um produto específico.

- **[PATCH]** `/products/:productID`: Edita um produto específico.

#### Comandos Específicos para Produtos

- **[DELETE]** `/products/:productID/photoID`: Deleta uma foto específica do produto.

- **[PATCH]** `/products/:productID`: Edita os dados do produto e permite adicionar múltiplas fotos através de `form-data`.

### Usuários

- **[DELETE]** `/auth/user/:userID`: Deleta um usuário existente no sistema.

- **[GET]** `/auth/users`: Coleta todos os usuários cadastrados no sistema.

- **[PATCH]** `/auth/editUser/:id`: Edita um usuário, sendo administrador.

## Comandos Públicos de Usuário

- **[GET]** `/products`: Coleta todos os produtos disponíveis.

- **[GET]** `/products/:productId`: Coleta dados de um produto específico.

- **[PATCH]** `/auth/editUser`: Edita usuário, dados inseridos através de `form-data`.

- **[GET]** `/auth/user`: Coleta dados do usuário autenticado.
