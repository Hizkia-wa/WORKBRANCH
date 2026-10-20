import Link from 'next/link';
export default function NotFound() { return <main className="state-card" style={{ minHeight: '100vh' }}><strong>Halaman tidak ditemukan</strong><span>Alamat yang Anda buka belum tersedia.</span><Link className="btn btn-primary" href="/">Kembali ke WorkBranch</Link></main>; }
