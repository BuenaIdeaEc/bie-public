# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Funciones serverless (Netlify)

| Ruta | Archivo | Qué hace |
| :--- | :------ | :------- |
| `POST /api/track` | `netlify/functions/track.mjs` | Recibe eventos de `public/track.js` y los guarda en BIE OS (`page_events`, y `leads` en `form_submit`). Responde 200 solo si quedó guardado; 503 sin configuración, 502 si Supabase rechaza, 413/415/400/422 ante cuerpos inválidos. |
| `GET/POST /api/whatsapp` | `netlify/functions/wa-bot.mjs` | Webhook de WhatsApp Cloud API. Verifica la firma `X-Hub-Signature-256` y deduplica en `webhook_events` antes de responder. |

Variables de entorno (Netlify → Site settings → Environment variables; nunca en el repo):

| Variable | Usada por | Notas |
| :------- | :-------- | :---- |
| `SUPABASE_URL` | ambas | Proyecto BIE OS (`husiywjndpravokplvqm`). |
| `SUPABASE_SERVICE_ROLE_KEY` | ambas | Obligatoria: sin ella `/api/track` responde 503 y el bot no contesta. |
| `WA_APP_SECRET` | wa-bot | App Secret de la app de Meta. Obligatoria: sin ella todo POST a `/api/whatsapp` recibe 503. |
| `WA_VERIFY_TOKEN` | wa-bot | Token para la verificación GET del webhook. |
| `WA_ACCESS_TOKEN` | wa-bot | Token permanente (System User) para enviar mensajes. |
| `WA_PHONE_NUMBER_ID` | wa-bot | Id del número en WhatsApp Manager. |
| `WA_NOTIFY_NUMBER` | wa-bot | Opcional: número que recibe aviso cuando el bot responde. |

Dependencia de base de datos: migración 0046 de BIE OS (default `LEAD-NNNN` en `leads.id` y `'meta_whatsapp'` en el CHECK de `webhook_events.gateway`).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
