/**
 * Calls the Anthropic API via our own Vercel serverless route (/api/ai).
 * The API key lives only in Vercel environment variables — never in the browser.
 */
export async function callAI(userPrompt, systemPrompt) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userPrompt, systemPrompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.text;
}

export function formatAIText(text) {
  return text
    .replace(/###\s(.+)/g, '<h3>$1</h3>')
    .replace(/##\s(.+)/g,  '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .trim();
}
