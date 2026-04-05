 let bt = document.getElementById("bt")

      
            async function atualizar(){
            let ul = document.getElementById("ul")
            ul.innerHTML = ""
            //---------------

            const dados = await fetch('http://localhost:8083/usuarios',{
                method: 'get',

            })
            const dadosConvert = await dados.json()

            dadosConvert.forEach(u => {
                let li = document.createElement('li')
                li.innerHTML = `Nome:${u.nome}| Idade:${u.idade} | Email: ${u.email} <button onclick="del(${u.id})">Deletar</button> <button onclick="up(${u.id})">Editar</button>`
                ul.appendChild(li)

                
            });
            
        }
        bt.addEventListener('click', async function(){ 
        //Pegando valores
     

        //-------------------------------------------------
        //Usando O fetch
        const resposta = await fetch('http://localhost:8083/usuarios',{
            method: "post",
            headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ nome, idade, email }) 
        }

        )
        if(resposta.ok){
            console.log("Tudo Certo")
        }else{
            alert("Erro ao cadastrar")
        }
         atualizar()
         document.getElementById("nome").value = ""
         document.getElementById("idade").value = ""
         document.getElementById("email").value = ""
        })
       
    //-------------------------------Função Delete------------------
        async function del(id){
            try{    
                            const resposta = await fetch(`http://localhost:8083/usuarios/${id}`,{
                method:'DELETE',
                headers:{
                     'Content-Type': 'application/json'
                }
                });
                 if (resposta.ok) {
                atualizar()
                } else {
                alert("Erro ao Deletar dados");
                }
            
        }  catch(err){
            console.log(`Falha!!! ${err}`)
        }}
    
    

        atualizar()

    //------------------------------Função Atualizar-----------------------

    async function up(id) {
          function novosDados(){
            let nome = document.getElementById("nome").value
            let idade = document.getElementById("idade").value
            let email = document.getElementById("email").value
        }
        try{
                const dados = await fetch(`http://localhost:8083/usuarios/${id}`,{
            method: 'PUT'
        });
        if(dados.ok){
            atualizar()
        }else{
            alert("Erro ao Atualizar dados");
        }
        }catch(err){
            console.log(`Falha!!! ${err}`)
        }
    
    }
    atualizar()


