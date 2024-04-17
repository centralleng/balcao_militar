process.env["NTBA_FIX_319"] = "0";
import TelegramBot from "node-telegram-bot-api";
import { prisma_db } from "../database/prisma_db";
import { cpf } from 'cpf-cnpj-validator'; 
import validator from 'validator';

const token_bot = process.env.API_BOT_BDMIL ||'' // "6886561681:AAEL0_4SPcmWNV3_l9Nys0fe3Q2N2_9b--I"; // CentrallTest1

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil {
  static execute() {

  const termo = `
Olá! Bem-vindo ao Balcão dos militares (BDMil).

Fique atento (a) às regras abaixo:

1) O cadastro no @BDMil é GRATUITO E VOLUNTÁRIO, bem como as inscrições nos canais.

2) O cadastro da PRIMEIRA oferta de venda de CADA USUÁRIO será GRATUITA.

3) Do segundo cadastro em diante, serão cobradas comissões de apenas 3% do valor total de casa oferra. Para veículos e venda de imóveis 0.1%. No tocante aos serviços a taxa é fixa de 3 (três) reais.

4) As ofertas ficarão disponíveis no Balcão conforme abaixo:
9.1 Serviços : 1 mês;
9.2 veículos e venda de imóveis: 
- até 5k = 1 mês; 
- de 5.1 a 20 k = 2 meses; 
- de 20.1 a 45 k = 3 meses;                      
- de 45.1 a 80k= 4 meses;                     
- de 80.1 a 125 k = 5 meses;                  
- de 125.1 em diante = 6 meses.
9.3 demais produtos: 
- até 100 = 1 mês; 
- de 101 a 200 = 2 meses;                     
- de 201 a 400 = 3 meses;                     
- de 401 a 800 = 4 meses;                     
- de 801 a 2000 = 5 meses;                      
- de 2001 em diante = 6 meses.

5) O usuário poderá EDITAR, ATUALIZAR e DELETAR a oferta.

6) O proeminente vendedor fica obrigado a devolver 100% do valor que por ventura tenha recebido, caso ocorra algum problema. 

7) O comprador de um produto, poderá buscar as ofertas de forma mais específica, por intermédio do @BDMilALERTAS ou na ferramenta de busca do próprio canal.

8) O pagamento será realizado apenas por PIX.

9) O usuário terá a opção de comprar créditos, evitando efetuar o pagamento, pelo canal bancário a cada oferta.

10) Será disponibilizado ao usuário o bot @BDMilsuporte.

11) Será oferecido o bot SUGESTÕES para que o usuário possa contribuir com a melhoria do sistema.

12) A negociação no Balcão é LIVRE, conforme as várias plataformas de marketplace. Faça uma negociação segura.

13) Os dados do usuário são guardados em um servidor próprio e na "nuvem", totalmente criptografado aliado a segurança de dados existentes no Telegram.

14) É proibida a venda de armas e munições, bem como quaisquer produtos considerados ilícitos pelas leis brasileiras. 

15) É terminantemente PROIBIDO o uso do Balcão por menores de 18 anos.

16) Por fim, caso haja má fé, o transgressor será excluído do sistema de forma permanente.
Boas negociações!
`

    const termo1 = `
*Olá! Bem-vindo ao Balcão dos militares (BDMil).*

Esse balcão tem por objetivo facilitar a transação comercial de artigos militares e de “artigos civis”, novos ou usados, entre os integrantes das FFAA e Forças Singulares de todo o Brasil, da ativa (de carreira ou temporários) e da reserva (remunerada ou não), incluindo os pensionistas e os reformados.

As regras abaixo são de suma importância para o usuário. Está um pouco extensa, porém se faz necessário para o estabelecimento do compliance:
    
1) O Balcão será encontrado na plataforma Telegram, sendo operacionalizado por intermédio de Bots.

2) Os usuários deverão possuir uma conta na plataforma com seu respectivo nome de usuário e, se possível, com uma foto atualizada.

3) Dentro dos canais (balcões) você encontrará diversas ofertas de vendas de produtos/serviços onde terá as opções de comprar e vender.

4) O cadastro no @BDMil é GRATUITO E VOLUNTÁRIO. É só seguir as orientações constantes no bot para validá-lo.

5) Após o cadastro, serão disponibilizados os canais correspondentes para a venda de artigos militares e dos demais produtos e serviços.

6) No final de cada oferta terá o link para cadastrar uma venda.

7) No robô de cadastro de vendas (@BDMilquerovender), o cadastro da PRIMEIRA oferta de venda de CADA USUÁRIO será GRATUITA, a fim de familiarizar o vendedor com o processo e para criar o fluxo de negócios nos canais.`;
    const termo2 = `
8) Do segundo cadastro em diante, serão cobradas comissões de apenas 0.1% do valor total para veículos e venda de imóveis. Para os demais produtos 3%. No tocante aos serviços a taxa e fixa de 6 (seis) reais.

9) As ofertas ficarão disponíveis conforme abaixo:
9.1 Serviços : 2 meses;
9.2 veículos e venda de imóveis: 
9.1.1 até 5k = 1 mês;
9.1.2 de 5001 a 20 k = 2 meses;
9.1.3 de 20.001 a 45 k = 3 meses;
9.1.4 de 45.001 a 80k= 4 meses;
9.1.5 de 80.001 a 125 k = 5 meses;
9.1.6 de 125.001em diante = 6 meses.
9.2 demais produtos:
9.2.1 até 100 = 1 mês;
9.2.1 de 101 a 200 = 2 meses;
9.2.3 de 202 a 400 = 3 meses;
9.2.4 de 401 a 800 = 4 meses;
9.2.5 de 801 a 2000 = 5 meses;
9.2.6 de 2001 em diante = 6 meses.

  10) Durante os períodos supracitados, o usuário poderá EDITAR, ATUALIZAR e DELETAR. O botão ATUALIZAR serve para trazer a proposta de venda para o dia D. O EDITAR serve para mudar o valor do produto. Caso o vendedor exclua ou mude o preço ( somente para baixo), não poderá solicitar reembolso do valor pago.

11) Caso ocorra algum problema na venda, o proeminente vendedor fica obrigado a devolver 100% quaisquer valores que por ventura tenha recebido.

12) Caso o comprador aceite negociar a oferta, clicando no @BDMilquerocomprar, as partes receberão um alerta da negociação nos robôs correspondentes, que fornecerão as instruções necessárias para dar continuidade à respectiva negociação.

13) O comprador de um produto, poderá buscar as ofertas de forma mais específica, por intermédio do @BDMilALERTAS. Após seguir as orientações do robô, o interessado receberá o alerta de todas as ofertas lançadas do produto pretendido, em tempo real. 

14) O acesso ao @BDMilALERTAS estará no link de cada mensagem de venda.

15) Outra opção que será oferecida ao comprador é de realizar buscas mais refinadas de um produto, por intermédio do link “buscar” do respectivo cana`;
    const termo3 = `
16) O pagamento será realizado apenas por PIX.

17) O usuário terá a opção de comprar créditos, evitando efetuar o pagamento, pelo canal bancário, diversas vezes quando da oferta de um enxoval inteiro, por exemplo. 

18) Será disponibilizado também ao usuário o bot @BDMilsuporte, para sanar alguma dúvida que por ventura ainda possa existir. Esse bot contém videos com os principais procedimentos do Balcão. 

19) Será oferecido o bot SUGESTÕES para que o usuário possa contribuir com a melhoria do sistema.

20) A negociação no Balcão é LIVRE, conforme as várias plataformas de marketplace. É nesse momento que as partes procuram refinar as informações, a fim de realizar uma negociação segura. É nesse momento também a hora de expor possíveis vídeos e mais descrições do produto, bem como ajustar a forma de pagamento e da entrega. 

21) No final de cada negociação, os usuários podem recomendar ou desaconselhar nos bots correspondentes, proporcionando maior credibilidade e segurança às negociações.

22) Em cada canal terá uma mensagem pré-fixada do canal Bdmilnews, que serve para manter os usuários atualizados nas mais variadas ofertas de produtos e serviço dentro e fora do Balcão.

23) O Balcão é apenas um facilitador para aquisição ou venda de produtos entre os militares, podendo estender à familiares, amigos e lojistas, porém sempre utilizando a conta do militar e sob total responsabilidade do mesmo.

24) Os dados do usuário, como por exemplo o CPF, são guardados em um servidor próprio e na "nuvem", totalmente criptografado aliado a segurança de dados existentes no Telegram.

25) É proibida a venda de armas e munições, bem como quaisquer produtos considerados ilícitos pelas leis brasileiras. 

26) É terminantemente PROIBIDO o uso do Balcão por menores de 18 anos.

27) Por fim, lembrando mais uma vez que a negociação é livre e de responsabilidade dos usuários. Caso haja má fé, o transgressor será excluído do sistema de forma permanente.
Boas negociações!
`
        // const termo1 = `
        // Olá, bem\\-vindo ao Balcão dos militares *\\(BDMil\\)*\\. Esse Balcão tem por objetivo facilitar a transação comercial de artigos militares e de “artigos civis”, novos ou usados, entre os integrantes das FFAA e Forças Singulares, da ativa \\(de carreira ou temporários\\) e da reserva \\(remunerada ou não\\), incluindo os pensionistas e os reformados de todo o Brasil\\.
    
        // *1\\)* Esse Balcão encontra\\-se na plataforma Telegram e está certificado\\. O Balcão é automatizado por intermédio de Bots e os usuários devem possuir uma conta no Telegram com seu respectivo Nome de usuário e com uma foto atualizada\\.
        
        // *2\\)* Dentro dos Balcões você encontrará diversas ofertas de vendas de produtos/serviços com as orientações para comprá\\-los, bem como para fazer uma nova oferta\\.
        
        // *3\\)* O cadastro no *@BDMil* é GRATUITO E VOLUNTÁRIO\\. É só seguir as orientações constantes no mesmo para validá\\-lo\\.
        
        // *4\\)* Após o cadastro no BDMil, será disponibilizado link para o Balcão TUTORIAIS, que terá vídeos com cada processo\\.
        
        // *5\\)* No robô de cadastro de vendas *\\(@BDMilquerovender\\)*, o cadastro da PRIMEIRA oferta de venda de CADA USUÁRIO será GRATUITA, a fim de familiarizar o vendedor com o processo e para criar o fluxo de negócios nos balcões\\. Essa oferta permanecerá ativa por 1\\(um\\) mês\\. Caso for negociada, o vendedor se dirige ao robô do cadastro e digita VENDIDO e o número correspondente à oferta para excluí\\-la do Balcão\\. 
        
        // *6\\)* Do segundo cadastro em diante, será cobrada uma comissão de 3% sobre o valor de cada oferta\\. A oferta ficará disponível no respectivo balcão por 3 \\(três\\) meses, podendo o usuário, nesse período, MODIFICAR, EXCLUIR e ATUALIZAR a mesma, a fim de trazê\\-la para o dia em questão\\. Caso o vendedor exclua ou mude o preço, não poderá solicitar reembolso do valor pago\\. Caso tenha negociado, o vendedor fará o mesmo procedimento de acima descrito\\.
        //     `;
        // const termo2 = `
        
        // *7\\)* Para ofertar a VENDA de veículos e imóveis, a comissão será de 0,1%, sobre o valor ofertado, UMA ÚNICA VEZ\\. A oferta ficará disponível por um período de 6 \\(seis\\) meses\\. Da mesma forma que o processo anterior, o ofertante poderá realizar alterações que achar necessárias\\.
        
        // *8\\)* Para a oferta de serviços, será cobrada uma comissão única de 6 \\(seis\\) reais para cada\\. O processo se dá da mesma forma que o de veículos e imóveis\\.
        
        // *9\\)* Caso o comprador aceite negociar a oferta, clicando no *@BDMilquerocomprar*, o vendedor e o comprador receberão um alerta da negociação nos robôs correspondentes, que darão as instruções para dar continuidade da negociação\\.
        
        // *10\\)* O comprador de um produto, poderá buscar as ofertas de forma mais específica, por intermédio do *@BDMilALERTAS*, respondendo às perguntas dele\\. Ato contínuo, receberá em sua conta todas as ofertas lançadas do produto pretendido, em tempo real\\. Poderão ser realizadas buscas mais refinadas dentro do link “buscar” do respectivo Balcão\\. O acesso ao @BDMilALERTAS estará no link abaixo de cada oferta nos Balcões de vendas\\.
        
        // *11\\)* A negociação é LIVRE, conforme várias plataformas de marketplace\\. É nesse momento que as partes procuram refinar as informações de si mesmas, a fim de realizar uma negociação segura\\. Nesse momento é a hora de expor vídeos e mais descrições do produto, bem como a forma de pagamento e a entrega\\. No final de cada negociação os usuários devem aconselhar ou desaconselhar o vendedor ou o comprador, para dar cada vez mais credibilidade às negociações\\.
        
        // *12\\)* Será disponibilizado também um usuário suporte *@BDMilsuporte* para dúvidas que ainda existam\\.
        
        // *13\\)* Teremos também o BDMil SUGESTÕES para que a equipe possa melhorar cada vez mais o sistema\\.
        
        // *14\\)* O BDMil GOVERNANÇA E GESTÃO, conterá o plano de Gestão e as estatísticas, caso o usuário queira verificar a dimensão e a evolução do sistema\\.
        
        // *15\\)* Lembrando que o Balcão é um facilitador para aquisição ou venda de produtos entre militares, pensionistas\\. Pode ser estendido à *familiares e amigos, porém sempre utilizando a conta do militar*\\. A negociação é livre e de responsabilidade dos usuários, sob pena de exclusão sumária do sistema\\.
        //     `;
    
    const termos_uso: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [[{ text: "Sim", callback_data: "sim" }]],
      },
    };

    const instituicao: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
        [
          { text: "[EB]", callback_data: "[EB]" },
          { text: "[MB]", callback_data: "[MB]" },
          { text: "[FAB]", callback_data: "[FAB]" },
        ],
        [
          { text: "[PMERJ]", callback_data: "[PMERJ]" },
          { text: "[CBMERJ]", callback_data: "[CBMERJ]" },
          { text: "[PMDF]", callback_data: "[PMDF]" },
        ],
        [
          { text: "[CBMDF]", callback_data: "[CBMDF]" },
          { text: "[PMESP]", callback_data: "[PMESP]" },
          { text: "[CBMESP]", callback_data: "[CBMESP]" },
        ],
        [
          { text: "[PMMG]", callback_data: "[PMMG]" },
          { text: "[CBMMG]", callback_data: "[CBMMG]" },
          { text: "[PMGO]", callback_data: "[PMGO]" },
        ],
        [
          { text: "[CBMGO]", callback_data: "[CBMGO]" },
          { text: "[PMPR]", callback_data: "[PMPR]" },
          { text: "[CBMPR]", callback_data: "[CBMPR]" },
        ],
        [
          { text: "[PMSC]", callback_data: "[PMSC]" },
          { text: "[CBMSC]", callback_data: "[CBMSC]" },
          { text: "[BRIGADA MILITAR]", callback_data: "[BRIGADA-MILITAR]" },
        ],
        [
          { text: "[CBMRS]", callback_data: "[CBMRS]" },
          { text: "[PMMS]", callback_data: "[PMMS]" },
          { text: "[CBMMS]", callback_data: "[CBMMS]" },
        ],
        [
          { text: "[PMMT]", callback_data: "[PMMT]" },
          { text: "[CBMMT]", callback_data: "[CBMMT]" },
          { text: "[PMBA]", callback_data: "[PMBA]" },
        ],
        [
          { text: "[CBMBA]", callback_data: "[CBMBA]" },
          { text: "[PMES]", callback_data: "[PMES]" },
          { text: "[CBMES]", callback_data: "[CBMES]" },
        ],
        [
          { text: "[PMAL]", callback_data: "[PMAL]" },
          { text: "[CBMAL]", callback_data: "[CBMAL]" },
          { text: "[PMSE]", callback_data: "[PMSE]" },
        ],
        [
          { text: "[CBMSE]", callback_data: "[CBMSE]" },
          { text: "[PMPE]", callback_data: "[PMPE]" },
          { text: "[CBMPE]", callback_data: "[CBMPE]" },
        ],
        [
          { text: "[PMRN]", callback_data: "[PMRN]" },
          { text: "[CBMRN]", callback_data: "[CBMRN]" },
          { text: "[PMCE]", callback_data: "[PMCE]" },
        ],
        [
          { text: "[CBMCE]", callback_data: "[CBMCE]" },
          { text: "[PMPI]", callback_data: "[PMPI]" },
          { text: "[CBMPI]", callback_data: "[CBMPI]" },
        ],
        [
          { text: "[PMMA]", callback_data: "[PMMA]" },
          { text: "[CBMMA]", callback_data: "[CBMMA]" },
          { text: "[PMAM]", callback_data: "[PMAM]" },
        ],
        [
          { text: "[CBMAM]", callback_data: "[CBMAM]" },
          { text: "[PMAP]", callback_data: "[PMAP]" },
          { text: "[CBMAP]", callback_data: "[CBMAP]" },
        ],
        [
          { text: "[PMRO]", callback_data: "[PMRO]" },
          { text: "[CBMRO]", callback_data: "[CBMRO]" },
          { text: "[PMTO]", callback_data: "[PMTO]" },
        ],
        [
          { text: "[CBMTO]", callback_data: "[CBMTO]" },
          { text: "[PMAC]", callback_data: "[PMAC]" },
          { text: "[CBMAC]", callback_data: "[CBMAC]" },
        ],
        [
          { text: "[PMPA]", callback_data: "[PMPA]"},
          { text: "[CBMPA]", callback_data: "[CBMPA]"},
          { text: "[PMRR]", callback_data: "[PMRR]"},
        ],
        [
          { text: "[CBMRR]", callback_data: "[CBMRR]"},
          { text: "[PMPB]", callback_data: "[PMPB]"},
          { text: "[CBMPB]", callback_data: "[CBMPB]"},
        ],        
      ],        
      },
    };

    const artigos_militares: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
        [
          { text: "[EB vendas]", url: "https://t.me/+tEE2IKh78Nk0N2Y5"},
          { text: "[MB vendas]", url: "https://t.me/+22FaI9_9sHQ0YTUx" },
          { text: "[FAB vendas]", url: "https://t.me/+Y1pkY-yAViFiOWRh"},
        ],
        [
          { text: "[PMERJ vendas]", url: "https://t.me/+fP6eI1-pNI8zYWYx"},
          { text: "[CBMERJ vendas]", url: "https://t.me/+AWxwCs0q-KszNjQx"},
          { text: "[PMDF vendas]", url: "https://t.me/+ke1Nii3UYfM0MDNh"},
        ],
        [
          { text: "[CBMDF vendas]", url: "https://t.me/+5wzf1jsJf_k3YTZh"},
          { text: "[PMESP vendas]", url: "https://t.me/+RlDSnR8X9ZY2YTRh"},
          { text: "[CBMESP vendas]", url: "https://t.me/+5cJH6yQ5SUkwNjUx"},
        ],
        [
          { text: "[PMMG vendas]", url: "https://t.me/+0ZOmYGzHcQEzYjI5"},
          { text: "[CBMMG vendas]", url: "https://t.me/+MPElU7fWtDFkNWQx"},
          { text: "[PMGO vendas]", url: "https://t.me/+0z-tgSR7KMNlMjc5"},
        ],
        [
          { text: "[CBMGO vendas]", url: "https://t.me/+TpBNm-JXd-w1MGJh"},
          { text: "[PMPR vendas]", url: "https://t.me/+bUxKjoIbMP00YzIx"},
          { text: "[CBMPR vendas]", url: "https://t.me/+l0cJOmgSkeM3ODdh"},
        ],
        [
          { text: "[PMSC vendas]", url: "https://t.me/+kHO9rt65F6tmYTMx"},
          { text: "[CBMSC vendas]", url: "https://t.me/+uEKOo1wogGU2ZTE5"},
          { text: "[BRIGADA MILITAR vendas]", url: "https://t.me/+4m4PvEaQrlA3OWVh"},
        ],
        [
          { text: "[CBMRS vendas]", url: "https://t.me/+wLVXBuI9tLZlYjgx"},
          { text: "[PMMS vendas]", url: "https://t.me/+pFQKi0_RGrc1N2Yx"},
          { text: "[CBMMS vendas]", url: "https://t.me/+eea7o4K99wMzMGYx"},
        ],
        [
          { text: "[PMMT vendas]", url: "https://t.me/+iLnUYKOUoLY2MzQx"},
          { text: "[CBMMT vendas]", url: "https://t.me/+bKPgl8N8OwQxOGU5"},
          { text: "[PMBA vendas]", url: "https://t.me/+q3usbyJGEygyZTI5"},
        ],
        [
          { text: "[CBMBA vendas]", url: "https://t.me/+7Y_EbXi8lYRkN2Ex"},
          { text: "[PMES vendas]", url: "https://t.me/+JV13TdCOHTtiNzUx"},
          { text: "[CBMES vendas]", url: "https://t.me/+FDp4Wnnvcww2NWFh"},
        ],
        [
          { text: "[PMAL vendas]", url: "https://t.me/+B3aLTGTJcv1lMDUx"},
          { text: "[CBMAL vendas]", url: "https://t.me/+Hc5se9g2xyo1ZGIx"},
          { text: "[PMSE vendas]", url: "https://t.me/+XfvUCQjlkFM4YTIx"},
        ],
        [
          { text: "[CBMSE vendas]", url: "https://t.me/+5h3gnKyUcy8zYWZh"},
          { text: "[PMPE vendas]", url: "https://t.me/+tM5arpf0v7VhYTMx"},
          { text: "[CBMPE vendas]", url: "https://t.me/+L22WPiHuO3BhMmMx"},
        ],
        [
          { text: "[PMRN vendas]", url: "https://t.me/+v0S0DcDy0QkxYTFh"},
          { text: "[CBMRN vendas]", url: "https://t.me/+mtohgUmaWIc2Mzdh"},
          { text: "[PMCE vendas]", url: "https://t.me/+5C7aqMfBTBIzNDZh"},
        ],
        [
          { text: "[CBMCE vendas]", url: "https://t.me/+tOrjCxMj9q8zOGZh"},
          { text: "[PMPI vendas]", url: "https://t.me/+s-ZZoXIHK7MwYjJh"},
          { text: "[CBMPI vendas]", url: "https://t.me/+a2nMvkzqghs3ODgx"},
        ],
        [
          { text: "[PMMA vendas]", url: "https://t.me/+XiwfKrnun89mNDBh"},
          { text: "[CBMMA vendas]", url: "https://t.me/+mneokjSq4ps4M2Ex"},
          { text: "[PMAM vendas]", url: "https://t.me/+4Eeqv2ozfj1kYzJh"},
        ],
        [
          { text: "[CBMAM vendas]", url: "https://t.me/+cDVMXWkD-KQzOWEx"},
          { text: "[PMAP vendas]", url: "https://t.me/+HjRdxZJ67-dkNDhh"},
          { text: "[CBMAP vendas]", url: "https://t.me/+vTqnwRleGJ80MjQx"},
        ],
        [
          { text: "[PMRO vendas]", url: "https://t.me/+Tm-64V_q9UBiMzBh"},
          { text: "[CBMRO vendas]", url: "https://t.me/+FPD7RiIuZTViNDhh"},
          { text: "[PMTO vendas]", url: "https://t.me/+r6UUjs46txhkMWYx"},
        ],
        [
          { text: "[CBMTO vendas]", url: "https://t.me/+7zTSApKXHKU5YmRh"},
          { text: "[PMAC vendas]", url: "https://t.me/+36pWf9eJyro0YWVh"},
          { text: "[CBMAC vendas]", url: "https://t.me/+1awWjaRF0oNhOTYx"},
        ],
        [
          { text: "[PMPA vendas]", url: "https://t.me/+FwfafSnUETdkMjgx"},
          { text: "[CBMPA vendas]", url: "https://t.me/+-tmrxVAwTFJjZmQx"},
          { text: "[PMRR vendas]", url: "https://t.me/+ozYpjtkqsxZlOWNh"},
        ],
        [
          { text: "[CBMRR vendas]", url: "https://t.me/+xuF17ilK2qVhZDQx"},
          { text: "[PMPB vendas]", url: "https://t.me/+O39pUzjayrEyMjY5"},
          { text: "[CBMPB vendas]", url: "https://t.me/+KQWkzjvExhA2N2Ex"},
        ],        
      ],        
      },
    };

    // const artigos_civis: TelegramBot.SendMessageOptions = {
    //   reply_markup: {
    //     inline_keyboard: [
          
    //     ]}}


  
    const artigos_civis: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
        [
          { text: "[Serviço vendas]", url: "https://t.me/+0ni_n2uu5wQwNDYx"},
          { text: "[Uniforme vendas]", url: "https://t.me/+07bigcW1r4syMjRh"},
          { text: "[Smartphone vendas]", url: "https://t.me/+oTtGpdSVjZJjMzkx"},
        ],
        [
          { text: "[Veículo vendas]", url: "https://t.me/+CcK6KcqceLRkZjhh" },
          { text: "[Diversos vendas]", url: "https://t.me/+jV7ioExY8XRkMGYx"},
          { text: "[Eletrodoméstico vendas]", url: "https://t.me/+lafHsTpLYLM0NTgx"},
        ],
        [
          { text: "[Automotivo vendas]", url: "https://t.me/+UaJaV4ey4Z43YzQx"},
          { text: "[Áudio vendas]", url: "https://t.me/+HtkbigIaR6YzNmIx"},
          { text: "[Eletroportátil vendas]", url: "https://t.me/+8qvV2dgSEdNkZTgx"},
        ],
        [
          { text: "[Beleza e Saúde]", url: "https://t.me/+Qe4AWjFnm4BiYmJh"},
          { text: "[Bebida vendas]", url: "https://t.me/+FtkZD1h-GAk2OTJh"},
          { text: "[Bebê vendas]", url: "https://t.me/+mYGNUwXiyb8wYzcx"},
        ],
        [
          { text: "[Esporte vendas]", url: "https://t.me/+giWAHbN3AuQ4NmYx"},
          { text: "[Smart TV vendas]", url: "https://t.me/+nt5pJ_-m2HoxNGYx"},
          { text: "[Ar e Ventilação vendas]", url: "https://t.me/+tr2ws_c0hnQwNmIx"},
        ],
        [
          { text: "[Imóvel vendas]", url: "https://t.me/+dTc2DriyCCZmNDUx"},
          { text: "[Brinquedo vendas]", url: "https://t.me/+sEunOn7qodJhMWYx"},
          { text: "[Informática vendas]", url: "https://t.me/+31XlqHxWcfA0YWVh"},
        ],
        [
          { text: "[Game vendas]", url: "https://t.me/+6jF7Q3oL8-BjMjkx"},
          { text: "[Móvel vendas]", url: "https://t.me/+MlaeVILmRR84MzNh"},
          { text: "[Utilidade Doméstica vendas]", url: "https://t.me/+UKKjuOU36ylmZjhh"},
        ],
        [
          {text: "[Material Escolar vendas]", url: "https://t.me/+xPsCdljf7FtkZTYx"},
          { text: "[Tudo Pet] vendas",  url: "https://t.me/+ycJBfYd0ub84ZjZh" },
          { text: "[Passagens Aéreas] vendas",  url: "https://t.me/+URd2yP1W80o3MTQx" },
       ],
        [
          { text: "[Ferramenta] vendas",  url: "https://t.me/+B6SXBxIhSxczYzNh" },
          { text: "[Mat. Construção] vendas",  url: "https://t.me/+Kh9k9ns1hSkzMjAx" },
          { text: "[Alimento] vendas", url: "https://t.me/+zDzOkCOcJAg0Mzdh" },
        ],
        [
          { text: "[Joia e Bijuteria] vendas", url: "https://t.me/+xb8RlYsKF31mNWQx" },
          { text: "[Vestuario] vendas", url: "https://t.me/+1WFdW9QGintlNGMx" },
          { text: "[Instr. musicais] vendas", url: "https://t.me/+voNtAgBdh942MTkx" },
        ],
      ],        
      },
    };
    
    // Manipular callback_query
    bot.on("callback_query", async (callbackQuery: TelegramBot.CallbackQuery) => {
      // console.log(callbackQuery)
      const msg = callbackQuery.data;
      const chatId = callbackQuery.message?.chat.id;
      const username = callbackQuery.message?.chat.username; 
      const id_telegram = chatId || ''; 
      const message_id = callbackQuery.message?.message_id; 

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...');
      const messageId = msg_del.message_id.toString()     
    
      bot.deleteMessage(id_telegram, message_id?.toString()||"")     

      if(msg==='sim'){ // Aceita o termo de uso

        // Primeiro verifica se ja axiste esse usuário
        const user = await prisma_db.users.findUnique({
          where:{id_telegram:id_telegram?.toString()}
        })

        if(!user){ 
          await prisma_db.users.create({
            data:{
              id_telegram: id_telegram?.toString(),
              username: username,
              termo:true
            }
          })
          
        await bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro: 

Qual sua instituição de origem?          
        ` 
        ,instituicao);
        await bot.deleteMessage(id_telegram, messageId)
        }else{
        await bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro: 

Qual sua instituição de origem?      
                  ` 
        ,instituicao);
        bot.deleteMessage(id_telegram, messageId)
        }   
      }

      if(msg!='sim'){

        // Primeiro verifica se ja axiste esse usuário
        const user = await prisma_db.users.findUnique({
          where:{id_telegram:id_telegram?.toString()}
        })

        if(user?.instituicao===null){

          await prisma_db.users.update({
            where:{id_telegram: id_telegram?.toString()},
            data:{instituicao: msg}
          })
         
          await bot.sendMessage(id_telegram, `Digite seu nome completo:`);
          bot.deleteMessage(id_telegram, messageId)
                     
        }else{
          // Fazer varredura em todas as condicionais
        }
      }
    });

    bot.on("message", async (msg) => {
      // console.log(msg);

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...');
      const messageId = msg_del.message_id.toString()

      console.log(texto)

      const req = await prisma_db.users.findUnique({
        where:{id_telegram:id_telegram.toString()}
      }) 

      if(!req){ // Primeiro contato com o bot  
      await bot.sendMessage(id_telegram, termo, {parse_mode: 'Markdown'});
      // await bot.sendMessage(id_telegram, termo1, {parse_mode: 'Markdown'});
      // await bot.sendMessage(id_telegram, termo2, {parse_mode: 'Markdown'});
      // await bot.sendMessage(id_telegram, termo3, {parse_mode: 'Markdown'});
      await bot.sendMessage(id_telegram,"Eu li e concordo com os termos de uso:",termos_uso);
      bot.deleteMessage(id_telegram, messageId)
      //colocar um botão de OK aqui!!        
      }else{
        if(req.termo){
          if(req.instituicao===null){              
            // Qual seu cpf
          await bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro:

Qual sua instituição de origem?           
          `,instituicao);
          bot.deleteMessage(id_telegram, messageId)
          return
          }  

          if(req.nome===null){  
            // updata no banco salvando nome
            await prisma_db.users.update({
              where:{id_telegram: id_telegram},
              data:{nome: texto}
            })
            // Qual seu cpf
            await bot.sendMessage(id_telegram, `
Digite seu CPF: 

Obs.: Colocar somente números.`);
            bot.deleteMessage(id_telegram, messageId)
            return
          }

          if(req.document===null){

            function contemApenasNumeros(str: string){
              const req = /^\d+$/.test(str)
              return req
            }        

            if(!contemApenasNumeros(texto||'')){
              await bot.sendMessage(id_telegram, `Você precisa digitar somente números do CPF!`);
              bot.deleteMessage(id_telegram, messageId)
            }else{
                 // verifica se é um número válido
            const verificar_cpf = texto||''
            const status_cpf = cpf.isValid(verificar_cpf);

            try {
            if(status_cpf){
              // updata no banco cpf
                await prisma_db.users.update({
                  where:{id_telegram: id_telegram},
                  data:{type_document:'cpf',document: verificar_cpf.replace(/[^0-9]/g, ''),}
                })                
            
               // quer editar o cadastro
            await bot.sendMessage(id_telegram, `Digite seu melhor E-mail:`);
            bot.deleteMessage(id_telegram, messageId)
            }else{
              await bot.sendMessage(id_telegram, `Você precisa digitar um CPF válido!`);
              bot.deleteMessage(id_telegram, messageId)
            } 
          } catch (error) {
            await bot.sendMessage(id_telegram, `⚠️ Já existe um usuário com o CPF digitado.`);  
            bot.deleteMessage(id_telegram, messageId)              
          }         
            
          }
          return
          }

          if(req.email===null||req.email===''){  

            const email = texto||''
            
            function Validador_email(email: string) {
              const emailValido = validator.isEmail(email);            
              return emailValido
            }

            try {
            if(Validador_email(email)){  
              await prisma_db.users.update({
                where:{id_telegram: id_telegram},
                data:{email: texto}
              })              
                
            await bot.sendMessage(id_telegram,`Digite seu telefone com DDD:`);
            bot.deleteMessage(id_telegram, messageId)
            return

            }else{
              await bot.sendMessage(id_telegram, `Você precisa digitar um E-mail válido!`);
              bot.deleteMessage(id_telegram, messageId)
            }          

            return
          } catch (error) {
            await bot.sendMessage(id_telegram, `⚠️ Já existe um usuário com o email digitado.`);  
            bot.deleteMessage(id_telegram, messageId)  
            return 
          }  
          }

          if(req.phone===null){          

            function isTelefoneValido(texto: any) {
              const regex0 = /^\(\d{2}\)\d{8,9}$/; // (99)999999999
              const regex1 = /^\d{10,11}$/;  // 99999999999 || 9999999999
              const regex2 = /^\d{2} \d{8,9}$/;  // 99 999999999 || 99 99999999
              const regex3 = /^\d{2} 9 \d{8,9}$/; // 99 9 99999999 || 99 99999999
              const regex4 = /^(\d{2})-(\d{8,9})$/; // 99-99999999 || 99-99999999

              if(regex0.test(texto)){            
                const partes = texto?.split(/[()]/)||'';
                const ddd = partes[1].replace(/\D/g, '');
                const telefone = partes[2].replace(/\D/g, ''); 
                const status = true
                return {ddd,telefone,status}
              }
              if(regex1.test(texto)){  
                const ddd = texto.substring(0, 2);;
                const telefone = texto.substring(2); 
                const status = true
                return {ddd,telefone,status}
              }
              if(regex2.test(texto)){   
                const ddd = texto.replace(/\s/g, '').substring(0, 2);
                const telefone = texto.replace(/\s/g, '').substring(2); 
                const status = true
                return {ddd,telefone,status}
              }
              if(regex3.test(texto)){  
                const ddd = texto.replace(/\s/g, '').substring(0, 2);;
                const telefone = texto.replace(/\s/g, '').substring(2);; 
                const status = true
                return {ddd,telefone,status}
              }
              if(regex4.test(texto)){
                const [, texto1, texto2] = texto.match(regex4);  
                const ddd = texto1;
                const telefone = texto2; 
                const status = true
                return {ddd,telefone,status}
              }

              return {ddd:'',telefone:'',status:false}
            }              
       
            // // verificar as opões válidas
            if(isTelefoneValido(texto).status){ 

              // const link_group = await prisma_db.grupos.findUnique({
              //   where: { type: req?.instituicao||''}
              // })
              
              // const artigos_militares: TelegramBot.SendMessageOptions = {
              //   reply_markup: {
              //     inline_keyboard: [
              //       [{ text: req?.instituicao + " Balcão de vendas", url: link_group?.link}],
              //     ]}}
             
              // Filtrar apenas os caracteres numéricos
              const ddd = isTelefoneValido(texto).ddd;
              const telefone = isTelefoneValido(texto).telefone;              

              await prisma_db.users.update({
                where:{id_telegram: id_telegram},
                data:{phone: telefone, ddd_phone:ddd}
              })

              const grupo = await prisma_db.grupos.findUnique({where:{type:req.instituicao}})

              await bot.sendMessage(id_telegram,`      
🚨 Para finizar o seu cadastro, CLIQUE no canal correspondente à sua Instituição de origem, logo abaixo. Ato contínuo, já dentro do canal da força, CLIQUE em pelo menos um dos canais de artigos civis de seu interesse. Eles se encontram numa mensagem prefixada nos respectivos canais nas instituições. 🥳

🚨 Atenção: não esqueça de criar o @username para realizar as operações dentro do Balcão. Caso não saiba, clique @BDMILSUPORTE_bot e digite o número do vídeo correspondente.
`            ,);
            await bot.sendMessage(id_telegram,`Canais de Artigos Militares:`, {
              reply_markup: {
                inline_keyboard: [
                [
                  { text: req.instituicao, url: grupo?.link},
                ],             
              ],        
              },
            });

            // await bot.sendMessage(id_telegram, `Canais de Artigos Civis`, artigos_civis);

            bot.deleteMessage(id_telegram, messageId)
              
            return
            }

            // Caso não pare em nenhum if
            await bot.sendMessage(id_telegram,`Digite seu telefone com DDD no padrão abaixo:`);
            await bot.sendMessage(id_telegram,`DDD mais número de telefone:`);
            await bot.sendMessage(id_telegram,`99999999999 ou 99 999999999`);
            bot.deleteMessage(id_telegram, messageId)        
           
            return
          }

          else{
            // const link_group = await prisma_db.grupos.findUnique({
            //   where: { type: req?.instituicao||''}
            // })
            
            // const artigos_militares: TelegramBot.SendMessageOptions = {
            //   reply_markup: {
            //     inline_keyboard: [
            //       [{ text: req?.instituicao+ " Balcão de vendas", url: link_group?.link}],
            //     ]}}
                
await bot.sendMessage(id_telegram,`
Prontinho, seu cadastro foi realizado com sucesso!! 🥳
Seguem abaixo os canais que você pode acessar para comprar ou vender um produto!          
        `
          ,);

          await bot.sendMessage(id_telegram,`Canais de artigos militares:`, artigos_militares);

          await bot.sendMessage(id_telegram, `Canais de artigos civis:`, artigos_civis);

          bot.deleteMessage(id_telegram, messageId)
          }
        }
      }
    });
  }
}

export { Bot_bd_mil };