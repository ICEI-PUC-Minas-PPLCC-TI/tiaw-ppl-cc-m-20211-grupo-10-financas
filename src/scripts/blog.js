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
    let artigo1=document.getElementById('artigo1').style;
        let artigo2=document.getElementById('artigo2').style;
        let artigo3=document.getElementById('artigo3').style;
        let artigo4=document.getElementById('artigo4').style;
        let pesquisar=document.getElementById('pesquisar').value;
        let span=document.getElementsByTagName('span');
        let textHtml;
    
        if (pesquisar=="Gestão Financeira" || pesquisar=='Gestão' || pesquisar=='gestão' || pesquisar=='gestão financeira' || pesquisar=='educação financeira'){
            for (let i =0; i<span.length; i++){
            span[i].style.display='none'
        }
            artigo1.display='grid';
            artigo1.marginBottom='210px';
            textoHTML = `<span id="artigo1" class="artigos">
            <h2 class="artigo">Gestão Financeira</h2>
            <div class="artigo">
              <a href="artigo1.html"><img class="img_artigo" src="assets/gestao-financeira.jpg" alt="imagem de destaque"></a>
              <p>
                <span class="descrição">Descrição:</span><br>
                Atualmente, existem diversas famílias e indivíduos que, por falta de planejamento financeiro e/ou falta de
                conhecimento sobre a importância desse ato, acabam se endividando ou não adquirem a tão sonhada estabilidade
                financeira, prejudicando a si mesmas e aos outros a seu redor.
                A educação financeira te ajuda na busca de uma qualidade de vida no futuro, no alcançar seus objetivos e na
                obtenção da segurança financeira necessária para aproveitar os prazeres da vida.
              </p>
              
            </div>
            </span>`;

            document.getElementById('artigo1').innerHTML= textoHTML;
        }
        else if (pesquisar=="Investimentos" || pesquisar=="Investimento" || pesquisar=='investimentos' || pesquisar=='investimento' || pesquisar=='investir'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='none'
            }
            artigo2.display='grid';
            artigo2.marginBottom='210px';
        }
        else if (pesquisar=="Como Poupar?" || pesquisar=='Como poupar?' || pesquisar=='Como poupar' || pesquisar=='como poupar' || pesquisar=='como poupar?' || pesquisar=='poupar' || pesquisar=='economizar' || pesquisar=='Economizar' || pesquisar=='economia'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='none'
            }
            artigo3.display='grid';
            artigo3.marginBottom='210px';
        }
        else if (pesquisar=="Fontes de Renda" || pesquisar=='fontes de renda' || pesquisar=='renda' || pesquisar=='Renda'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='none'
            }
            artigo4.display='grid';
            artigo4.marginBottom='210px';
        }
        else if (pesquisar=="Todos" || pesquisar=='todos' || pesquisar=='dinheiro' || pesquisar=='finanças'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='grid';
                span[i].style.marginBottom='0px';
            }
        }
        else {
            for (let i =0; i<span.length; i++){
                span[i].style.display='none';
            }
            artigo1.display='grid';

            textoHTML = `<span id="artigo1" class="artigos">
            <h2 style="text-align:center;color:white; font-weight:bolder;margin-top:40px;">Não foram encontrados resultados...</h2>
            <a href="./blog.html"><button style="display:block; margin:0 auto;margin-bottom:500px;background-color: #5ddfea;
            border-radius: 20px;outline: none;">Voltar</button></a>
            </span>`;

            document.getElementById('artigo1').innerHTML= textoHTML;
        }
    document.getElementById('pesquisar').value=null;
}