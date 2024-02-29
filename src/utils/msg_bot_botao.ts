import TelegramBot from 'node-telegram-bot-api';

class Botoes {

    botao_inicial = {
        reply_markup: {
            inline_keyboard: [
                // [
                //   { text: "VENDER", callback_data: "VENDER" },
                //   // { text: "MEUS PRODUTOS", callback_data: "MEUS_PRODUTOS"},
                // ],
                // [
                //   { text: "SUPORTE", url: "https://t.me/" },
                //   { text: "TUTORIAL", callback_data: "https://t.me/" },
                //   { text: "DELETAR", callback_data: "DELETAR_PRODUTO" },
                // ],
                [
                    { text: "ATUALIZAR", callback_data: "ATUALIZAR" },
                    { text: "EDITAR", callback_data: "EDITAR" },
                    { text: "DELETAR", callback_data: "DELETAR_PRODUTO" },
                ],
            ],
        },
    }


    msg_deletar_produto = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "DELETAR", callback_data: "DELETAR_PRODUTO" },
                ],
            ],
        },
    }


    suporte_tutorial = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "SUPORTE", url: "https://t.me/" },
                    { text: "TUTORIAL", url: "https://t.me/" },
                ],
            ],
        },
    }

    suporte = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "SUPORTE", url: "https://t.me/BDMilSUPORTE_bot" },
                ],
            ],
        },
    }

    sugestao = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "SUGESTÕES", url: "https://t.me/BDMilSUGESTOES_bot" },
                ],
            ],
        },
    }


    artigos_militares = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "[EB] vendas", callback_data: "CADASTRO_[EB]_APAGAR-01" },
                    { text: "[MB] vendas", callback_data: "CADASTRO_[MB]_APAGAR-01" },
                    { text: "[FAB] vendas", callback_data: "CADASTRO_[FAB]_APAGAR-01" },
                ],
                [
                    { text: "[PMERJ] vendas", callback_data: "CADASTRO_[PMERJ]_APAGAR-01" },
                    { text: "[CBMERJ] vendas", callback_data: "CADASTRO_[CBMERJ]_APAGAR-01" },
                    { text: "[PMDF] vendas", callback_data: "CADASTRO_[PMDF]_APAGAR-01" },
                ],
                [
                    { text: "[CBMDF] vendas", callback_data: "CADASTRO_[CBMDF]_APAGAR-01" },
                    { text: "[PMESP] vendas", callback_data: "CADASTRO_[PMESP]_APAGAR-01" },
                    { text: "[CBMESP] vendas", callback_data: "CADASTRO_[CBMESP]_APAGAR-01" },
                ],
                [
                    { text: "[PMMG] vendas", callback_data: "CADASTRO_[PMMG]_APAGAR-01" },
                    { text: "[CBMMG] vendas", callback_data: "CADASTRO_[CBMMG]_APAGAR-01" },
                    { text: "[PMGO] vendas", callback_data: "CADASTRO_[PMGO]_APAGAR-01" },
                ],
                [
                    { text: "[CBMGO] vendas", callback_data: "CADASTRO_[CBMGO]_APAGAR-01" },
                    { text: "[PMPR] vendas", callback_data: "CADASTRO_[PMPR]_APAGAR-01" },
                    { text: "[CBMPR] vendas", callback_data: "CADASTRO_[CBMPR]_APAGAR-01" },
                ],
                [
                    { text: "[PMSC] vendas", callback_data: "CADASTRO_[PMSC]_APAGAR-01" },
                    { text: "[CBMSC] vendas", callback_data: "CADASTRO_[CBMSC]_APAGAR-01" },
                    { text: "[BRIGADA MILITAR] vendas", callback_data: "CADASTRO_[BRIGADA-MILITAR]_APAGAR-01" },
                ],
                [
                    { text: "[CBMRS] vendas", callback_data: "CADASTRO_[CBMRS]_APAGAR-01" },
                    { text: "[PMMS] vendas", callback_data: "CADASTRO_[PMMS]_APAGAR-01" },
                    { text: "[CBMMS] vendas", callback_data: "CADASTRO_[CBMMS]_APAGAR-01" },
                ],
                [
                    { text: "[PMMT] vendas", callback_data: "CADASTRO_[PMMT]_APAGAR-01" },
                    { text: "[CBMMT] vendas", callback_data: "CADASTRO_[CBMMT]_APAGAR-01" },
                    { text: "[PMBA] vendas", callback_data: "CADASTRO_[PMBA]_APAGAR-01" },
                ],
                [
                    { text: "[CBMBA] vendas", callback_data: "CADASTRO_[CBMBA]_APAGAR-01" },
                    { text: "[PMES] vendas", callback_data: "CADASTRO_[PMES]_APAGAR-01" },
                    { text: "[CBMES] vendas", callback_data: "CADASTRO_[CBMES]_APAGAR-01" },
                ],
                [
                    { text: "[PMAL] vendas", callback_data: "CADASTRO_[PMAL]_APAGAR-01" },
                    { text: "[CBMAL] vendas", callback_data: "CADASTRO_[CBMAL]_APAGAR-01" },
                    { text: "[PMSE] vendas", callback_data: "CADASTRO_[PMSE]_APAGAR-01" },
                ],
                [
                    { text: "[CBMSE] vendas", callback_data: "CADASTRO_[CBMSE]_APAGAR-01" },
                    { text: "[PMPE] vendas", callback_data: "CADASTRO_[PMPE]_APAGAR-01" },
                    { text: "[CBMPE] vendas", callback_data: "CADASTRO_[CBMPE]_APAGAR-01" },
                ],
                [
                    { text: "[PMRN] vendas", callback_data: "CADASTRO_[PMRN]_APAGAR-01" },
                    { text: "[CBMRN] vendas", callback_data: "CADASTRO_[CBMRN]_APAGAR-01" },
                    { text: "[PMCE] vendas", callback_data: "CADASTRO_[PMCE]_APAGAR-01" },
                ],
                [
                    { text: "[CBMCE] vendas", callback_data: "CADASTRO_[CBMCE]_APAGAR-01" },
                    { text: "[PMPI] vendas", callback_data: "CADASTRO_[PMPI]_APAGAR-01" },
                    { text: "[CBMPI] vendas", callback_data: "CADASTRO_[CBMPI]_APAGAR-01" },
                ],
                [
                    { text: "[PMMA] vendas", callback_data: "CADASTRO_[PMMA]_APAGAR-01" },
                    { text: "[CBMMA] vendas", callback_data: "CADASTRO_[CBMMA]_APAGAR-01" },
                    { text: "[PMAM] vendas", callback_data: "CADASTRO_[PMAM]_APAGAR-01" },
                ],
                [
                    { text: "[CBMAM] vendas", callback_data: "CADASTRO_[CBMAM]_APAGAR-01" },
                    { text: "[PMAP] vendas", callback_data: "CADASTRO_[PMAP]_APAGAR-01" },
                    { text: "[CBMAP] vendas", callback_data: "CADASTRO_[CBMAP]_APAGAR-01" },
                ],
                [
                    { text: "[PMRO] vendas", callback_data: "CADASTRO_[PMRO]_APAGAR-01" },
                    { text: "[CBMRO] vendas", callback_data: "CADASTRO_[CBMRO]_APAGAR-01" },
                    { text: "[PMTO] vendas", callback_data: "CADASTRO_[PMTO]_APAGAR-01" },
                ],
                [
                    { text: "[CBMTO] vendas", callback_data: "CADASTRO_[CBMTO]_APAGAR-01" },
                    { text: "[PMAC] vendas", callback_data: "CADASTRO_[PMAC]_APAGAR-01" },
                    { text: "[CBMAC] vendas", callback_data: "CADASTRO_[CBMAC]_APAGAR-01" },
                ],
                [
                    { text: "[PMPA] vendas", callback_data: "CADASTRO_[PMPA]_APAGAR-01" },
                    { text: "[CBMPA] vendas", callback_data: "CADASTRO_[CBMPA]_APAGAR-01" },
                    { text: "[PMRR] vendas", callback_data: "CADASTRO_[PMRR]_APAGAR-01" },
                ],
                [
                    { text: "[CBMRR] vendas", callback_data: "CADASTRO_[CBMRR]_APAGAR-01" },
                    { text: "[PMPB] vendas", callback_data: "CADASTRO_[PMPB]_APAGAR-01" },
                    { text: "[CBMPB] vendas", callback_data: "CADASTRO_[CBMPB]_APAGAR-01" },
                ],
            ],
        },
    }

    artigos_civis = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "[Uniforme] vendas", callback_data: "CADASTRO_[Uniforme]_APAGAR" },
                    { text: "[Veículo] vendas", callback_data: "CADASTRO_[Veiculo]_APAGAR" },
                    { text: "[Serviço] vendas", callback_data: "CADASTRO_[Servico]_APAGAR" },
                ],
                [
                    { text: "[Smartphone] vendas", callback_data: "CADASTRO_[Smartphone]_APAGAR" },
                    { text: "[Acessório] vendas", callback_data: "CADASTRO_[Acessorio]_APAGAR" },
                    { text: "[Eletrodoméstico] vendas", callback_data: "CADASTRO_[Eletrodomestico]_APAGAR" },
                ],
                [
                    { text: "[Automotivo] vendas", callback_data: "CADASTRO_[Automotivo]_APAGAR" },
                    { text: "[Audio] vendas", callback_data: "CADASTRO_[Audio]_APAGAR" },
                    { text: "[Eletroportátil] vendas", callback_data: "CADASTRO_[Eletroportatil]_APAGAR" },
                ],
                [
                    { text: "[Ferramenta] vendas", callback_data: "CADASTRO_[Ferramenta]_APAGAR" },
                    { text: "[Bebida] vendas", callback_data: "CADASTRO_[Bebida]_APAGAR" },
                    { text: "[Bebê] vendas", callback_data: "CADASTRO_[Bebe]_APAGAR" },
                ],
                [
                    { text: "[Esporte] vendas", callback_data: "CADASTRO_[Esporte]_APAGAR" },
                    { text: "[Smart TV] vendas", callback_data: "CADASTRO_[Smart-TV]_APAGAR" },
                    { text: "[Ar e Ventilação] vendas", callback_data: "CADASTRO_[Ar-e-Ventilacao]_APAGAR" },
                ],
                [
                    { text: "[Imóvel] vendas", callback_data: "CADASTRO_[Imovel]_APAGAR" },
                    { text: "[Brinquedo] vendas", callback_data: "CADASTRO_[Brinquedo]_APAGAR" },
                    { text: "[Informática] vendas", callback_data: "CADASTRO_[Informatica]_APAGAR" },
                ],
                [
                    { text: "[Game] vendas", callback_data: "CADASTRO_[Game]_APAGAR" },
                    { text: "[Móvel] vendas", callback_data: "CADASTRO_[Movel]_APAGAR" },
                    { text: "[Utilidade Doméstica] vendas", callback_data: "CADASTRO_[Utilidade-Domestica]_APAGAR" },
                ],
                [
                    { text: "[Material Escolar] vendas", callback_data: "CADASTRO_[Material-Escolar]_APAGAR" },
                    { text: "[Passagens Aéreas] vendas", callback_data: "CADASTRO_[Passagens-Aereas]_APAGAR" },
                    { text: "[Tudo Pet] vendas", callback_data: "CADASTRO_[Tudo-Pet]_APAGAR" },
                ],
                [
                    { text: "[Ferramenta] vendas", callback_data: "CADASTRO_[Ferramenta]_APAGAR" },
                    { text: "[Mat. Construção] vendas", callback_data: "CADASTRO_[Mat-Construcao]_APAGAR" },
                ],
            ],
        },
    }
}

export const botao = new Botoes


