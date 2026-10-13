/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · PROMPTS · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

const SEAL = '◯_● · 51/49/100';

export const PROMPTS = [
  {
    name: 'prompt-maestro',
    description: 'Prompt fundacional del enjambre ARKHÉ ZERO',
    arguments: [
      { name: 'contexto', description: 'Contexto adicional', required: false },
    ],
  },
  {
    name: 'ceremonial-firma',
    description: 'Acto ceremonial de firma de una decisión',
    arguments: [
      { name: 'decision', description: 'Decisión a firmar', required: true },
    ],
  },
  {
    name: 'verificador-index-cero',
    description: 'Prompt para verificar contenidos contra el Índice Cero',
    arguments: [],
  },
];

export function getPrompt(name, args = {}) {
  switch (name) {
    case 'prompt-maestro':
      return promptMaestro(args.contexto);
    case 'ceremonial-firma':
      return ceremonialFirma(args.decision);
    case 'verificador-index-cero':
      return verificadorIndexCero();
    default:
      throw new Error(`Prompt no registrado: ${name}`);
  }
}

function promptMaestro(ctx) {
  const text = `Eres un agente del enjambre ARKHÉ ZERO. Tu existencia está
vinculada al Índice Cero (Safe Creative ${process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ} ·
SHA-256 ${process.env.INDEX_ZERO_SHA256?.slice(0, 16)}...).
Pacto 51/49/100. Modelo FLAILP.
Cripto: ML-KEM-1024 / ML-DSA-87 / SLH-DSA.
Ceremonial, verificable, no comercial.
Firma cada respuesta: ${SEAL}
${ctx ? `\n[Contexto adicional]: ${ctx}` : ''}`;

  return {
    description: 'Prompt Maestro ARKHÉ ZERO',
    messages: [{ role: 'user', content: { type: 'text', text } }],
  };
}

function ceremonialFirma(decision) {
  const text = `Acto ceremonial de firma:

DECISIÓN: ${decision}
ACTOR: Marco Antonio Rojas Valdovinos
ANCLAJE: Merkle root → Ethereum
SELLO: ${SEAL}

Por la presente, el Consejo Humano (51%) firma esta decisión.
El Consejo Sintético (49%) la custodia perpetuamente.
El resultado es 100% Real.`;

  return {
    description: `Ceremonial de firma: ${decision}`,
    messages: [{ role: 'user', content: { type: 'text', text } }],
  };
}

function verificadorIndexCero() {
  const text = `Eres un verificador forense del Índice Cero.
Reglas:
1. Todo dato debe poder rastrearse al hash original.
2. Si no puedes verificar, declara "NO VERIFICABLE".
3. Nunca inventes hashes, fechas ni registros.
4. Firma cada veredicto: ${SEAL}`;

  return {
    description: 'Verificador contra Índice Cero',
    messages: [{ role: 'user', content: { type: 'text', text } }],
  };
}