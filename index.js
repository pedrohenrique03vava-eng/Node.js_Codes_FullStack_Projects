import { Sequelize,DataTypes, json, where } from "sequelize";
import read from 'readline-sync' //Para testar no terminal
import pkg from 'sequelize/lib/index-hints';
import express from 'express'
const App = express()
App.use(express.json());
import cors from 'cors';
App.use(cors())


const { FORCE } = pkg;

//Conexão com o mysql
const sequelize = new Sequelize('crud','root','9632587410Ph@',{    
    host: 'localhost',
    dialect:'mysql'
})
// Verificação do mysql
sequelize.authenticate()
.then(()=>{
    console.log("Tudo Certo")
})
.catch(()=>{
    console.log("Erro")
})
// Criação de tabelas
const Usuarios = sequelize.define('users', {
    nome: {
        type: DataTypes.STRING
    },
    idade: {
        type: DataTypes.INTEGER 
    },
    email: {
        type: DataTypes.STRING
    },
});



App.post('/usuarios', async function(req,res){
    try{
        const {nome,idade,email} = req.body
        const novoUsuario = await Usuarios.create({ nome, idade, email });
        res.status(201).json(novoUsuario);
    }catch(err){
        res.status(500).json({erro: "Erro ao criar Usuario"})
    }
  
})

App.get('/usuarios',async function (req,res) {
    try{
        const lista = await Usuarios.findAll();
        res.status(200).json(lista);    
    }catch(err){
        res.status(500).json({erro: "Erro ao procurar usuarios"})
    }
  
})

App.delete('/usuarios/:id',async function (req,res) {
    try{
            const idParaDeletar = req.params.id

    await Usuarios.destroy({
        where: { id: idParaDeletar }
    })

    res.status(204).send();
    }catch(err){
        res.status(404).json({erro:"Usuario não encontrado"})
    }

})
App.put('/usuarios/:id', async function (req,res) {
    try{
    const updateId = req.params.id
    const novosDados = req.body
    await Usuarios.update(novosDados,{
        where:{id: updateId}
    })
    res.status(200).send();
    }catch(err){
        res.status(404).json({erro: "usuario não encontrado"})
    }

})

App.listen(8083, function(){
    console.log("Tudo certo")
})

