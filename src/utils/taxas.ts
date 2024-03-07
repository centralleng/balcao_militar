export const taxa_empresa = (categoria: string, valor_produto:string, quantidade:string) => {

    const valor = parseInt(((Math.round(parseFloat(valor_produto))).toString()).replace(/\./g, ''))*parseInt(quantidade)

    const calcula_tempo_nomal = (valor_tempo:number) => {  
      
      console.log("problema",valor_tempo)  

      if(valor_tempo<=10000){
        return 1
      }   
      if(valor_tempo>10000&&valor_tempo<=20000){
        return 2
      }    
      if(valor_tempo>20000&&valor_tempo<=40000){
        return 3
      }     
      if(valor_tempo>40000&&valor_tempo<=80000){
        return 4
      } 
      if(valor_tempo>80000&&valor_tempo<=200000){
        return 5
      }  
      if(valor_tempo>200000){
        return 6
      } 
    }

    const calcula_imovel_veiculo = (valor_tempo:number) => {  

      console.log("problema",valor_tempo)      
      
      if(valor_tempo<=500000){
        return 1
      } 
      if(valor_tempo>500001&&valor_tempo<=2000000){
        return 2
      }     
      if(valor_tempo>2000000&&valor_tempo<=4500000){
        return 3
      }        
      if(valor_tempo>4500000&&valor_tempo<=8000000){
        return 4
      }         
      if(valor_tempo>8000000&&valor_tempo<=12000000){
        return 5
      } 
      if(valor_tempo>12000000){
        return 6
      }    
    }

    let valor_anuncio;
    let tempo;

    switch (categoria) {
      case "[Veiculo]":
        valor_anuncio = parseInt(((Math.round((parseFloat(valor_produto) * 0.001))).toString()).replace(/\./g, ''))*parseInt(quantidade)
        tempo = calcula_imovel_veiculo(valor)       
        break;
      case "[Imovel]":
        valor_anuncio = parseInt(((Math.round((parseFloat(valor_produto) * 0.001))).toString()).replace(/\./g, ''))*parseInt(quantidade)
        tempo = calcula_imovel_veiculo(valor) 
        break;
      // case "[Automotivo]":
      //   valor_anuncio = ((Math.round((parseFloat(valor_produto) * 0.001))).toString()).replace(/\./g, '')                  
      //   break;
      case "[Servico]":
        valor_anuncio = '600'
        tempo = 1 
        break;

      default:
        valor_anuncio = parseInt(((Math.round((parseFloat(valor_produto) * 0.03))).toString()).replace(/\./g, ''))*parseInt(quantidade)
        tempo = calcula_tempo_nomal(valor)
        break;
    }
    
    return {valor_anuncio, tempo}
  }