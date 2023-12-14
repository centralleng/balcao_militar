import { prisma_db } from "../../database/prisma_db";

interface dados {

    type                :string;
    nome                :string;
    documento           :string;
    type_document       :string;
    email               :string;    
    password            :string;     
    ddd_phone           :string;
    phone               :string;
    token_auth_password :string;
    avatar_url          :string;
    
}

async function Cadastro_usersService ( dados: dados, id_user:string) {

    const req = await prisma_db.users.findUnique({
        where:{email: dados.email}
    })

    if(req){
        return 'ja existe usurario com esse email'
    }

    const users = await prisma_db.users.create({
      data:{
        type               :dados.type,
        nome               :dados.nome,
        documento          :dados.type,
        type_document      :dados.type,
        email              :dados.type,  
        ddd_phone          :dados.type,
        phone              :dados.type,
        token_auth_password:dados.type,
        avatar_url         :dados.type

      }

    })
    return 'ok'

}export {Cadastro_usersService}