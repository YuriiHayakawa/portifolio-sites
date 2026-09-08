# Yuri Hayakawa — Portfólio + 5 sites de exemplo

Este repositório contém 6 projetos independentes, cada um pronto para rodar e publicar:

- `packages/portfolio` — seu portfólio pessoal (vitrine)
- `packages/odontovitta` — Odontologia
- `packages/novalar` — Imobiliária
- `packages/brasa27` — Restaurante
- `packages/maisonbelle` — Estética
- `packages/districtbarber` — Barbearia

Cada pasta é um projeto **Vite + React** independente, com seu próprio `package.json`.

## Rodar localmente

Dentro de qualquer pasta em `packages/`:

```bash
npm install
npm run dev
```

Isso abre o site em `http://localhost:5173`.

## Publicar de graça (recomendado: Vercel)

A forma mais rápida de colocar tudo no ar, com uma URL própria para cada site:

1. Crie uma conta gratuita em https://vercel.com (dá pra entrar com GitHub).
2. Suba esta pasta inteira para um repositório no GitHub (veja "Subir pro GitHub" abaixo).
3. No Vercel, clique em **Add New → Project** e importe o repositório.
4. Repita a importação **uma vez para cada site** (6 vezes no total). Em cada importação:
   - Em **Root Directory**, aponte para a pasta do projeto (ex: `packages/odontovitta`).
   - O Vercel detecta automaticamente que é um projeto Vite — não precisa mudar mais nada.
   - Clique em **Deploy**.
5. Em poucos segundos cada site ganha uma URL própria, tipo `odontovitta.vercel.app`. Você pode renomear o
   domínio de cada projeto nas configurações (ex: `novalar-yuri.vercel.app`) ou conectar um domínio próprio depois.

Alternativas igualmente boas e gratuitas: **Netlify** (mesmo fluxo, "Base directory" no lugar de "Root Directory")
ou **GitHub Pages** (exige mais configuração manual, recomendo só se já tiver familiaridade).

## Subir pro GitHub

Se ainda não tem o repositório:

```bash
cd yuri-sites
git init
git add .
git commit -m "portfolio e 5 sites de exemplo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git push -u origin main
```

Crie o repositório vazio no GitHub antes (botão "New repository"), copie a URL dele e cole no lugar de
`SEU-USUARIO/NOME-DO-REPO`.

## Antes de publicar de verdade

- No `packages/portfolio/src/App.jsx`, troque o e-mail, WhatsApp, GitHub e LinkedIn de placeholder pelos seus reais.
- Depois de publicar os 5 sites, volte no portfólio e troque os `href="#"` dos cards de projeto pelas URLs reais
  de cada site publicado.
- Cada site de nicho (OdontoVitta, NovaLar etc.) também tem números de telefone e endereços fictícios — troque
  pelos dados reais quando for usar com um cliente de verdade.

## node_modules

Este zip não inclui `node_modules` (economiza espaço). Rode `npm install` em cada pasta antes de usar
`npm run dev`, ou simplesmente publique direto no Vercel/Netlify — eles instalam tudo sozinhos durante o deploy.
