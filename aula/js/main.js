(function () {
    const inputTarefa = document.querySelector('.input-tarefa');
    const btnTarefa = document.querySelector('.btn-tarefa');
    const tarefas = document.querySelector('.tarefas');

    function criaLi() {
        return document.createElement('li');
    }

    function criaBotaoApagar(li) {
        const botao = document.createElement('button');
        botao.innerText = 'Apagar';
        botao.classList.add('apagar');
        li.appendChild(botao);
    }

    inputTarefa.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (!inputTarefa.value) return;
            criaTarefa(inputTarefa.value);
        }
    });

    function limpar() {
        inputTarefa.value = '';
        inputTarefa.focus();
    }

    function criaTarefa(textoInput) {
        const li = criaLi();
        li.innerText = textoInput;
        tarefas.appendChild(li);
        criaBotaoApagar(li);
        limpar();
    }

    btnTarefa.addEventListener('click', function () {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    });

    document.addEventListener('click', function (e) {
        const el = e.target;
        if (el.classList.contains('apagar')) {
            el.parentElement.remove();
            salvarTarefas();
        }
    });

    function salvarTarefas() {
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];

        for (let tarefa of liTarefas) {
            listaDeTarefas.push(tarefa.innerText.trim());
        }

        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    }

    function adicionaTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);

        if (listaDeTarefas) {
            for (let tarefa of listaDeTarefas) {
                criaTarefa(tarefa);
            }
        }
    }

    adicionaTarefasSalvas();
})();
