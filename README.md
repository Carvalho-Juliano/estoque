## Sistema de Controle de Figurinos

- Este é um sistema de gerenciamento de estoque. Ele permite realizar o controle de empréstimos e devoluções de materiais, garantindo a organização e eficiência no gerenciamento do estoque.
- 
## Objetivo

O objetivo deste projeto é:

- Criar um sistema completo com backend e frontend.
- Gerenciar o estoque de figurinos com registro de :
- Empréstimos.
- Devoluções.
- Proporcionar uma interface amigável.
- Projeto inicialmente criado para colocar em prática todos so conhecimentos adquiridos sobre front e backend em Javascript.

## Funcionalidades

**Gerenciamento de Estoque**:

- Cadastro de figurinos com descrição, tipo, tamanho e quantidade.

**Controle de Empréstimos**:

- Registro de empréstimo como datas, saidas e devoluções.

**Relatórios**:

- Histórico de emprestimos por cliente.

## Tecnologias utilizadas

- **Next.js**: Para o frontend e SSR.
- **Prisma**: Como ORM para interagir com o banco de dados.
- **React**: Para criar interfaces dinâmicas.
- **PostgreSQL**: Banco de dados relacional.

## Como rodar a aplicação (Ambiente de desenvolvimento):

1. **Requisitos**

- [Node.js](https://nodejs.org/pt) instalado (versão 20).
- Banco de dados: [PostqueSQL](https://www.postgresql.org/) instalado (versão 17)
- ORM utilizado: [PrismaORM](https://www.prisma.io/)

2. **Clonando o repositório**

- Em sua ferramente de terminal:

```
git clone
https://github.com/Carvalho-Juliano/estoque
cd estoque
```

3. **Instale as dependências**

- Em sua ferramente de terminal:
````npm install````

4. **Configuração do banco de dados**

- Crie um banco de dados PostgreSQL(ex:estoque).
- Atualize o arquivo .env .
- Na variável DATABASE_URL insira os dados para fazer a conexão com o banco criado seguindo o padrão da URL abaixo
- DATABASE_URL**="postgresql://postgres:senha@localhost:PORTA(EX:5432)/nome_do_banco?schema
- Rode as migrations do Prisma para criar as tabelas: ````npx prisma migrate dev````

5. **Rode a apliação**

- Comando para rodar a aplicação: ````npm run dev````
 
6. **Acesse o localHost no seu navegador**

- http://localhost:3000

## Exemplo de arquivo .env / Configuração das variáveis de ambiente

- Adicione um arquivo .env na raiz do projeto com as seguintes variáveis(de acordo com o seu ambiente.):

- Exemplo:
- **DATABASE_URL**="postgresql://postgres:senha@localhost:5432/nome_do_banco?schema"
- **NEXT_PUBLIC_BASE_URL**="http://localhost:3000"
- **NEXTAUTH_SECRET**="sua_chave_secreta"

- Descrição:
- **DATABASE_URL**: string de conexão com o banco de dados, utilizada pelo arquivo 'schema.prisma'.
- **NEXT_PUBLIC_BASE_URL**: URL base na aplicação.
- **NEXTAUTH_SECRET**: chave secreta utilizada para autenticar as rotas da aplicação.

- Comando utilizado para gerar um conjunto de caracteres aleatorios no windows(usado para a variável de ambiente(NEXTAUTH_SECRET)):
  [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
