import { useState } from 'react';
import Icon from '@/components/ui/icon';

const TEE = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/da82247b-2f4a-4157-bd4f-9665af90c7b9.jpeg';
const LONG = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/files/8872e42b-cf45-4aaa-9013-a2554545e4d5.jpg';
const CAP = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/files/d18b7b3c-f983-4dd0-bfb2-c9fe09b76c6d.jpg';

type Club = { id: string; name: string; color: string; tagline: string; emblem: string };

const CLUBS: Club[] = [
  { id: 'blackcroc', name: 'Black x Croc', color: '#FF2D93', tagline: 'Дерзкий стрит для тех, кто живёт в зале', emblem: '♛' },
  { id: '50gym', name: '50GYM', color: '#39FF14', tagline: 'Кислотная энергия и максимальный объём', emblem: '☠' },
  { id: 'repit', name: 'REPiT', color: '#FF6A00', tagline: 'Повторяй до победы. Снова и снова', emblem: '⚡' },
];

type Product = {
  id: number; name: string; club: string; price: number; cat: string; img: string;
  badge?: 'New' | 'Drop' | 'Limited'; color: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Crown Oversize Tee', club: 'Black x Croc', cat: 'Футболки', price: 2490, img: TEE, badge: 'Drop', color: '#FF2D93' },
  { id: 2, name: 'Skull Longsleeve', club: '50GYM', cat: 'Лонгсливы', price: 3290, img: LONG, badge: 'New', color: '#39FF14' },
  { id: 3, name: 'Crown Snapback', club: 'Black x Croc', cat: 'Кепки', price: 1990, img: CAP, badge: 'Limited', color: '#FF2D93' },
  { id: 4, name: 'Acid Logo Tee', club: '50GYM', cat: 'Футболки', price: 2490, img: TEE, badge: 'New', color: '#39FF14' },
  { id: 5, name: 'REPiT Longsleeve', club: 'REPiT', cat: 'Лонгсливы', price: 3290, img: LONG, badge: 'Drop', color: '#FF6A00' },
  { id: 6, name: 'Street Cap', club: 'REPiT', cat: 'Кепки', price: 1990, img: CAP, color: '#FF6A00' },
];

const CATS = ['Все', 'Футболки', 'Лонгсливы', 'Носки', 'Кепки'];

const badgeStyle: Record<string, string> = {
  New: 'bg-neon-green text-ink',
  Drop: 'bg-neon-pink text-white',
  Limited: 'bg-neon-orange text-ink',
};

const Index = () => {
  const [club, setClub] = useState<Club>(CLUBS[0]);
  const [cat, setCat] = useState('Все');
  const [cart, setCart] = useState(0);

  const filtered = PRODUCTS.filter((p) => cat === 'Все' || p.cat === cat);

  return (
    <div className="min-h-screen bg-white text-ink" style={{ ['--club' as string]: club.color }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <a href="#top" className="font-display text-2xl font-bold uppercase tracking-tighter">
            MERCH<span className="text-club">.</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium uppercase tracking-wide md:flex">
            <a href="#catalog" className="transition hover:text-club">Каталог</a>
            <a href="#drops" className="transition hover:text-club">Дропы</a>
            <a href="#clubs" className="transition hover:text-club">Клубы</a>
            <a href="#about" className="transition hover:text-club">О нас</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="transition hover:text-club" aria-label="Поиск"><Icon name="Search" size={20} /></button>
            <button className="transition hover:text-club" aria-label="Избранное"><Icon name="Heart" size={20} /></button>
            <button onClick={() => setCart((c) => c + 1)} className="relative transition hover:text-club" aria-label="Корзина">
              <Icon name="ShoppingBag" size={20} />
              {cart > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-club text-[10px] font-bold text-white">{cart}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden border-b border-black/10 bg-ink text-white">
        <div className="grid-noise absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[180px] leading-none text-club opacity-20 md:text-[280px]">{club.emblem}</div>
        <div className="container relative grid gap-8 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-in flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-club px-3 py-1 text-xs font-bold uppercase tracking-widest text-club">
              <span>{club.emblem}</span> сезон 2026 · новые дропы
            </span>
            <h1 className="font-display text-5xl font-bold leading-[0.9] sm:text-6xl md:text-7xl">
              МЕРЧ,<br /><span className="text-club">КОТОРЫЙ ПОТЕЕТ</span><br />С ТОБОЙ
            </h1>
            <p className="mt-6 max-w-md text-white/60">{club.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="bg-club px-7 py-3 font-display text-lg font-bold uppercase tracking-wide text-white transition hover:scale-105">
                Купить мерч
              </a>
              <a href="#clubs" className="border border-white/30 px-7 py-3 font-display text-lg font-bold uppercase tracking-wide transition hover:border-club hover:text-club">
                Смотреть клубы
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-8 rotate-3 bg-club/20 blur-2xl" />
            <img src={TEE} alt="Хиро мерч" loading="eager" className="relative w-full max-w-sm rounded-2xl object-cover shadow-2xl" />
            <span className="absolute -left-2 top-6 rotate-[-8deg] animate-spray-wipe bg-neon-green px-3 py-1 font-display text-sm font-bold uppercase text-ink">drop 01</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-black/10 bg-club py-2 text-white">
        <div className="flex w-max animate-marquee gap-8 font-display text-sm font-bold uppercase tracking-widest">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              {['Новый дроп каждую неделю', '♛ Limited edition', 'Бесплатная доставка от 5000₽', '☠ Только для своих', '⚡ Самовывоз из клубов'].map((t) => (
                <span key={t}>{t} ·</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CLUBS */}
      <section id="clubs" className="container py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Три клуба.<br />Один вайб.</h2>
          <span className="hidden text-sm uppercase tracking-widest text-black/40 md:block">выбери свой</span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {CLUBS.map((c) => (
            <button
              key={c.id}
              onClick={() => setClub(c)}
              style={{ ['--club' as string]: c.color }}
              className={`group glow-club relative overflow-hidden rounded-2xl border border-black/10 bg-ink p-7 text-left text-white transition ${club.id === c.id ? 'ring-club' : ''}`}
            >
              <span className="absolute -right-3 top-2 select-none font-display text-8xl text-club opacity-20 transition group-hover:opacity-40">{c.emblem}</span>
              <h3 className="relative font-display text-2xl font-bold text-club">{c.name}</h3>
              <p className="relative mt-3 min-h-12 text-sm text-white/60">{c.tagline}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                Смотреть коллекцию <Icon name="ArrowRight" size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CATALOG / DROPS */}
      <section id="catalog" className="border-y border-black/10 bg-[#f7f7f7]">
        <div className="container py-20">
          <div id="drops" className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Новые дропы<span className="text-club"> & бестселлеры</span></h2>
          </div>
          {/* filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATS.map((cName) => (
              <button
                key={cName}
                onClick={() => setCat(cName)}
                className={`rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-wide transition ${
                  cat === cName ? 'bg-club border-club text-white' : 'border-black/15 bg-white hover:border-club hover:text-club'
                }`}
              >
                {cName}
              </button>
            ))}
          </div>
          {/* grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <article
                key={p.id}
                style={{ ['--club' as string]: p.color }}
                className="glow-club group relative overflow-hidden rounded-2xl border border-black/10 bg-white transition"
              >
                <div className="relative aspect-square overflow-hidden bg-[#eee]">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  {p.badge && (
                    <span className={`absolute left-3 top-3 rotate-[-6deg] px-2.5 py-1 font-display text-xs font-bold uppercase ${badgeStyle[p.badge]}`}>{p.badge}</span>
                  )}
                  <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur transition hover:text-club group-hover:opacity-100" aria-label="В избранное">
                    <Icon name="Heart" size={16} />
                  </button>
                  <button className="absolute inset-x-3 bottom-3 translate-y-3 rounded-lg bg-ink py-2.5 font-display text-sm font-bold uppercase tracking-wide text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    Быстрая покупка
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-[11px] uppercase tracking-widest text-club">{p.club}</span>
                  <h3 className="mt-1 font-display text-lg font-bold leading-tight">{p.name}</h3>
                  <p className="mt-2 font-display text-lg">{p.price.toLocaleString('ru-RU')} ₽</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEASON BANNER */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-white md:py-24">
          <div className="grid-noise absolute inset-0 opacity-20" />
          <span className="relative inline-block rotate-[-6deg] bg-neon-green px-3 py-1 font-display text-sm font-bold uppercase text-ink">Sale</span>
          <h2 className="relative mt-5 font-display text-4xl font-bold md:text-6xl">−30% на летний дроп</h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/60">Только до конца сезона. Промокод <span className="font-bold text-club">SUMMER30</span> на чек-ауте.</p>
          <a href="#catalog" className="relative mt-8 inline-block bg-club px-8 py-3 font-display text-lg font-bold uppercase tracking-wide transition hover:scale-105">
            Забрать со скидкой
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="border-t border-black/10 bg-ink text-white">
        <div className="container grid gap-10 py-16 md:grid-cols-4">
          <div>
            <a href="#top" className="font-display text-2xl font-bold uppercase">MERCH<span className="text-club">.</span></a>
            <p className="mt-4 max-w-xs text-sm text-white/50">Дерзкий мерч для сетей фитнес-клубов Black x Croc, 50GYM и REPiT.</p>
          </div>
          {[
            { t: 'Магазин', l: ['Каталог', 'Дропы', 'Бестселлеры', 'Распродажа'] },
            { t: 'Помощь', l: ['Доставка', 'Возврат', 'Размеры', 'FAQ'] },
            { t: 'Компания', l: ['О нас', 'Контакты', 'Политика', 'Самовывоз'] },
          ].map((col) => (
            <div key={col.t}>
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-club">{col.t}</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {col.l.map((i) => <li key={i}><a href="#" className="transition hover:text-white">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
          © 2026 MERCH. Сделано дерзко. ♛ ☠ ⚡
        </div>
      </footer>
    </div>
  );
};

export default Index;