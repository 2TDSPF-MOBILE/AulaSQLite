import * as SQLite from 'expo-sqlite';

//abre ou cria o local database called notas.db
const db = SQLite.openDatabaseSync("notas.db")

//cria uma tabela se não existe
db.execSync(`
    CREATE TABLE IF NOT EXISTS notes2(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       content TEXT,
       createdAt TEXT NOT NULL
    )`)


//func para ler todas as notas do banco de dados
export function getNotes(){
    return db.getAllSync("SELECT * FROM notes2 ORDER BY id DESC ")
}

//func para adicionar uma nova nota
export function addNotes(title: string, content: string){
    const createdAt = new Date().toISOString()
    db.runSync(
          "INSERT INTO notes2 (title, content, createdAt) VALUES (?,?,?)",
          [title, content, createdAt]
    )
}

//func para atualizar a nota
export function updatedNote(id:number, title: string, content: string){
    db.runSync('UPDATE notes2 SET title=?, content=? WHERE id=?',
        [title, content, id]
    )
}

//func para deletar a nota pelo id
export function deleteNote(id:number){
    db.runSync("DELETE FROM notes2 WHERE id=?",[id] )

}