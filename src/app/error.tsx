'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main className="state-card" style={{ minHeight: '100vh' }}><strong>Terjadi kesalahan</strong><span>Halaman ini mengalami kendala sementara.</span><div style={{ display: 'flex', gap: '8px' }}><button className="btn btn-primary" onClick={reset}>Coba lagi</button><Link className="btn btn-outline" href="/">Beranda</Link></div></main>; }
