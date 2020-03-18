/* configurando o servidor */
const express = require("express");
const server = express();

// configurando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true /*para qnd atualizar a pagina, pegar as modificações*/
})


//configurando conexão com banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});


//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public'))


//habilitar body do formulário
server.use(express.urlencoded({extended: true}))


// array de doadores
const donors = [
    {
        name: "Jorge Gomes",
        blood: "A+"
    },
    {
        name: "Mário Campos",
        blood: "O+"
    },
    {
        name: "Melissa Alves",
        blood: "B-"
    },
    {
        name: "Borges Nonato",
        blood: "A-"
    }
]


/* configurando a apresentação da página */
server.get("/", function(req, res){ /* req=requisiçoes, res=respostas */
    db.query("SELECT * FROM donors", function(err, result){
        if(err){
            return res.send("Erro no banco de dados")
        }
        
        const donors = result.rows;
        return res.render("index.html", { donors }); /* renderizar o index.html */
    })
    
    
} );


server.post("/", function(req, res){
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    /*colocar valores no array
    donors.push({
        name: name,
        blood: blood
    })
    */

    if(name == "" || email=="" || blood==""){
        return res.send("Preencha todos os campos!");
    }

    //colocar valores no BD
    const query = `INSERT INTO donors ("name", 
    "email", "blood") VALUES ($1, $2, $3)`;
    const values = [name, email, blood]
    
    db.query(query, values, function(err){
        //erro
        if(err){
            return res.send("Erro no banco de dados")
        }

        //ok
        return res.redirect("/")
    } );
    


    
})


/* ligar o servidor e permitir o acesso
na porta 3000 */
server.listen(3000, function(){
    console.log("Iniciei o servidor");
});







