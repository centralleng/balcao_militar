import nodemailer from "nodemailer";

export function Email_venda_aprovada_produtor(email_vendedor:string, email_comprador:string, name_comprador:string, name_vendedor:string, valor:number, titulo:string){
 
const msg = {
texto:
`<header style="background-color: #8dbcb4; color: #ffffff;">
<div style="padding: 2% 10%; border-radius: 10px; font-size: 20px;">Olá, ${name_vendedor}</div>
</header>
<article>
<div style="padding: 5% 10%;">
    <h4 style="color: #8dbcb4; font-size: 18px;">Parabéns!!!</h4>
    <h4 style="color: #8dbcb4; font-size: 14px;">Uma venda foi aprovada.</h4></br>
    <h4 style="color:black; padding-top: 25px;">Descrição da Venda:</h4>
    <h4 style="color:black;">Título Produto: ${titulo}.</h4>
    <h4 style="color:black;">Valor Produto: ${new Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL'}).format(valor/100)}.</h4>
    <h4 style="color:black;">Nome Comprador: ${name_comprador}.</h4>
    <h4 style="color:black;">Email Comprador: ${email_comprador}.</h4>
</div>
    <P style=" color: #8dbcb4;">Att,</P>
    <P style=" color: #8dbcb4;">Equipe COPPS</P>
</article><br/><br/><br/>
<hr style="background-color: #8dbcb4;">
<footer style="color:black; padding: 10px;">
    <h4>Siga nossas redes sociais:</h4>
    <h5><a style=" color: #8dbcb4; font-style: italic; text-decoration-line: underline;" href="#">INSTAGRAM</a></h5>
    <h5><a style=" color: #8dbcb4; font-style: italic; text-decoration-line: underline;" href="#">YOUTUBE</a></h5>
    <h5><a style=" color: #8dbcb4; font-style: italic; text-decoration-line: underline;" href="#">FACEBOOK</a></h5>
</footer>
<hr style="background-color: #8dbcb4;">`
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
    from: `COPPS | Informativo de Venda <comercial@copps.com.br>`,
    to: email_vendedor,
    subject: 'Venda Aprovada!',
    text: "",
    html: msg.texto,
    }).then(message =>{
        console.log(message)
    }).catch(err => {
        console.log(err)
    }) 
}