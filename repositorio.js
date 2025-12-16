import Database from 'better-sqlite3';

export class Tarefas {
    constructor() {
        this.db = new Database('tarefas.db');

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS tarefas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao TEXT NOT NULL,
                concluida BOOLEAN NOT NULL
    );`);
    }

    create({ descricao, concluida }) {
        if (!descricao) return null;

        descricao = descricao ?? '';
        concluida = concluida ? 1 : 0;

        try {
            const insert = this.db.prepare('INSERT INTO tarefas (descricao, concluida) VALUES (@descricao, @concluida);');
            const info = insert.run({ descricao, concluida });

            if (info.changes > 0) {
                console.log('Objeto criado no banco de dados!');
                const id = info.lastInsertRowid;

                return { id, descricao, concluida };
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    readAll() {
        const select = this.db.prepare('SELECT * FROM tarefas;');

        try {
            const tarefas = select.all();

            console.log('Objetos coletados do banco de dados');

            return tarefas;
        } catch (err) {
            return null;
        }
    }

    update({ id, descricao, concluida }) {
        try {
            const search = this.db.prepare('SELECT * FROM tarefas WHERE id = ?;');
            const tarefa = search.get(id);

            if (tarefa) {
                const update = this.db.prepare('UPDATE tarefas SET descricao = @descricao, concluida = @concluida WHERE id = @id;');

                descricao = descricao ?? tarefa.descricao;
                concluida = concluida ?? tarefa.concluida;
                concluida = concluida ? 1 : 0;

                const info = update.run({ id, descricao, concluida });

                if (info.changes > 0) {
                    console.log('Objeto atualizado com sucesso');

                    return { id, descricao, concluida };
                }

                return null;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    delete(id) {
        try {
            const del = this.db.prepare('DELETE FROM tarefas WHERE id = ?;');
            const info = del.run(id);

            if (info.changes > 0) {
                console.log('Objeto deletado da base de dados');
            }
        } catch (err) {
            return null;
        }
    }

    close() {
        this.db.close();
    }
}
