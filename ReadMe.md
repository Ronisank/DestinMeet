é uma plataforma que conecta viajantes com guias turísticos locais, oferecendo experiências personalizadas. O objetivo principal é facilitar o encontro entre pessoas que desejam explorar destinos de forma autêntica e guias especializados na região. A aplicação front-end deve permitir que os usuários se cadastrem como guias ou turistas, naveguem por passeios, façam reservas e avaliem as experiências.

Login e Autenticação:
Criar uma página de login, simulando o uso de autenticação. Os dados de login podem ser validados contra uma lista de usuários simulados armazenados no localStorage.

Cadastro de Usuário:
Os novos usuários devem ser capazes de se registrar como guias turísticos ou turistas. O cadastro deve incluir nome, e-mail, senha, tipo de usuário (guia ou turista) e outras informações básicas.

Listagem de Passeios:
Deve ser possível para os turistas navegarem por uma lista de passeios cadastrados por guias. A listagem deve incluir informações como o nome do passeio, descrição, local, preço e data.

Reserva de Passeios:
Usuários com perfil de turista devem ser capazes de reservar passeios disponíveis. As reservas devem ser armazenadas localmente e acessíveis a partir do perfil do turista.

Gerenciamento de Passeios:
Guias devem ser capazes de cadastrar novos passeios, editar ou remover passeios existentes e visualizar as reservas feitas por turistas.

Avaliações de Passeios:
Turistas devem poder avaliar os passeios realizados, atribuindo uma nota e um comentário. Essas avaliações devem ser visíveis para outros turistas e guias.

Páginas da aplicação:
Login (/login):
Atributos:
E-mail: O e-mail do usuário cadastrado.
Senha: A senha utilizada no cadastro.

Regras de Negócio:
O e-mail deve ser único e seguir o formato padrão de e-mails.
A senha deve ser validada com base no cadastro realizado anteriormente.

Cadastro de Usuários (/cadastro):
Atributos:
Nome completo: Nome completo do usuário.
E-mail: E-mail único, utilizado para o login.
Senha: Deve ter no mínimo 8 caracteres, contendo letras e números.
Tipo de Usuário: Indica se o usuário será um guia turístico ou turista.

Regras de Negócio:
O e-mail deve ser único e seguir o formato correto.
A senha deve seguir as regras mínimas de segurança: ao menos 8 caracteres, com letras e números.
Não é possível cadastrar mais de um usuário com o mesmo e-mail.
Dashboard do Guia (/dashboard-guide):
Atributos exibidos:
Quantidade de passeios cadastrados: Número de passeios criados pelo guia.
Atalhos para as páginas de cadastro e listagem de passeios.

Regras de Negócio:
Apenas usuários autenticados com perfil de guia podem acessar essa página.

Cadastro de Novo Passeio (/passeio/novo):
Atributos:
Nome do passeio: Campo obrigatório, não deve ultrapassar 100 caracteres.
Local: Campo obrigatório, descrevendo o local onde o passeio será realizado.
Descrição: Campo opcional, com limite de 500 caracteres.
Preço: Valor cobrado pelo passeio, obrigatório.
Data: Data em que o passeio será realizado, obrigatório.

Regras de Negócio:
Cada passeio deve ter um nome único para o guia que o cadastrou.
O guia deve preencher todos os campos obrigatórios para cadastrar um passeio.
O número de passeios cadastrados pelo guia será controlado localmente, sem limite pré-definido.

Listagem de Passeios (/passeios):
Atributos:
Nome do passeio: Nome do passeio cadastrado pelo guia.
Local: Local onde o passeio será realizado.
Descrição: Breve descrição sobre o passeio.
Preço: Valor cobrado pelo passeio.
Data: Data de realização do passeio.

Regras de Negócio:
Apenas usuários autenticados podem visualizar a lista de passeios.
Os turistas podem realizar a reserva de um passeio diretamente a partir desta página.

Detalhe de Passeio (/passeio/:id):
Atributos:
Nome do passeio: Nome do passeio.
Local: Local do passeio.
Descrição: Descrição detalhada do passeio.
Preço: Valor do passeio.
Data: Data do passeio.

Regras de Negócio:
Apenas o guia que cadastrou o passeio pode editá-lo ou excluí-lo.
Os turistas podem visualizar os detalhes e reservar o passeio.

Reservas (Turista) (/reservas):
Atributos:
Nome do passeio: Nome do passeio reservado.
Local: Local onde o passeio será realizado.
Data: Data do passeio.
Status: Indica se a reserva está ativa ou cancelada.

Regras de Negócio:
Apenas turistas autenticados podem acessar suas reservas.
O turista pode cancelar a reserva diretamente por essa página.

Avaliações de Passeio (/avaliacoes/:id):
Atributos:
Nota: Avaliação numérica do passeio (de 0 a 5).
Comentário: Comentário sobre a experiência no passeio.

Regras de Negócio:
Apenas turistas que participaram do passeio podem avaliá-lo.
A nota e o comentário serão exibidos para outros usuários que visualizaram o passeio.

Regras de Negócio Gerais:

Cadastro de Usuários:
O sistema deve garantir que o e-mail seja único.
O e-mail deve ser validado seguindo as regras padrões de formatação.
A senha deve ser validada para conter, no mínimo, 8 caracteres, incluindo letras e números.
Limitação por Usuário:
Cada guia pode cadastrar quantos passeios desejar, sem limite pré-definido.
Cada turista pode realizar reservas e avaliações para quantos passeios desejar.
Validação de Dados:
Todos os campos obrigatórios em formulários de cadastro e edição devem ser validados, exibindo mensagens de erro apropriadas quando necessário.

