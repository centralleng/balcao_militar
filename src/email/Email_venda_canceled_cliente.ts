import nodemailer from "nodemailer";

export function Email_venda_canceled_cliente(email_vendedor:string, email_comprador:string, name_comprador:string, name_vendedor:string, valor:number, titulo:string){
  
    const msg = {
    texto:
    `<header style="background-color: #8C36EE; color: #ffffff;">
    <div style="padding: 2% 10%; border-radius: 10px; font-size: 20px;">Olá, ${name_comprador}</div>
    </header>
    <article>
    <div style="padding: 5% 10%;">
        <h4 style="color: #8C36EE; font-size: 18px;">Tudo certo!!!</h4>
        <h4 style="color: #8C36EE; font-size: 14px;">Sua compra foi cancelada.</h4></br>
        <h4 style="color:black; padding-top: 25px;">Descrição:</h4>
        <h4 style="color:black;">${titulo}.</h4>
        <h4 style="color:black;">Valor Produto: ${new Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL'}).format(valor/100)}.</h4>
        <h4 style="color:black;">Vendedor: ${name_vendedor}.</h4>
        <h4 style="color:black;">Email para contato: ${email_vendedor}.</h4>
    </div>
        <P style=" color: #8C36EE;">Att,</P>
        <P style=" color: #8C36EE;">Equipe COPPS</P>
    </article><br/><br/><br/>
    <hr style="background-color: #8C36EE;">
    <footer style="color:black; padding: 10px;">
        <h4>Siga nossas redes sociais:</h4>
        <h5><a style=" color: #8C36EE; font-style: italic; text-decoration-line: underline;" href="#">INSTAGRAM</a></h5>
        <h5><a style=" color: #8C36EE; font-style: italic; text-decoration-line: underline;" href="#">YOUTUBE</a></h5>
        <h5><a style=" color: #8C36EE; font-style: italic; text-decoration-line: underline;" href="#">FACEBOOK</a></h5>
    </footer>
    <hr style="background-color: #8C36EE;">`
    }
  
     const transport = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587,
      secure: false,
      auth: {
        user: "comercial@copps.com.br",
        pass: "copps@249010"
      },
      tls: { rejectUnauthorized: false }
    });      
        
    transport.sendMail({
    from: `${titulo} | COPPS <comercial@copps.com.br>`,
    to: email_comprador,
    subject: 'Compra Aprovada!',
    text: "",
    html: msg.texto,
    }).then(message =>{
        console.log(message)
    }).catch(err => {
        console.log(err)
    }) 
  }