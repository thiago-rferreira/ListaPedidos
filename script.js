class Pedido{
    //constructor com cliente,mesa e descricao
    constructor(cliente,mesa,descricao){
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
        this.id = this.idAleatorio();
    }

    //gera um id aleatório
    idAleatorio(){
        return Math.floor(Math.random() * 10000);
    }
}

class ListaDePedidos{
    constructor(){
        this.pedidos = [];
    }
    //adiciona um pedido
    addPedido(pedido){
        if(temAlgumInputVazio()){
            envieMensagem('Preencha todos os campos!','erro');
        }else{
            envieMensagem('Pedido adicionado com sucesso!','sucesso');
            this.pedidos.push(pedido);
            limpeInputs();
        }
       
    }
    
    renderPedidos(){
        let html = '';
        
        this.pedidos.forEach(pedido => {
            html += `
            <div id="list-orders">
                <p>ID: ${pedido.id}</p>
                <p>Cliente: ${pedido.cliente}</p>
                <p>Mesa: ${pedido.mesa}</p>
                <p>Descrição: ${pedido.descricao}</p>
                <div id="icons">
                <!-- Ícone de lixeira -->
                <i class="fas fa-trash-alt" onclick="listaDePedidos.deletePedido(${pedido.id})"></i>
                <!-- Ícone de lápis -->
                <i class="fas fa-pencil-alt" onclick="listaDePedidos.editPedido(${pedido.id})"></i>
                </div>
            </div>
        `;
        });
        document.getElementById('containerJS').innerHTML = html;
        showContador();
    }

    //deletar um pedido,pelo id com find
    deletePedido(id){
        this.pedidos = this.pedidos.filter(pedido => pedido.id != id);
        this.renderPedidos();
        showContador();
    }

    editPedido(id){
        let pedido = this.pedidos.find(pedido => pedido.id == id);
        document.getElementById('cliente').value = pedido.cliente;
        document.getElementById('mesa').value = pedido.mesa;
        document.getElementById('descricao').value = pedido.descricao;
        idAux = id;

        //oculto o botao cadastar com class hidden e tiro a class hidden do botao editar
        document.getElementById('btn-cadastrar').classList.add('hidden');
        document.getElementById('btn-editar').classList.remove('hidden');
        showContador();

    }

    quantidadePedidos(){
        return this.pedidos.length;
    }
}

let listaDePedidos = new ListaDePedidos();
let idAux = -1;

function addPedido(){
    let cliente = document.getElementById('cliente').value;
    let mesa = document.getElementById('mesa').value;
    let descricao = document.getElementById('descricao').value;

    let pedido = new Pedido(cliente,mesa,descricao);
    listaDePedidos.addPedido(pedido);
    listaDePedidos.renderPedidos();
}

function editarPedido(){
    let cliente = document.getElementById('cliente').value;
    let mesa = document.getElementById('mesa').value;
    let descricao = document.getElementById('descricao').value;

    // foreach, que percorra a lista de pedidos e ache conforme o id e substitua os dados
    listaDePedidos.pedidos.forEach(pedido => {
        if(pedido.id == idAux){
            pedido.cliente = cliente;
            pedido.mesa = mesa;
            pedido.descricao = descricao;

            //oculto o botao editar com class hidden e tiro a class hidden do botao cadastrar
            document.getElementById('btn-editar').classList.add('hidden');
            document.getElementById('btn-cadastrar').classList.remove('hidden');
            idAux = -1;
            limpeInputs(); 
            envieMensagem('Pedido editado com sucesso!','sucesso');
        }
    });

    listaDePedidos.renderPedidos();
}

function limpeInputs(){
    document.getElementById('cliente').value = '';
    document.getElementById('mesa').value = '';
    document.getElementById('descricao').value = '';
}

function envieMensagem(msg,tipo){
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    const msgP = `
        <p class="${tipo}">${msg}</p>
    `;

    msgDiv.innerHTML += msgP;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);
}

function temAlgumInputVazio(){
    let cliente = document.getElementById('cliente').value;
    let mesa = document.getElementById('mesa').value;
    let descricao = document.getElementById('descricao').value;

    if(cliente == '' || mesa == '' || descricao == ''){
        return true;
    }else{
        return false;
    }
}

function showContador(){
    if(listaDePedidos.quantidadePedidos() == 0){
        document.getElementById('contador').classList.add('hidden');
    }else{
        document.getElementById('contador').classList.remove('hidden');
        document.getElementById('contador').innerHTML = `- ${listaDePedidos.quantidadePedidos()}`;
    }
}