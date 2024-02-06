process.env["NTBA_FIX_319"] = "0";
import TelegramBot from "node-telegram-bot-api";
import { prisma_db } from "../database/prisma_db";
import { cpf } from 'cpf-cnpj-validator'; 
import validator from 'validator';

const token_bot = process.env.API_BOT_BDMIL ||'' // "6886561681:AAEL0_4SPcmWNV3_l9Nys0fe3Q2N2_9b--I"; // CentrallTest1

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil {
  static execute() {
    const termo1 = `
*Olá! Bem-vindo ao Balcão dos militares (BDMil).*

As orientações abaixo são de suma importância para o usuário. Está um pouco extensa, porém se faz necessário.

Esse balcão tem por objetivo facilitar a transação comercial de artigos militares e de “artigos civis”, novos ou usados, entre os integrantes das FFAA e Forças Singulares de todo o Brasil, da ativa (de carreira ou temporários) e da reserva (remunerada ou não), incluindo os pensionistas e os reformados.

1) O balcão encontra-se no Telegram e é operacionalizado por intermédio de Bots. Os usuários devem possuir uma conta na plataforma com seu respectivo Nome de usuário e com uma foto atualizada.

2) Dentro dos canais/balcões o Sr encontrará diversas ofertas de vendas de produtos/serviços com as orientações para comprá-los e/ou vende-los.

3) O cadastro no @BDMil é GRATUITO E VOLUNTÁRIO. É só seguir as orientações constantes no mesmo para validá-lo.

4) Após o cadastro no BDMil, será disponibilizado o canal de cada Instituição/Corporação para a venda de artigos militares e os demais canais para a venda dos diversos produtos e serviços

5) No final de cada oferta terão links para cadastrar uma venda ou uma compra

6) No robô de cadastro de vendas (@BDMilquerovender), o cadastro da PRIMEIRA oferta de venda de CADA USUÁRIO será GRATUITA, a fim de familiarizar o vendedor com o processo e para criar o fluxo de negócios nos balcões. Essa oferta permanecerá ativa por 2(dois) meses. 
        `;
    const termo2 = `
7) Do segundo cadastro em diante, será cobrada uma comissão de 3% sobre o valor total de cada oferta. A oferta ficará disponível no respectivo balcão por 2 (dois) meses, podendo o usuário, nesse período, MODIFICAR, EXCLUIR e ATUALIZAR a mesma, a fim de trazê-la para o dia em questão. Caso o vendedor exclua ou mude o preço, não poderá solicitar reembolso do valor pago. 

8) Para ofertar a VENDA de veículos e imóveis, a comissão será de 0,1%, sobre o valor ofertado, UMA ÚNICA VEZ. A oferta ficará disponível por um período de 4 (quatro) meses. Da mesma forma que o processo anterior, o ofertante poderá realizar as alterações que achar necessárias.

9) Para a oferta de serviços, será cobrada uma comissão única de 6 (seis) reais para cada item. O processo se dá da mesma forma que o de veículos e imóveis.

10) Caso o comprador aceite negociar a oferta, clicando no @BDMilquerocomprar, o vendedor e o comprador receberão um alerta da negociação nos robôs correspondentes, que darão as instruções para dar continuidade da negociação.

11) No robô de cadastro de compras (@BDMilquerocomprar), o cadastro da oferta será GRATUITA, permanecendo ativa por também por 2(dois) meses. Caso haja um vendedor interessado, ele clicará no link @BDMilquero vender. Para começar a negociação será cobrada uma taxa de apenas 1 (um) real.

12) O comprador e o vendedor de um produto, poderão buscar as ofertas de forma mais específica, por intermédio do @BDMilALERTAS. Ato contínuo, receberá em sua conta todas as ofertas lançadas do produto pretendido, em tempo real. Poderão ser realizadas buscas mais refinadas dentro do link “buscar” do respectivo canal. O acesso ao @BDMilALERTAS estará na mensagem pré-fixada nos canais.
            `;
    const termo3 = `
13) Existem três formas de pagamento: Pix, débito e crédito. O usuário poderá comprar créditos, a fim de facilitar as vendas de diversos itens de uma vez, como por exemplo um enxoval inteiro. 

14) Caso ainda haja dúvidas sobre algum processo, teremos nas mensagens pré-fixadas nos canais e o link TUTORIAIS, contendo vídeos com os todos os procedimentos do balcão.

15) A negociação é LIVRE, conforme várias plataformas de marketplace. É nesse momento que as partes procuram refinar as informações, a fim de realizar uma negociação segura. É nesse momento também a hora de expor vídeos e mais descrições do produto, bem como ajustar forma de pagamento e da entrega. 

16) No final de cada negociação os usuários devem aconselhar ou desaconselhar o vendedor ou o comprador, nos bots correspondentes, para dar cada vez mais credibilidade às negociações.

17) Será disponibilizado também ao usuário o @BDMilsuporte para dúvidas que ainda existam.

18) Teremos também o bot SUGESTÕES para que a equipe possa melhorar cada vez mais o sistema.

19) Lembrando que o Balcão é um facilitador para aquisição ou venda de produtos entre militares, pensionistas. Pode ser estendido à familiares, amigos e lojistas, porém sempre utilizando a conta do militar. A negociação é livre e de responsabilidade dos usuários, sob pena de exclusão sumária do sistema.
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
          { text: "[BRIGADA MILITAR]", callback_data: "[BRIGADA MILITAR]" },
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

    // const artigos_militares: TelegramBot.SendMessageOptions = {
    //   reply_markup: {
    //     inline_keyboard: [
    //     [
    //       { text: "[EB Balcão de vendas]", url: "https://t.me/+tEE2IKh78Nk0N2Y5"},
    //       { text: "[MB Balcão de vendas]", url: "https://t.me/+22FaI9_9sHQ0YTUx" },
    //       { text: "[FAB Balcão de vendas]", url: "https://t.me/+Y1pkY-yAViFiOWRh"},
    //     ],
    //     [
    //       { text: "[PMERJ Balcão de vendas]", url: "https://t.me/+fP6eI1-pNI8zYWYx"},
    //       { text: "[CBMERJ Balcão de vendas]", url: "https://t.me/+AWxwCs0q-KszNjQx"},
    //       { text: "[PMDF Balcão de vendas]", url: "https://t.me/+ke1Nii3UYfM0MDNh"},
    //     ],
    //     [
    //       { text: "[CBMDF Balcão de vendas]", url: "https://t.me/+5wzf1jsJf_k3YTZh"},
    //       { text: "[PMESP Balcão de vendas]", url: "https://t.me/+RlDSnR8X9ZY2YTRh"},
    //       { text: "[CBMESP Balcão de vendas]", url: "https://t.me/+5cJH6yQ5SUkwNjUx"},
    //     ],
    //     [
    //       { text: "[PMMG Balcão de vendas]", url: "https://t.me/+0ZOmYGzHcQEzYjI5"},
    //       { text: "[CBMMG Balcão de vendas]", url: "https://t.me/+MPElU7fWtDFkNWQx"},
    //       { text: "[PMGO Balcão de vendas]", url: "https://t.me/+0z-tgSR7KMNlMjc5"},
    //     ],
    //     [
    //       { text: "[CBMGO Balcão de vendas]", url: "https://t.me/+TpBNm-JXd-w1MGJh"},
    //       { text: "[PMPR Balcão de vendas]", url: "https://t.me/+bUxKjoIbMP00YzIx"},
    //       { text: "[CBMPR Balcão de vendas]", url: "https://t.me/+l0cJOmgSkeM3ODdh"},
    //     ],
    //     [
    //       { text: "[PMSC Balcão de vendas]", url: "https://t.me/+kHO9rt65F6tmYTMx"},
    //       { text: "[CBMSC Balcão de vendas]", url: "https://t.me/+uEKOo1wogGU2ZTE5"},
    //       { text: "[BRIGADA MILITAR Balcão de vendas]", url: "https://t.me/+4m4PvEaQrlA3OWVh"},
    //     ],
    //     [
    //       { text: "[CBMRS Balcão de vendas]", url: "https://t.me/+wLVXBuI9tLZlYjgx"},
    //       { text: "[PMMS Balcão de vendas]", url: "https://t.me/+pFQKi0_RGrc1N2Yx"},
    //       { text: "[CBMMS Balcão de vendas]", url: "https://t.me/+eea7o4K99wMzMGYx"},
    //     ],
    //     [
    //       { text: "[PMMT Balcão de vendas]", url: "https://t.me/+iLnUYKOUoLY2MzQx"},
    //       { text: "[CBMMT Balcão de vendas]", url: "https://t.me/+bKPgl8N8OwQxOGU5"},
    //       { text: "[PMBA Balcão de vendas]", url: "https://t.me/+q3usbyJGEygyZTI5"},
    //     ],
    //     [
    //       { text: "[CBMBA Balcão de vendas]", url: "https://t.me/+7Y_EbXi8lYRkN2Ex"},
    //       { text: "[PMES Balcão de vendas]", url: "https://t.me/+JV13TdCOHTtiNzUx"},
    //       { text: "[CBMES Balcão de vendas]", url: "https://t.me/+FDp4Wnnvcww2NWFh"},
    //     ],
    //     [
    //       { text: "[PMAL Balcão de vendas]", url: "https://t.me/+B3aLTGTJcv1lMDUx"},
    //       { text: "[CBMAL Balcão de vendas]", url: "https://t.me/+Hc5se9g2xyo1ZGIx"},
    //       { text: "[PMSE Balcão de vendas]", url: "https://t.me/+XfvUCQjlkFM4YTIx"},
    //     ],
    //     [
    //       { text: "[CBMSE Balcão de vendas]", url: "https://t.me/+5h3gnKyUcy8zYWZh"},
    //       { text: "[PMPE Balcão de vendas]", url: "https://t.me/+tM5arpf0v7VhYTMx"},
    //       { text: "[CBMPE Balcão de vendas]", url: "https://t.me/+L22WPiHuO3BhMmMx"},
    //     ],
    //     [
    //       { text: "[PMRN Balcão de vendas]", url: "https://t.me/+v0S0DcDy0QkxYTFh"},
    //       { text: "[CBMRN Balcão de vendas]", url: "https://t.me/+mtohgUmaWIc2Mzdh"},
    //       { text: "[PMCE Balcão de vendas]", url: "https://t.me/+5C7aqMfBTBIzNDZh"},
    //     ],
    //     [
    //       { text: "[CBMCE Balcão de vendas]", url: "https://t.me/+tOrjCxMj9q8zOGZh"},
    //       { text: "[PMPI Balcão de vendas]", url: "https://t.me/+s-ZZoXIHK7MwYjJh"},
    //       { text: "[CBMPI Balcão de vendas]", url: "https://t.me/+a2nMvkzqghs3ODgx"},
    //     ],
    //     [
    //       { text: "[PMMA Balcão de vendas]", url: "https://t.me/+XiwfKrnun89mNDBh"},
    //       { text: "[CBMMA Balcão de vendas]", url: "https://t.me/+mneokjSq4ps4M2Ex"},
    //       { text: "[PMAM Balcão de vendas]", url: "https://t.me/+4Eeqv2ozfj1kYzJh"},
    //     ],
    //     [
    //       { text: "[CBMAM Balcão de vendas]", url: "https://t.me/+cDVMXWkD-KQzOWEx"},
    //       { text: "[PMAP Balcão de vendas]", url: "https://t.me/+HjRdxZJ67-dkNDhh"},
    //       { text: "[CBMAP Balcão de vendas]", url: "https://t.me/+vTqnwRleGJ80MjQx"},
    //     ],
    //     [
    //       { text: "[PMRO Balcão de vendas]", url: "https://t.me/+Tm-64V_q9UBiMzBh"},
    //       { text: "[CBMRO Balcão de vendas]", url: "https://t.me/+FPD7RiIuZTViNDhh"},
    //       { text: "[PMTO Balcão de vendas]", url: "https://t.me/+r6UUjs46txhkMWYx"},
    //     ],
    //     [
    //       { text: "[CBMTO Balcão de vendas]", url: "https://t.me/+7zTSApKXHKU5YmRh"},
    //       { text: "[PMAC Balcão de vendas]", url: "https://t.me/+36pWf9eJyro0YWVh"},
    //       { text: "[CBMAC Balcão de vendas]", url: "https://t.me/+1awWjaRF0oNhOTYx"},
    //     ],
    //     [
    //       { text: "[PMPA Balcão de vendas]", url: "https://t.me/+FwfafSnUETdkMjgx"},
    //       { text: "[CBMPA Balcão de vendas]", url: "https://t.me/+-tmrxVAwTFJjZmQx"},
    //       { text: "[PMRR Balcão de vendas]", url: "https://t.me/+ozYpjtkqsxZlOWNh"},
    //     ],
    //     [
    //       { text: "[CBMRR Balcão de vendas]", url: "https://t.me/+xuF17ilK2qVhZDQx"},
    //       { text: "[PMPB Balcão de vendas]", url: "https://t.me/+O39pUzjayrEyMjY5"},
    //       { text: "[CBMPB Balcão de vendas]", url: "https://t.me/+KQWkzjvExhA2N2Ex"},
    //     ],        
    //   ],        
    //   },
    // };



  
    // const artigos_civis: TelegramBot.SendMessageOptions = {
    //   reply_markup: {
    //     inline_keyboard: [
    //     [
    //       { text: "[Uniforme Balcão de vendas]", url: "https://t.me/+07bigcW1r4syMjRh"},
    //       { text: "[Veículo Balcão de vendas]", url: "https://t.me/+CcK6KcqceLRkZjhh" },
    //       { text: "[Serviço Balcão de vendas]", url: "https://t.me/+0ni_n2uu5wQwNDYx"},
    //     ],
    //     [
    //       { text: "[Smartphone Balcão de vendas]", url: "https://t.me/+oTtGpdSVjZJjMzkx"},
    //       { text: "[Acessório Balcão de vendas]", url: "https://t.me/+jV7ioExY8XRkMGYx"},
    //       { text: "[Eletrodoméstico Balcão de vendas]", url: "https://t.me/+lafHsTpLYLM0NTgx"},
    //     ],
    //     [
    //       { text: "[Automotivo Balcão de vendas]", url: "https://t.me/+UaJaV4ey4Z43YzQx"},
    //       { text: "[Áudio Balcão de vendas]", url: "https://t.me/+HtkbigIaR6YzNmIx"},
    //       { text: "[Eletroportátil Balcão de vendas]", url: "https://t.me/+8qvV2dgSEdNkZTgx"},
    //     ],
    //     [
    //       { text: "[Ferramenta Balcão de vendas]", url: "https://t.me/+Qe4AWjFnm4BiYmJh"},
    //       { text: "[Bebida Balcão de vendas]", url: "https://t.me/+FtkZD1h-GAk2OTJh"},
    //       { text: "[Bebê Balcão de vendas]", url: "https://t.me/+mYGNUwXiyb8wYzcx"},
    //     ],
    //     [
    //       { text: "[Esporte Balcão de vendas]", url: "https://t.me/+giWAHbN3AuQ4NmYx"},
    //       { text: "[Smart TV Balcão de vendas]", url: "https://t.me/+nt5pJ_-m2HoxNGYx"},
    //       { text: "[Ar e Ventilação Balcão de vendas]", url: "https://t.me/+tr2ws_c0hnQwNmIx"},
    //     ],
    //     [
    //       { text: "[Imóvel Balcão de vendas]", url: "https://t.me/+dTc2DriyCCZmNDUx"},
    //       { text: "[Brinquedo Balcão de vendas]", url: "https://t.me/+sEunOn7qodJhMWYx"},
    //       { text: "[Informática Balcão de vendas]", url: "https://t.me/+31XlqHxWcfA0YWVh"},
    //     ],
    //     [
    //       { text: "[Game Balcão de vendas]", url: "https://t.me/+6jF7Q3oL8-BjMjkx"},
    //       { text: "[Móvel Balcão de vendas]", url: "https://t.me/+MlaeVILmRR84MzNh"},
    //       { text: "[Utilidade Doméstica Balcão de vendas]", url: "https://t.me/+UKKjuOU36ylmZjhh"},
    //     ],
    //     [
    //       {text: "[Material Escolar Balcão de vendas]", url: ""}
    //     ]
    //   ],        
    //   },
    // };
    
    // Manipular callback_query
    bot.on("callback_query", async (callbackQuery: TelegramBot.CallbackQuery) => {
      console.log(callbackQuery)
      const msg = callbackQuery.data;
      const chatId = callbackQuery.message?.chat.id;
      const username = callbackQuery.message?.chat.username; 
      const id_telegram = chatId || ''    

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...');
      const messageId = msg_del.message_id.toString()

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

A qual instituição você pertence?          
        ` 
        ,instituicao);
        await bot.deleteMessage(id_telegram, messageId)
        }else{
        await bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro: 

A qual instituição você pertence?      
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

      const req = await prisma_db.users.findUnique({
        where:{id_telegram:id_telegram.toString()}
      }) 

      if(!req){ // Primeiro contato com o bot  
      await bot.sendMessage(id_telegram, termo1, {parse_mode: 'Markdown'});
      await bot.sendMessage(id_telegram, termo2, {parse_mode: 'Markdown'});
      await bot.sendMessage(id_telegram, termo3, {parse_mode: 'Markdown'});
      await bot.sendMessage(id_telegram,"Eu li e concordo com os termos de uso:",termos_uso);
      bot.deleteMessage(id_telegram, messageId)
      //colocar um botão de OK aqui!!        
      }else{
        if(req.termo){
          if(req.instituicao===null){              
            // Qual seu cpf
          await bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro: 

A qual instituição você pertence?           
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
            await bot.sendMessage(id_telegram, `Digite seu CPF: 
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
            }
            return
          }
          if(req.email===null||req.email===''){  

            const email = texto||''
            
            function Validador_email(email: string) {
              const emailValido = validator.isEmail(email);            
              return emailValido
            }

            if(Validador_email(email)){          
            await prisma_db.users.update({
              where:{id_telegram: id_telegram},
              data:{email: texto}
            })
            await bot.sendMessage(id_telegram,`Digite seu telefone com DDD no padrão abaixo:`);
            await bot.sendMessage(id_telegram,`(99)999999999`);
            bot.deleteMessage(id_telegram, messageId)
            return

            }else{
              await bot.sendMessage(id_telegram, `Você precisa digitar um E-mail válido!`);
              bot.deleteMessage(id_telegram, messageId)
            }          

            return
          }
          if(req.phone===null){           

            function isTelefoneValido(texto: any) {
              // Expressão regular para verificar o padrão (99)123456789 ou (99)1234567890
              const regex = /^\(\d{2}\)\d{8,9}$/;
            
              // Testa o texto contra a expressão regular
              return regex.test(texto);
            }
            console.log(isTelefoneValido(texto))
            // 
            if(isTelefoneValido(texto)){

              const link_group = await prisma_db.grupos.findUnique({
                where: { type: req?.instituicao||''}
              })
              
              const artigos_militares: TelegramBot.SendMessageOptions = {
                reply_markup: {
                  inline_keyboard: [[{ text: req?.instituicao+"Balcão de vendas", url: link_group?.link}]]}}
               // updata no banco salvando telefone
              const partes = texto?.split(/[()]/)||'';
              // Filtrar apenas os caracteres numéricos
              const ddd = partes[1].replace(/\D/g, '');
              const telefone = partes[2].replace(/\D/g, '');
              console.log(ddd,telefone)

              await prisma_db.users.update({
                where:{id_telegram: id_telegram},
                data:{phone: telefone, ddd_phone:ddd}
              })

              await bot.sendMessage(id_telegram,`
Prontinho, seu cadastro foi realizado com sucesso!! 🥳
Segue abaixo o Balcão que você pode acessar para comprar ou vender um produto!          
          `
            ,);

            await bot.sendMessage(id_telegram,`
Grupo de Artigo Militar:
                      `
                        ,artigos_militares);
// EXIBE OS ARTIGOS CIVIS.
//             await bot.sendMessage(id_telegram,`
// Grupos de Artigo Civil          
//                       `
//                         ,artigos_civis);
            bot.deleteMessage(id_telegram, messageId)
            }else{
              await bot.sendMessage(id_telegram,`Digite seu telefone com DDD no padrão abaixo:`);
              await bot.sendMessage(id_telegram,`DDD com parênteses, mais número de telefone:`);
              await bot.sendMessage(id_telegram,`(99)999999999`);
              bot.deleteMessage(id_telegram, messageId)
            }
           
            return
          }
          else{
            const link_group = await prisma_db.grupos.findUnique({
              where: { type: req?.instituicao||''}
            })
            
            const artigos_militares: TelegramBot.SendMessageOptions = {
              reply_markup: {
                inline_keyboard: [[{ text: req?.instituicao+"Balcão de vendas", url: link_group?.link}]]}}
                
await bot.sendMessage(id_telegram,`
Prontinho, seu cadastro foi realizado com sucesso!! 🥳
Segue abaixo os Balcões que você pode acessar para comprar ou vender um produto!          
        `
          ,);

          await bot.sendMessage(id_telegram,`
Grupo de Artigo Militar:
                    `
                      ,artigos_militares);
// EXIBE OS ARTIGOS CIVIS.
// Foi feito um pedido para que os artigos civis apareçam apenas dentro dos canais do BDMil.
//           await bot.sendMessage(id_telegram,`
// Grupos de Artigo Civil          
//                     `
//                       ,artigos_civis);
          bot.deleteMessage(id_telegram, messageId)
          }

        }

      }
    });
  }
}

export { Bot_bd_mil };