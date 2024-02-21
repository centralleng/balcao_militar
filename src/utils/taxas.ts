export const taxa_empresa = (categoria: string, texto:string) => {

    let valor_anuncio

    switch (categoria) {
      case "[Veiculo]":
        valor_anuncio = ((Math.round((parseFloat(texto) * 0.001) * 100)).toString()).replace(/\./g, '')
        break;
      case "[Imovel]":
        valor_anuncio = ((Math.round((parseFloat(texto) * 0.001) * 100)).toString()).replace(/\./g, '')
        break;
      // case "[Automotivo]":
      //   valor_anuncio = ((Math.round((parseFloat(texto) * 0.001) * 100)).toString()).replace(/\./g, '')                  
      //   break;
      case "[Servico]":
        valor_anuncio = '600'
        break;

      default:
        valor_anuncio = ((Math.round((parseFloat(texto) * 0.03) * 100)).toString()).replace(/\./g, '')
        break;
    }
    
    return valor_anuncio
  }