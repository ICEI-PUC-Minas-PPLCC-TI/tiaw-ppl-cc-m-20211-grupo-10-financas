let aparecer=false;
function aparecerBarraPesquisa(){
    aparecer= !aparecer;
    if (aparecer==false){
        document.getElementsByClassName('searchBar')[0].style.display='none';    
    }
    else
    document.getElementsByClassName('searchBar')[0].style.display='flex';
}
function pesquisar(){
    console.log(document.getElementById('pesquisar').value);
    if (document.getElementById('pesquisar').value=="Gestão Financeira"){
        document.getElementById('artigo1').style.display='grid';
        document.getElementById('artigo1').style.marginBottom='210px';
        document.getElementById('artigo2').style.display='none';
        document.getElementById('artigo3').style.display='none';
        document.getElementById('artigo4').style.display='none';
    }
    else if (document.getElementById('pesquisar').value=="Investimentos"){
        document.getElementById('artigo2').style.display='grid';
        document.getElementById('artigo2').style.marginBottom='210px';
        document.getElementById('artigo1').style.display='none';
        document.getElementById('artigo3').style.display='none';
        document.getElementById('artigo4').style.display='none';
    }
    else if (document.getElementById('pesquisar').value=="Como Poupar?"){
        document.getElementById('artigo3').style.display='grid';
        document.getElementById('artigo3').style.marginBottom='210px';
        document.getElementById('artigo1').style.display='none';
        document.getElementById('artigo2').style.display='none';
        document.getElementById('artigo4').style.display='none';
    }
    else if (document.getElementById('pesquisar').value=="Fontes de Renda"){
        document.getElementById('artigo4').style.display='grid';
        document.getElementById('artigo4').style.marginBottom='210px';
        document.getElementById('artigo1').style.display='none';
        document.getElementById('artigo2').style.display='none';
        document.getElementById('artigo3').style.display='none';
    }
    else if (document.getElementById('pesquisar').value=="Todos"){
        document.getElementById('artigo1').style.display='grid';
        document.getElementById('artigo2').style.display='grid';
        document.getElementById('artigo3').style.display='grid';
        document.getElementById('artigo4').style.display='grid';
        document.getElementById('artigo1').style.marginBottom='0px';
        document.getElementById('artigo2').style.marginBottom='0px';
        document.getElementById('artigo3').style.marginBottom='0px';
        document.getElementById('artigo4').style.marginBottom='0px';
    }
    document.getElementById('pesquisar').value=null;
}