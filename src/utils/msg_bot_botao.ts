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
                    { text: "SUPORTE", url: "https://t.me/" },
                ],
            ],
        },
    }


    artigos_militares = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "[EB] vendas", callback_data: "CADASTRO_[EB]" },
                    { text: "[MB] vendas", callback_data: "CADASTRO_[MB]" },
                    { text: "[FAB] vendas", callback_data: "CADASTRO_[FAB]" },
                ],
                [
                    { text: "[PMERJ] vendas", callback_data: "CADASTRO_[PMERJ]" },
                    { text: "[CBMERJ] vendas", callback_data: "CADASTRO_[CBMERJ]" },
                    { text: "[PMDF] vendas", callback_data: "CADASTRO_[PMDF]" },
                ],
                [
                    { text: "[CBMDF] vendas", callback_data: "CADASTRO_[CBMDF]" },
                    { text: "[PMESP] vendas", callback_data: "CADASTRO_[PMESP]" },
                    { text: "[CBMESP] vendas", callback_data: "CADASTRO_[CBMESP]" },
                ],
                [
                    { text: "[PMMG] vendas", callback_data: "CADASTRO_[PMMG]" },
                    { text: "[CBMMG] vendas", callback_data: "CADASTRO_[CBMMG]" },
                    { text: "[PMGO] vendas", callback_data: "CADASTRO_[PMGO]" },
                ],
                [
                    { text: "[CBMGO] vendas", callback_data: "CADASTRO_[CBMGO]" },
                    { text: "[PMPR] vendas", callback_data: "CADASTRO_[PMPR]" },
                    { text: "[CBMPR] vendas", callback_data: "CADASTRO_[CBMPR]" },
                ],
                [
                    { text: "[PMSC] vendas", callback_data: "CADASTRO_[PMSC]" },
                    { text: "[CBMSC] vendas", callback_data: "CADASTRO_[CBMSC]" },
                    { text: "[BRIGADA MILITAR] vendas", callback_data: "CADASTRO_[BRIGADA-MILITAR]" },
                ],
                [
                    { text: "[CBMRS] vendas", callback_data: "CADASTRO_[CBMRS]" },
                    { text: "[PMMS] vendas", callback_data: "CADASTRO_[PMMS]" },
                    { text: "[CBMMS] vendas", callback_data: "CADASTRO_[CBMMS]" },
                ],
                [
                    { text: "[PMMT] vendas", callback_data: "CADASTRO_[PMMT]" },
                    { text: "[CBMMT] vendas", callback_data: "CADASTRO_[CBMMT]" },
                    { text: "[PMBA] vendas", callback_data: "CADASTRO_[PMBA]" },
                ],
                [
                    { text: "[CBMBA] vendas", callback_data: "CADASTRO_[CBMBA]" },
                    { text: "[PMES] vendas", callback_data: "CADASTRO_[PMES]" },
                    { text: "[CBMES] vendas", callback_data: "CADASTRO_[CBMES]" },
                ],
                [
                    { text: "[PMAL] vendas", callback_data: "CADASTRO_[PMAL]" },
                    { text: "[CBMAL] vendas", callback_data: "CADASTRO_[CBMAL]" },
                    { text: "[PMSE] vendas", callback_data: "CADASTRO_[PMSE]" },
                ],
                [
                    { text: "[CBMSE] vendas", callback_data: "CADASTRO_[CBMSE]" },
                    { text: "[PMPE] vendas", callback_data: "CADASTRO_[PMPE]" },
                    { text: "[CBMPE] vendas", callback_data: "CADASTRO_[CBMPE]" },
                ],
                [
                    { text: "[PMRN] vendas", callback_data: "CADASTRO_[PMRN]" },
                    { text: "[CBMRN] vendas", callback_data: "CADASTRO_[CBMRN]" },
                    { text: "[PMCE] vendas", callback_data: "CADASTRO_[PMCE]" },
                ],
                [
                    { text: "[CBMCE] vendas", callback_data: "CADASTRO_[CBMCE]" },
                    { text: "[PMPI] vendas", callback_data: "CADASTRO_[PMPI]" },
                    { text: "[CBMPI] vendas", callback_data: "CADASTRO_[CBMPI]" },
                ],
                [
                    { text: "[PMMA] vendas", callback_data: "CADASTRO_[PMMA]" },
                    { text: "[CBMMA] vendas", callback_data: "CADASTRO_[CBMMA]" },
                    { text: "[PMAM] vendas", callback_data: "CADASTRO_[PMAM]" },
                ],
                [
                    { text: "[CBMAM] vendas", callback_data: "CADASTRO_[CBMAM]" },
                    { text: "[PMAP] vendas", callback_data: "CADASTRO_[PMAP]" },
                    { text: "[CBMAP] vendas", callback_data: "CADASTRO_[CBMAP]" },
                ],
                [
                    { text: "[PMRO] vendas", callback_data: "CADASTRO_[PMRO]" },
                    { text: "[CBMRO] vendas", callback_data: "CADASTRO_[CBMRO]" },
                    { text: "[PMTO] vendas", callback_data: "CADASTRO_[PMTO]" },
                ],
                [
                    { text: "[CBMTO] vendas", callback_data: "CADASTRO_[CBMTO]" },
                    { text: "[PMAC] vendas", callback_data: "CADASTRO_[PMAC]" },
                    { text: "[CBMAC] vendas", callback_data: "CADASTRO_[CBMAC]" },
                ],
                [
                    { text: "[PMPA] vendas", callback_data: "CADASTRO_[PMPA]" },
                    { text: "[CBMPA] vendas", callback_data: "CADASTRO_[CBMPA]" },
                    { text: "[PMRR] vendas", callback_data: "CADASTRO_[PMRR]" },
                ],
                [
                    { text: "[CBMRR] vendas", callback_data: "CADASTRO_[CBMRR]" },
                    { text: "[PMPB] vendas", callback_data: "CADASTRO_[PMPB]" },
                    { text: "[CBMPB] vendas", callback_data: "CADASTRO_[CBMPB]" },
                ],
            ],
        },
    }


    artigos_civis = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "[Uniforme] vendas", callback_data: "CADASTRO_[Uniforme]" },
                    { text: "[Veículo] vendas", callback_data: "CADASTRO_[Veiculo]" },
                    { text: "[Serviço] vendas", callback_data: "CADASTRO_[Servico]" },
                ],
                [
                    { text: "[Smartphone] vendas", callback_data: "CADASTRO_[Smartphone]" },
                    { text: "[Acessório] vendas", callback_data: "CADASTRO_[Acessorio]" },
                    { text: "[Eletrodoméstico] vendas", callback_data: "CADASTRO_[Eletrodomestico]" },
                ],
                [
                    { text: "[Automotivo] vendas", callback_data: "CADASTRO_[Automotivo]" },
                    { text: "[Audio] vendas", callback_data: "CADASTRO_[Audio]" },
                    { text: "[Eletroportátil] vendas", callback_data: "CADASTRO_[Eletroportatil]" },
                ],
                [
                    { text: "[Ferramenta] vendas", callback_data: "CADASTRO_[Ferramenta]" },
                    { text: "[Bebida] vendas", callback_data: "CADASTRO_[Bebida]" },
                    { text: "[Bebê] vendas", callback_data: "CADASTRO_[Bebe]" },
                ],
                [
                    { text: "[Esporte] vendas", callback_data: "CADASTRO_[Esporte]" },
                    { text: "[Smart TV] vendas", callback_data: "CADASTRO_[Smart-TV]" },
                    { text: "[Ar e Ventilação] vendas", callback_data: "CADASTRO_[Ar-e-Ventilacao]" },
                ],
                [
                    { text: "[Imóvel] vendas", callback_data: "CADASTRO_[Imovel]" },
                    { text: "[Brinquedo] vendas", callback_data: "CADASTRO_[Brinquedo]" },
                    { text: "[Informática] vendas", callback_data: "CADASTRO_[Informatica]" },
                ],
                [
                    { text: "[Game] vendas", callback_data: "CADASTRO_[Game]" },
                    { text: "[Móvel] vendas", callback_data: "CADASTRO_[Movel]" },
                    { text: "[Utilidade Doméstica] vendas", callback_data: "CADASTRO_[Utilidade-Domestica]" },
                ],
                [
                    { text: "[Material Escolar] vendas", callback_data: "CADASTRO_[Material-Escolar]" },
                ],
            ],
        },
    }
}


export const botao = new Botoes


