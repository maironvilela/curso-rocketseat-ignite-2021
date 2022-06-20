# [x] Header (src/__tests__/components/Header.spec.tsx)

## [x]should be able to render logo
  Para que esse teste passe você deve renderizar a logo do site com o valor do `alt` sendo `logo`

## [x] should be able to navigate to home page after a click
  Para que esse teste passe você deve navegar para a página principal após o click na logo


# [x] Home (src/__tests__/pages/Home.spec.tsx)
  ## [x] should be able to return prismic posts documents using getStaticProps
  Para que esse teste passe você deve retornar do getStaticProps os dados do Prismic de acordo com as interfaces já disponibilizada no template. Obrigatório utilizar o método query do Prismic

  ## [x] should be able to render posts documents info
    Para que esse teste passe você deve renderizar em tela a listagem de posts com as informações de título, subtítulo, data de criação (já formatada) e autor do post

  ## [x] should be able to navigate to post page after a click
    Para que esse teste passe você deve navegar para a página do post clicado seguindo o padrão /post/slugDoPost onde slugDoPost é o valor slug de cada post retornado pelo Prismic

  ## [x] should be able to load more posts if available
    Carregar mais posts caso o next_page indique que existam mais posts a serem exibidos (link). Ao clicar no botão, você carregar os posts da nova paginação e concatenar com os existentes em tela. Obrigatório utilizar o fetch

  ## [x] should not be able to load more posts if not available
    Para que esse teste passe você não deve renderizar em tela o botão Carregar mais posts caso o next_page indique que não há mais posts a serem carregados (null)


# [] pages/post/[slug].tsx (src/__tests__/pages/Post.spec.tsx)

 ## [] should be able to return prismic posts documents paths using getStaticPaths
  Para que esse teste passe você deve retornar do getStaticPaths os dados do Prismic de acordo com as interfaces já disponibilizada no template. Obrigatório utilizar o método query do Prismic


 ## [] should be able to return prismic post document using getStaticProps
  Para que esse teste passe você deve retornar do getStaticProps os dados do Prismic de acordo com as interfaces já disponibilizada no template. Obrigatório utilizar o método getByUID do Prismic
 ## [] should be able to render post document info
  Para que esse teste passe você deve renderizar em tela o título, data de criação (já formatada), autor, tempo estimado de leitura (calculado por você) e conteúdo (heading e body) do post
 ## [] should be able to render loading message if fallback
  Para que esse teste passe você deve renderizar em tela uma mensagem com o texto Carregando... caso o post não tenha sido gerado estaticamente e caia no fallback
