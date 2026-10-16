// Ejemplo mínimo con el SDK oficial de Higgsfield (solo servidor, nunca en el navegador).
// Uso: node --env-file=.env.local scripts/higgsfield/index.ts
import { config, higgsfield } from '@higgsfield/client/v2';

const credentials = process.env.HF_CREDENTIALS;
if (!credentials || !credentials.includes(':')) {
  console.error('Falta HF_CREDENTIALS en .env.local (formato key-id:key-secret).');
  process.exit(1);
}

config({ credentials });

try {
  const result = await higgsfield.subscribe('bytedance/seedance-2.5/text-to-video', {
    input: {
      prompt: 'A cinematic scene at sunset',
      duration: 5,
      resolution: '720p',
      aspect_ratio: '16:9',
    },
    withPolling: true,
  });

  console.log('request_id:', result.request_id, '| status:', result.status);

  if (result.status === 'completed') {
    const url = result.video?.url;
    if (!url) {
      console.error('Terminó, pero no vino URL de video en la respuesta.');
      process.exit(2);
    }
    console.log('Video generado:', url);
  } else if (result.status === 'nsfw') {
    console.error('Rechazado por moderación; créditos reembolsados. No se generó video.');
    process.exit(3);
  } else if (result.status === 'failed') {
    console.error('La generación falló; créditos reembolsados. No se generó video.');
    process.exit(4);
  } else {
    console.error(`Estado no final (${result.status}); no hay video todavía.`);
    process.exit(5);
  }
} catch (err) {
  const e = err as { name?: string; message?: string; statusCode?: number };
  console.error(`Error del SDK (${e.name ?? 'desconocido'}${e.statusCode ? ' ' + e.statusCode : ''}): ${e.message ?? ''}`);
  process.exit(6);
}
