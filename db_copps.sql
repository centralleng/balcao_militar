CREATE TABLE users (
id BINARY(20) NOT NULL PRIMARY KEY,
status BOOLEAN,
id_telegram VARCHAR(100),
user_telegram VARCHAR(100),
type_user VARCHAR(15),
name VARCHAR(255),
last_name VARCHAR(255),
document VARCHAR(20),
type_document VARCHAR(15),
name_fantasia VARCHAR(255),
razao_social VARCHAR(255),
email VARCHAR(255),
password VARCHAR(255),
ddd_phone VARCHAR(4),
phone VARCHAR(15),
token_auth_password VARCHAR(255),
avatar_url VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enderecos (
id INT NOT NULL AUTO_INCREMENT,
cep VARCHAR(15),
endereco VARCHAR(100),
complemento VARCHAR(100),
bairro VARCHAR(100),
numero INT(6),
cidade VARCHAR(20),
estado VARCHAR(4),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id BINARY(20),
PRIMARY KEY(id)
);

CREATE TABLE recebedores (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_recebedor VARCHAR(100),
taxa_recebedor VARCHAR(5),
name_recebedor VARCHAR(255),
email_recebedor VARCHAR(255),
name_conta VARCHAR(255),
name_banco VARCHAR(100),
numero_banco VARCHAR(32),
agencia VARCHAR(32),
digito_ag VARCHAR(3),
conta VARCHAR(32),
digito_cc VARCHAR(3),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id BINARY(20)
);

CREATE TABLE categorias (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id BINARY(20)
);

CREATE TABLE subcategorias (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
categoria_id INT
);

CREATE TABLE produtos (
id BINARY(20) NOT NULL PRIMARY KEY,
codigo_produto VARCHAR(10),
banir VARCHAR(3),
status_venda VARCHAR(20),
type_product VARCHAR(20),
name VARCHAR(255),
description TEXT(300),
id_chat VARCHAR(100),
tipo_chat VARCHAR(20),
link_permanente VARCHAR(255),
img_capa VARCHAR(255),
link_para_suport VARCHAR(255),
valor_produto INT(10),
peso VARCHAR(10),
quantidade_estoque INT,
pixel_facebook_01 VARCHAR(20),
pixel_facebook_02 VARCHAR(20),
pixel_facebook_03 VARCHAR(20),
pixel_google VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id BINARY(20),
subcategoria_id INT
);

CREATE TABLE checkouts (
id BINARY(20) NOT NULL PRIMARY KEY,
name VARCHAR(255),
token_promocao   VARCHAR(20)
valor_promocao   INT(10)
porcentagem      INT(10)
cobrar_adesao BOOLEAN,
valor_adesao INT(10),
valor_unico INT(10),
valor_mensal INT(10),
valor_trimestral INT(10),
valor_semestral INT(10),
valor_anual INT(10),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
produto_id BINARY(20)
);

CREATE TABLE itens_checkouts (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
checkout_id INT,
produto_id BINARY(20)
);

CREATE TABLE pedidos (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_transacao VARCHAR(255),
id_cobranca VARCHAR(255),
id_assinatura VARCHAR(255),
codigo_compra VARCHAR(255),
taxa_recebedor VARCHAR(5),
id_chat  VARCHAR(100),
type VARCHAR(20),
type_recorrencia VARCHAR(255),
status VARCHAR(15),
quantidade_parcelas INT(5),
quantidade_cycle INT(5),
valor_total INT(10),
metodo_pagamento VARCHAR(15),
codigo_pix VARCHAR(255),
link_boleto VARCHAR(255),
codigo_boleto VARCHAR(255),
vencimento_boleto DATE,
data_vencimento DATE,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
produtor_user_id BINARY(20),
cliente_user_id BINARY(20)
);

CREATE TABLE itens_pedidos (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
pedido_id INT,
produto_id BINARY(20)
);

CREATE TABLE faturas_pedidos (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_fatura VARCHAR(100),
status VARCHAR(15),
mensagem VARCHAR(255),
valor_original INT(10),
valor_pago INT(10),
quantidade_parcelas INT(10),
cycle INT(3),
vencimento DATE,
metodo_pagamento VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
pedido_id INT
);

CREATE TABLE links_gerados (
id BINARY(20) NOT NULL PRIMARY KEY,
id_link VARCHAR(255),
id_chat VARCHAR(100),
id_telegram VARCHAR(100),
link_permanente VARCHAR(100),
data_vencimento DATE,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
pedido_id INT
);

CREATE TABLE membros (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_chat VARCHAR(100),
name VARCHAR(255),
sobrename VARCHAR(255),
email VARCHAR(255),
nome_telegram VARCHAR(50),
id_telegram VARCHAR(100),
user_telegram VARCHAR(255),
adm BOOLEAN,
bot BOOLEAN,
telefone VARCHAR(20),
nome_produto VARCHAR(255),
status_canal VARCHAR(10),
data_vencimento VARCHAR(20),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
produtor_user_id BINARY(20),
cliente_user_id BINARY(20)
);

CREATE TABLE saques (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_transacao VARCHAR(255),
id_banco INT,
documento VARCHAR(255),
banco VARCHAR(255),
agencia VARCHAR(255),
digito_ag VARCHAR(255),
conta VARCHAR(255),
digito_cc VARCHAR(255),
valor_saque INT(10),
valor_taxa_saque INT(5),
status_saque VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id BINARY(20)
);


