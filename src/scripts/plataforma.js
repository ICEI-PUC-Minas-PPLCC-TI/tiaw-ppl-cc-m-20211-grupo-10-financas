let historicoStorage = [];
let metasStorage = [];

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

const registroMetaFormElements = {
  titulo: document.getElementById("meta-titulo"),
  valor: document.getElementById("meta-valor"),
  salvarBtn: document.getElementById("salvar-meta"),
};

const editarMetaFormElements = {
  valorAtual: document.getElementById("editar-valor-atual"),
  valor: document.getElementById("editar-meta-valor"),
  salvarBtn: document.getElementById("salvar-editar-meta"),
};

const generateUUID = () => {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const adicionarEntradaESaidaLocalStorage = (tipo) => {
  const novoRegistro = {
    id: "",
    data: "",
    valor: "",
    descricao: "",
    tipo: "",
  };

  if (
    (tipo === "entrada") & (registroEntradaFormElements.data.value === "") &&
    registroEntradaFormElements.valor.value === "" &&
    registroEntradaFormElements.descricao.value === ""
  )
    return;

  if (
    (tipo === "saida") & (registroSaidaFormElements.data.value === "") &&
    registroSaidaFormElements.valor.value === "" &&
    registroSaidaFormElements.descricao.value === ""
  )
    return;

  if (tipo === "entrada") {
    novoRegistro.id = generateUUID();
    novoRegistro.data = registroEntradaFormElements.data.value;
    novoRegistro.valor = registroEntradaFormElements.valor.value;
    novoRegistro.descricao = registroEntradaFormElements.descricao.value;
    novoRegistro.tipo = tipo;
  } else if (tipo === "saida") {
    novoRegistro.id = generateUUID();
    novoRegistro.data = registroSaidaFormElements.data.value;
    novoRegistro.valor = registroSaidaFormElements.valor.value;
    novoRegistro.descricao = registroSaidaFormElements.descricao.value;
    novoRegistro.tipo = tipo;
  }

  historicoStorage.unshift(novoRegistro);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));

  novoRegistro.id = "";
  novoRegistro.data = "";
  novoRegistro.valor = "";
  novoRegistro.descricao = "";
  novoRegistro.tipo = "";

  location.reload();
};

const adicionarMetaLocalStorage = () => {
  const novaMeta = {
    id: "",
    titulo: "",
    valor: "",
    valorAtual: "0",
  };

  if (
    registroMetaFormElements.titulo.value === "" &&
    registroMetaFormElements.valor.value === ""
  )
    return;

  novaMeta.id = generateUUID();
  novaMeta.titulo = registroMetaFormElements.titulo.value;
  novaMeta.valor = registroMetaFormElements.valor.value;

  metasStorage.unshift(novaMeta);

  localStorage.setItem("metas", JSON.stringify(metasStorage));

  novaMeta.id = "";
  novaMeta.titulo = "";
  novaMeta.valor = "";

  location.reload();
};

const excluirHistoricoLocalStorage = (index) => {
  historicoStorage.splice(index, 1);

  localStorage.setItem("historico", JSON.stringify(historicoStorage));

  const tbodyHtml = document.querySelector(`tr[name="${index}-historico"]`);
  tbodyHtml.remove();

  clearInputs();
  location.reload();
};

const excluirMetasLocalStorage = (index) => {
  metasStorage.splice(index, 1);

  localStorage.setItem("metas", JSON.stringify(metasStorage));

  const tbodyHtml = document.querySelector(`tr[name="${index}-metas"]`);
  tbodyHtml.remove();

  clearInputs();
  location.reload();
};

const editarMetasLocalStorage = () => {
  const metaIndex = localStorage.getItem('metaIndex');
  const meta = metasStorage[metaIndex];

  meta.valorAtual = parseFloat(meta.valorAtual) + parseFloat(editarMetaFormElements.valorAtual.value);
  meta.valor = parseFloat(editarMetaFormElements.valor.value);

  metasStorage[metaIndex] = meta;

  localStorage.setItem("metas", JSON.stringify(metasStorage));

  clearInputs();
  location.reload();
};

const openEditarMetasModal = index => {
  localStorage.setItem('metaIndex', index);
  const meta = metasStorage[index];

  editarMetaFormElements.valor.value = meta.valor;
};

const clearInputs = () => {
  registroEntradaFormElements.data.value = "";
  registroEntradaFormElements.descricao.value = "";
  registroEntradaFormElements.valor.value = "";

  registroSaidaFormElements.data.value = "";
  registroSaidaFormElements.descricao.value = "";
  registroSaidaFormElements.valor.value = "";

  registroMetaFormElements.titulo.value = "";
  registroMetaFormElements.valor.value = "";

  editarMetaFormElements.valorAtual.value = "";
  editarMetaFormElements.valor.value = "";
};

const popularDados = () => {
  calcularHora();
  popularSaldoEntradasSaidas();
};

const popularSaldoEntradasSaidas = () => {
  const entradasArray = historicoStorage.filter(
    (transacao) => transacao.tipo === "entrada"
  );
  const saidasArray = historicoStorage.filter(
    (transacao) => transacao.tipo === "saida"
  );

  let entradasSoma = 0;
  let saidasSoma = 0;

  entradasArray.forEach((entrada) => {
    entradasSoma += parseFloat(entrada.valor);
  });
  saidasArray.forEach((saida) => {
    saidasSoma += parseFloat(saida.valor);
  });

  const saldoHtml = document.querySelector("#saldoTotal");
  const entradaHtml = document.querySelector("#entradaTotal");
  const saidaHtml = document.querySelector("#saidaTotal");

  entradaHtml.innerHTML = entradasSoma.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  saidaHtml.innerHTML = saidasSoma.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  saldoHtml.innerHTML = (entradasSoma - saidasSoma).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let imgArtigosRecomendados = document.querySelector(
    "#img-artigos-recomendados"
  );
  let linkArtigosRecomendados = document.querySelector(
    "#link-artigos-recomendados"
  );
  let nomeArtigosRecomendados = document.querySelector(
    "#name-artigos-recomendados"
  );
  let saldoTotal = entradasSoma - saidasSoma;
  if (saldoTotal < 1000) {
    imgArtigosRecomendados.src = "./assets/fontes de renda.jpg";
    linkArtigosRecomendados.href = "artigo4.html";
    nomeArtigosRecomendados.innerHTML = "Fontes de Renda";
  } else if (saldoTotal >= 1000 && saldoTotal < 10000) {
    imgArtigosRecomendados.src = "./assets/poupar-dinheiro.jpg";
    linkArtigosRecomendados.href = "artigo3.html";
    nomeArtigosRecomendados.innerHTML = "Poupar Dinheiro";
  } else if (saldoTotal >= 10000 && saldoTotal < 50000) {
    imgArtigosRecomendados.src = "./assets/investimento_image.jpg";
    linkArtigosRecomendados.href = "artigo2.html";
    nomeArtigosRecomendados.innerHTML = "Investimentos";
  } else {
    imgArtigosRecomendados.src = "./assets/gestao-financeira.jpg";
    linkArtigosRecomendados.href = "artigo1.html";
    nomeArtigosRecomendados.innerHTML = "Gestão Financeira";
  }
};

const calcularHora = () => {
  const date = new Date();
  const hour = date.getHours();
  const dateHtml = document.querySelector("#date");
  if (hour < 5) {
    dateHtml.innerHTML = "Boa Noite!";
  } else if (hour < 8) {
    dateHtml.innerHTML = "Bom Dia!";
  } else if (hour < 12) {
    dateHtml.innerHTML = "Bom Dia!";
  } else if (hour < 18) {
    dateHtml.innerHTML = "Boa tarde!";
  } else {
    dateHtml.innerHTML = "Boa noite!";
  }
};

const adicionarHistoricoHtml = () => {
  const tableHtml = document.querySelector("#tableHistorico");
  let tbodyHtml;
  if (document.querySelector("#tbodyHistorico") === null) {
    tbodyHtml = document.createElement("tbody");
    tbodyHtml.setAttribute("id", "tbodyHistorico");
  } else {
    tbodyHtml = document.querySelector("#tbodyHistorico");
  }
  tableHtml.appendChild(tbodyHtml);
  historicoStorage.forEach((transacao, index) => {
    if (document.querySelector(`tr[name="${index}-historico"]`)) return;
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("name", `${index}-historico`);

    const tableDataData = document.createElement("td");
    tableDataData.textContent = transacao.data;

    const tableDataTipo = document.createElement("td");
    tableDataTipo.setAttribute("class", "tableTipoBody");
    tableDataTipo.textContent = transacao.tipo;

    const tableDataDescricao = document.createElement("td");
    tableDataDescricao.textContent = transacao.descricao;

    const tableDataValor = document.createElement("td");
    tableDataValor.textContent = transacao.valor;
    tableDataValor.setAttribute(
      "class",
      transacao.tipo === "entrada" ? "entrada" : "saida"
    );

    const tableDataDeletar = document.createElement("td");
    const deletarIcon = document.createElement("img");
    deletarIcon.setAttribute("src", "./assets/lixo.png");
    deletarIcon.setAttribute("class", "img_lixo");
    deletarIcon.setAttribute(
      "onclick",
      `excluirHistoricoLocalStorage(${index})`
    );
    tableDataDeletar.appendChild(deletarIcon);

    tableRow.appendChild(tableDataData);
    tableRow.appendChild(tableDataTipo);
    tableRow.appendChild(tableDataDescricao);
    tableRow.appendChild(tableDataValor);
    tableRow.appendChild(tableDataDeletar);

    tbodyHtml.appendChild(tableRow);

    if (transacao.tipo === "entrada")
      document.querySelector("button#closeEntradaModal").click();
    else if (transacao.tipo === "saida")
      document.querySelector("button#closeSaidaModal").click();

    clearInputs();
  });
};

const adicionarMetasHtml = () => {
  const tableHtml = document.querySelector("#tableMetas");
  let tbodyHtml;
  if (document.querySelector("#tbodyMetas") === null) {
    tbodyHtml = document.createElement("tbody");
    tbodyHtml.setAttribute("id", "tbodyMetas");
  } else {
    tbodyHtml = document.querySelector("#tbodyMetas");
  }
  tableHtml.appendChild(tbodyHtml);

  metasStorage.forEach((meta, index) => {
    if (document.querySelector(`tr[name="${index}-metas"]`)) return;
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("name", `${index}-metas`);

    const tableDataTitulo = document.createElement("td");
    tableDataTitulo.textContent = meta.titulo;

    const tableDataProgresso = document.createElement("td");
    tableDataProgresso.textContent = `${meta.valorAtual}/${meta.valor}`;

    //data-toggle="modal" data-target="#myModal"
    const tableDataEditar = document.createElement("td");
    const editarIcon = document.createElement("img");
    editarIcon.setAttribute("src", "./assets/pencil.png");
    editarIcon.setAttribute("class", "img_lixo");
    editarIcon.setAttribute("data-toggle", "modal");
    editarIcon.setAttribute("data-target", "#editarMetaModal");
    editarIcon.setAttribute("onclick", `openEditarMetasModal(${index})`);
    tableDataEditar.appendChild(editarIcon);

    const tableDataDeletar = document.createElement("td");
    const deletarIcon = document.createElement("img");
    deletarIcon.setAttribute("src", "./assets/lixo.png");
    deletarIcon.setAttribute("class", "img_lixo");
    deletarIcon.setAttribute("onclick", `excluirMetasLocalStorage(${index})`);
    tableDataDeletar.appendChild(deletarIcon);

    tableRow.appendChild(tableDataTitulo);
    tableRow.appendChild(tableDataProgresso);
    tableRow.appendChild(tableDataEditar);
    tableRow.appendChild(tableDataDeletar);

    tbodyHtml.appendChild(tableRow);

    clearInputs();
  });
};

const criarLocalStorage = () => {
  const isHistoricoStorageCreated = localStorage.getItem("historico");
  const isMetasStorageCreated = localStorage.getItem("metas");
  if (!isHistoricoStorageCreated && !isMetasStorageCreated) {
    localStorage.setItem("historico", JSON.stringify([]));
    localStorage.setItem("metas", JSON.stringify([]));
  } else {
    historicoStorage = JSON.parse(isHistoricoStorageCreated);
    metasStorage = JSON.parse(isMetasStorageCreated);
    adicionarHistoricoHtml();
    adicionarMetasHtml();
    popularDados();
  }
};

criarLocalStorage();
