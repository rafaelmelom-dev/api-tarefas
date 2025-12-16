# Documentação da API de Tarefas

**Base URL**: `http://localhost:3000`

## Endpoints

### 1. Listar todas as tarefas
Retorna uma lista de todas as tarefas cadastradas.

* **URL**: `/tarefas`
* **Método**: `GET`
* **Resposta de Sucesso (200 OK)**:
    ```json
    [
      { "id": "1", "descricao": "Estudar Node", "concluida": false }
    ]
    ```

### 2. Criar Tarefa
Adiciona uma nova tarefa ao banco de dados.

* **URL**: `/tarefas`
* **Método**: `POST`
* **Corpo da Requisição (JSON)**:
    ```json
    {
      "descricao": "Nova Tarefa",
      "concluida": false
    }
    ```
* **Resposta de Sucesso (201 Created)**: Retorna o objeto criado.

### 3. Atualizar Tarefa
Atualiza os dados de uma tarefa existente.

* **URL**: `/tarefas/:id`
* **Método**: `PUT`
* **Parâmetros de URL**: `id` (obrigatório)
* **Corpo da Requisição**: Campos a serem atualizados.

### 4. Deletar Tarefa
Remove uma tarefa do sistema.

* **URL**: `/tarefas/:id`
* **Método**: `DELETE`
* **Resposta de Sucesso**: 204 No Content
