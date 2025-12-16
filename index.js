import express from 'express';
import { Tarefas } from './repositorio.js';

const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(express.json());

app.get('/tarefas', (req, res) => {
    const tarefas = new Tarefas();
    const listaTarefas = tarefas.readAll();
    tarefas.close();

    res.json(listaTarefas);
})

app.post('/tarefas', (req, res) => {
    const tarefas = new Tarefas();
    const tarefa = tarefas.create(req.body);
    tarefas.close();

    if (tarefa) {
        res.status(201).json(tarefa);
    }

    res.status(404).send('Erro ao adicionar a tarefa');
})

app.put('/tarefas/:id', (req, res) => {
    const tarefas = new Tarefas();
    const tarefa = tarefas.update({id: req.params.id, ...req.body});
    tarefas.close();

    if (tarefa) {
        res.json(tarefa);
    }

    res.status(404).send('Erro ao alterar a tarefa');
})

app.delete('/tarefas/:id', (req, res) => {
    const tarefas = new Tarefas();
    tarefas.delete(req.params.id);
    tarefas.close();

    res.status(204).send();
})

app.listen(PORT, () => {
    console.log(`Servidor inicializado em http://localhost:${PORT}`);
})
