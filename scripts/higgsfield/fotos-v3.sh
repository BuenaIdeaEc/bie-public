#!/usr/bin/env bash
# Genera las fotos v3 (Soul v2) y las anima (Kling 3.0 Standard). Requiere créditos en Higgsfield.
# Uso: bash scripts/higgsfield/fotos-v3.sh [slug ...]   (sin argumentos: las 7)
set -e
cd "$(dirname "$0")/../.."
slugs=("$@"); [ ${#slugs[@]} -eq 0 ] && slugs=(asistente-inteligente-whatsapp identidad-de-marca crm-ia automatizaciones whatsapp-business-commerce data-analytics link-hub)
for s in "${slugs[@]}"; do
  foto=$(node -e "console.log(require('./scripts/higgsfield/fotos-v3.json')['$s'].foto)")
  video=$(node -e "console.log(require('./scripts/higgsfield/fotos-v3.json')['$s'].video)")
  node --env-file=.env.local scripts/higgsfield/image.ts "$s" "$foto" 1:1
  url=$(grep "\"slug\":\"$s\"" scripts/higgsfield/out/log.jsonl | grep '"kind":"image"' | tail -1 | node -e "process.stdin.on('data',d=>console.log(JSON.parse(d).url))")
  node -e "const f='scripts/higgsfield/out/fotos-v2.json';const j=require('./'+f);j['$s']='$url';require('fs').writeFileSync(f,JSON.stringify(j,null,1))"
  node --env-file=.env.local scripts/higgsfield/animate.ts "$s" "$video Keep the scene, person and screens exactly as in the image; realistic subtle motion only, slow cinematic push-in, no new objects, no added text."
done
