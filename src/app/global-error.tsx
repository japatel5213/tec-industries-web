'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#F5F5F0', color: '#2B3E50', fontFamily: 'Arial, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
          <section style={{ width: 'min(100%, 560px)', padding: '48px', background: '#fff', borderRadius: '20px', boxShadow: '0 12px 36px rgba(20,28,40,.12)', textAlign: 'center' }}>
            <p style={{ margin: '0 0 12px', color: '#2D8B6E', fontSize: '12px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>TEC INDUSTRIES</p>
            <h1 style={{ margin: '0 0 16px', fontSize: '32px', lineHeight: 1.1 }}>Something needs another try.</h1>
            <p style={{ margin: '0 0 28px', color: '#6B7B8D', lineHeight: 1.6 }}>Please refresh this page or return to the TEC INDUSTRIES homepage.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" onClick={reset} style={{ border: 0, borderRadius: '8px', padding: '12px 18px', color: '#fff', background: '#2D8B6E', cursor: 'pointer', fontWeight: 700 }}>Try Again</button>
              <button type="button" onClick={() => { window.location.href = '/'; }} style={{ border: '1px solid #dfe5e8', borderRadius: '8px', padding: '12px 18px', color: '#2B3E50', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>Homepage</button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
