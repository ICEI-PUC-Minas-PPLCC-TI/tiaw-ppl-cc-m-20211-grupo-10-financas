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
        let span=document.getElementsByClassName('artigos');
        let textHTML;
    
        if (pesquisar=="Gestão Financeira" || pesquisar=='Gestão' || pesquisar=='gestão' || pesquisar=='gestão financeira' || pesquisar=='educação financeira' || pesquisar=='finanças'){
            for (let i =0; i<span.length; i++){
            span[i].style.display='none'
        }
            artigo1.display='unset';
           textoHTML = `<div id="artigo1" class="artigos" style="margin-bottom:290px">
            <div class="imagem_e_titulo">
           <h2 class="artigo">Gestão Financeira</h2>
           <a href="artigo1.html"><img class="img_artigo" src="assets/gestao-financeira.jpg" alt="imagem de destaque"></a>
           </div>
           <div class="artigo">
             <p>
               <span class="descrição">Descrição:</span><br>
               Atualmente, existem diversas famílias e indivíduos que, por falta de planejamento financeiro e/ou falta de
               conhecimento sobre a importância desse ato, acabam se endividando ou não adquirem a tão sonhada estabilidade
               financeira, prejudicando a si mesmas e aos outros a seu redor.
               A educação financeira te ajuda na busca de uma qualidade de vida no futuro, no alcançar seus objetivos e na
               obtenção da segurança financeira necessária para aproveitar os prazeres da vida.
             </p>
           </div>
         </div>`;

            document.getElementById('artigo1').innerHTML= textoHTML;
        }
        else if (pesquisar=="Investimentos" || pesquisar=="Investimento" || pesquisar=='investimentos' || pesquisar=='investimento' || pesquisar=='investir'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='none'
            }
            artigo2.display='unset';
            textoHTML = `<div id="artigo2" class="artigos" style="margin-bottom:290px">
            <div class="imagem_e_titulo">
            <h2 class="artigo">Investimentos</h2>
            <a href="artigo2.html"><img class="img_artigo" src="assets/investimento_image.jpg" alt="imagem de destaque"></a>
            </div>
            <div class="artigo">
              
              <p>
                <span class="descrição">Descrição:</span><br>
                Antes de mostrar a importância de investir seu dinheiro primeiramente vamos entender o que é investimento, esse
                conceito é bastante amplo. Investimentos são produtos emitidos pelas instituições financeiras, empresas ou pelo
                próprio governo com o objetivo de receber recursos de forma mais barata que os empréstimos bancários e em troca
                eles oferecem ao investidor uma taxa de rentabilidade ou benefícios, de uma forma geral, investimento é “plantar
                agora para colher no futuro”.
              </p>
            </div>
            </div>`;
            document.getElementById('artigo2').innerHTML= textoHTML;
        }
        else if (pesquisar=="Como Poupar?" || pesquisar=='Como poupar?' || pesquisar=='Como poupar' || pesquisar=='como poupar' || pesquisar=='como poupar?' || pesquisar=='poupar' || pesquisar=='economizar' || pesquisar=='Economizar' || pesquisar=='economia'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='none'
            }
            artigo3.display='unset';
            textoHTML = `<div id="artigo3" class="artigos" style="margin-bottom:290px">
            <div class="imagem_e_titulo">
            <h2 class="artigo">Como Poupar?</h2>
            <a href="artigo3.html"><img class="img_artigo" src="assets/poupar-dinheiro.jpg" alt="imagem de destaque"></a>
            </div>
          <div class="artigo">
            <p>
              <span class="descrição">Descrição:</span><br>
              Poupar seu dinheiro faz com que você não dependa de cartões de crédito e empréstimos ou seja, traz independência
              financeira e tranquilidade para a sua vida.
              Pode parecer uma boa ideia gastar dinheiro com coisas que você pode aproveitar de imediato, mas vale a pena
              juntar dinheiro para realizar planos futuros que dependem de uma grana extra.
              Calcule o valor dos seus sonhos, além de como e quando você quer realizar eles, e poupe dinheiro para isso.
      
            </p>
          </div>
        </div>`;
            document.getElementById('artigo3').innerHTML= textoHTML;
        }
        else if (pesquisar=="Fontes de Renda" || pesquisar=='fontes de renda' || pesquisar=='renda' || pesquisar=='Renda' || pesquisar=='novas rendas' || pesquisar=='rendas' || pesquisar=='renda extra'){
            for (let i =0; i<span.length; i++){
                span[i].style.display='none'
            }
            artigo4.display='unset';
            textoHTML = `<div id="artigo4" class="artigos" style="margin-bottom:290px">
            <div class="imagem_e_titulo">
          <h2 class="artigo">Fontes de Renda</h2>
          <a href="artigo4.html"><img class="img_artigo" src="assets/fontes de renda.jpg" alt="imagem de destaque"></a>
            </div>
          <div class="artigo">
            <p>
              <span class="descrição">Descrição:</span><br>
              Quer transformar as horas vagas em fonte de renda? Então está no lugar certo. Separamos as melhores dicas sobre
              como ganhar dinheiro nas horas vagas!
              Vamos ensinar várias fontes de renda extra para você conseguir realizar os seus objetivos com mais segurança e
              facilidade.
              Portanto, preste atenção e descubra as melhores opções sobre como ganhar dinheiro nas horas vagas!
            </p>
          </div>
        </div>`;
            document.getElementById('artigo4').innerHTML= textoHTML;
        }
        else {
            for (let i =0; i<span.length; i++){
                span[i].style.display='none';
            }
            artigo1.display='unset';

            textoHTML = `<div id="artigo1">
            <h2 style="text-align:center;color:white; font-weight:bolder;margin-top:40px;">Não foram encontrados resultados...</h2>
            <a href="./blog.html">
            <button style="display:block; margin:0 auto;margin-bottom:500px;background-color: #5ddfea;
            border-radius: 20px;outline: none;">Voltar</button></a> 
            </div>`;

            document.getElementById('artigo1').innerHTML= textoHTML;
        }
    document.getElementById('pesquisar').value=null;
}
