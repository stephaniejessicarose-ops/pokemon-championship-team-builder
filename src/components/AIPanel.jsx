import React from 'react';
import { formatAIText } from '../utils/ai';

export function AILoading({ message = 'Generating analysis...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 12, minHeight: 200, color: 'var(--muted)' }}>
      <div style={{
        width: 28, height: 28, border: '2px solid var(--border)',
        borderTopColor: 'var(--gold)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ fontSize: 13 }}>{message}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function AIOutput({ html, placeholder }) {
  if (!html) {
    return (
      <div style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '40px 20px' }}>
        {placeholder}
      </div>
    );
  }
  return (
    <div
      style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap' }}
      className="ai-text"
      dangerouslySetInnerHTML={{ __html: formatAIText(html) }}
    />
  );
}

export function AIPanel({ loading, text, placeholder, loadingMessage }) {
  return (
    <div style={{
      background: 'var(--navy2)', border: '1px solid rgba(77,217,232,0.2)',
      borderRadius: 10, padding: 18, minHeight: 200,
    }}>
      {loading
        ? <AILoading message={loadingMessage} />
        : <AIOutput html={text} placeholder={placeholder} />
      }
    </div>
  );
}
