let historicoStorage = [];

const registroEntradaFormElements = {
  data: document.getElementById("data-entrada"),
  valor: document.getElementById("valor-entrada"),
  descricao: document.getElementById("descricao-entrada"),
  salvarBtn: document.getElementById("salvar-entrada"),
};

const registroSaidaFormElements = {
  data: document.getElementById("data-saida"),
  valor: document.getElementById("valor-saida"),
  descricao: document.getElementById("descricao-saida"),
  salvarBtn: document.getElementById("salvar-saida"),
};

const criarHistoricoStorage = () => {
  const isHistoricoStorageCreated = localStorage.getItem("historico");

  if (!isHistoricoStorageCreated)
    localStorage.setItem("historico", JSON.stringify([]));
  else historicoStorage = JSON.parse(isHistoricoStorageCreated);
};

const adicionarLocalStorage = (tipo) => {
  const novoRegistro = {
    data: "",
    valor: "",
    descricao: "",
    tipo: "",
  };

  if (tipo === "entrada") {
    novoRegistro.data = registroEntradaFormElements.data.value;
    novoRegistro.valor = registroEntradaFormElements.valor.value;
    novoRegistro.descricao = registroEntradaFormElements.descricao.value;
    novoRegistro.tipo = tipo;
  } else if (tipo === "saida") {
    novoRegistro.data = registroSaidaFormElements.data.value;
    novoRegistro.valor = registroSaidaFormElements.valor.value;
    novoRegistro.descricao = registroSaidaFormElements.descricao.value;
    novoRegistro.tipo = tipo;
  }

  historicoStorage.unshift(novoRegistro);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));
};

const excluirLocalStorage = (index) => {
  historicoStorage.splice(index, 1);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));
};

const adicionarHistoricoHtml = () => {
  const tbodyHtml = document.getElementsByTagName("tbody");
  historicoStorage.forEach((transacao) => {
    const tableRow = document.createElement("tr");

    const tableDataData = document.createElement("td");
    const tableDataTipo = document.createElement("td");
    const tableDataDescricao = document.createElement("td");
    const tableDataValor = document.createElement("td");
    const tableDataDeletar = document.createElement("td");

    const valorClassAttribute = document.createAttribute("class");
    valorClassAttribute.value =
      transacao.tipo === "entrada" ? "entrada" : "saida";
    tableDataValor.setAttribute(valorClassAttribute);

    const deletarIcon = document.createElement("img");

    tableDataData.textContent = transacao.data;
    tableDataTipo.textContent = transacao.tipo;
    tableDataDescricao.textContent = transacao.descricao;
    tableDataValor.textContent = transacao.valor;

    tableRow.appendChild(
      tableDataData,
      tableDataTipo,
      tableDataDescricao,
      tableDataValor,
      tableDataDeletar
    );
  });
};

criarHistoricoStorage();
