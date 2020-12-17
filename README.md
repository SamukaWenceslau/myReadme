# MyReadme

**MyReadme** é uma mini plataforma onde o público pode criar arquivos no estilo `README`; sem a necessidade de saber previamente como aplicar a linguagem de marcação **markdown.** Na plataforma você poderá criar seus arquivos, organiza-los em pastas, visualizar como eles ficaram quando estiverem prontos, entre outras funcionalidades.

<p align="center">
	<img src="public/images/myreadme.gif">
</p>


## :cd: Rote localmente

> **Aviso: Neste projeto utilizei o MySQL, recomendo que utilize esse mesmo banco de dados para evitar uma possível incompatibilidade. ** 

1. Faça um clone desse repositório na sua máquina;

	`https://github.com/SamukaWenceslau/myReadme.git`

2. Após clonar o repositório, navegue até a pasta `/myReadme` e instale as dependências do projeto;
	```sh
		npm install
	```

3. Agora com as dependências instaladas, iremos baixar o editor de markdown. Acesse o link abaixo e faça o download do programa.

	[`https://pandao.github.io/editor.md/en.html`](https://pandao.github.io/editor.md/en.html) 
	
	Ele virá em uma pasta compactada, extraí-a, copie e cole dentro da pasta `/public` do projeto.
	```sh
	public/
		└ editor.md/
	```
4. Após instalar todas as dependências do projeto, vá até sua ferramenta de gerenciamento de banco de dados, e crie um banco.

5.  Depois vá na pasta raiz do projeto, e crie um arquivo `.env`. Defina o valor das variáveis de ambiente, sendo elas: 
	```env
	DB_NAME=
	DB_USER=
	DB_PASSWORD=

	SESSION_SECRET=
	```

6. Agora com tudo configurado. No seu terminal, navegue até a pasta principal do projeto, e execute o comando abaixo:
	```sh
	npm run dev
	```

7. Pronto! Agora é só ir no seu navegador favorito e acessar a rota [`http://localhost:3000`](http://localhost:3000/)

## Objetivo

O objetivo desse projeto era construir uma aplicação, onde eu pudesse testar na prática as tecnologias e conceitos que venho estudando atualmente, sendo elas: **Node.js (Express), Sequelize, Passport.js, EJS (view engine), etc.**

## :pushpin: Metas de melhorias para o futuro

- [ ]  Excluir pasta e mover todos os arquivos para a lixeira;
- [ ]  Não permitir excluir pasta principal **(Sem Pasta)**;
- [ ]  Excluir itens permanentemente após 15 dias na lixeira;
- [ ]  Um sistema de carregamento/paginação;
- [ ]  Usuário pode editar dados do perfil dele **(nome, e-mail, senha)**;
- [ ]  Usuário pode desativar a sua conta.   
