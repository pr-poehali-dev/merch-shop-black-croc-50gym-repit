import { useState } from 'react';
import Icon from '@/components/ui/icon';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const REVIEWS = [
  { name: 'Артём К.', text: 'Качество огонь, оверсайз сидит идеально. Брал L — отлично.', stars: 5 },
  { name: 'Маша Д.', text: 'Крылья на спине — просто мечта. Все в зале спрашивают где взял.', stars: 5 },
  { name: 'Игорь С.', text: 'Хороший плотный хлопок, после стирки не садится.', stars: 4 },
];

const CARE_ICONS: { icon: string; label: string }[] = [
  { icon: '30°', label: 'Стирка 30°' },
  { icon: '✕', label: 'Не отбеливать' },
  { icon: '♨', label: 'Утюжить слабо' },
  { icon: '⊗', label: 'Не сушить' },
];

type PdpProps = {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
  related: Product[];
  onOpenProduct: (p: Product) => void;
};

const ProductPage = ({ product: p, onClose, onAddToCart, related, onOpenProduct }: PdpProps) => {
  const images = [p.img, ...(p.img2 ? [p.img2] : [])];
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) return;
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white" style={{ ['--club' as string]: p.color }}>
      {/* top bar */}
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-black/10 bg-white/90 px-4 backdrop-blur-md md:px-8">
        <button onClick={onClose} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition hover:text-club">
          <Icon name="ArrowLeft" size={18} /> Назад
        </button>
        <nav className="hidden text-xs text-black/40 md:block">
          Каталог → {p.club} → {p.name}
        </nav>
        <span className="font-display text-lg font-bold">{p.price.toLocaleString('ru-RU')} ₽</span>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* GALLERY */}
          <div className="flex gap-3">
            {images.length > 1 && (
              <div className="flex flex-col gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition ${activeImg === i ? 'border-club' : 'border-transparent opacity-50'}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#f0f0f0]">
              <img
                src={images[activeImg]}
                alt={p.name}
                className="w-full object-cover transition duration-500"
              />
              {p.badge && (
                <span className={`absolute left-4 top-4 rotate-[-6deg] px-3 py-1 font-display text-sm font-bold uppercase ${badgeStyle[p.badge]}`}>
                  {p.badge}
                </span>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex gap-1">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`h-2 w-2 rounded-full transition ${activeImg === i ? 'bg-club' : 'bg-black/20'}`} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-club">{p.club}</span>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">{p.name}</h1>
            <p className="mt-1 font-display text-2xl font-bold">{p.price.toLocaleString('ru-RU')} ₽</p>

            {/* SIZES */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wide">Размер</span>
                <button className="text-xs text-club underline">Таблица размеров</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 w-12 rounded-lg border-2 font-display text-sm font-bold transition ${
                      size === s
                        ? 'border-club bg-club text-white'
                        : 'border-black/15 hover:border-club hover:text-club'
                    }`}
                  >{s}</button>
                ))}
              </div>
              {!size && <p className="mt-2 text-xs text-black/40">Выберите размер</p>}
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAdd}
              disabled={!size}
              className={`mt-6 flex w-full items-center justify-center gap-2 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition ${
                size ? 'bg-ink hover:bg-club' : 'cursor-not-allowed bg-black/20'
              }`}
            >
              {added ? <><Icon name="Check" size={20} /> Добавлено!</> : <><Icon name="ShoppingBag" size={20} /> В корзину</>}
            </button>
            <button className="mt-3 flex w-full items-center justify-center gap-2 border border-black/15 py-4 font-display text-sm font-bold uppercase tracking-wide transition hover:border-club hover:text-club">
              <Icon name="Heart" size={18} /> В избранное
            </button>

            {/* COMPOSITION */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest">Состав и уход</h3>
              <p className="mt-2 text-sm text-black/60">100% хлопок, плотность 280 г/м². Оверсайз крой. Принт нанесён методом DTF — не трескается при стирке.</p>
              <div className="mt-3 flex gap-4">
                {CARE_ICONS.map((c) => (
                  <div key={c.label} className="flex flex-col items-center gap-1">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-xs font-bold">{c.icon}</span>
                    <span className="text-[10px] text-black/40">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERY */}
            <div className="mt-6 space-y-2 border-t border-black/10 pt-6 text-sm">
              {[
                { icon: 'Truck', text: 'Доставка 2–5 дней · от 350 ₽, бесплатно от 5000 ₽' },
                { icon: 'MapPin', text: 'Самовывоз из клубов Black x Croc, 50GYM, REPiT' },
                { icon: 'RotateCcw', text: 'Обмен и возврат в течение 14 дней' },
              ].map((r) => (
                <div key={r.text} className="flex items-start gap-3 text-black/60">
                  <Icon name={r.icon} size={16} className="mt-0.5 shrink-0 text-club" />
                  {r.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-16 border-t border-black/10 pt-12">
          <h2 className="font-display text-2xl font-bold">Отзывы <span className="text-club">({REVIEWS.length})</span></h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-black/10 bg-[#f7f7f7] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{r.name}</span>
                  <span className="text-club">{'★'.repeat(r.stars)}</span>
                </div>
                <p className="mt-2 text-sm text-black/60">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-black/10 pt-12">
            <h2 className="font-display text-2xl font-bold">С этим покупают</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => onOpenProduct(rp)}
                  style={{ ['--club' as string]: rp.color }}
                  className="glow-club group overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#eee]">
                    <img src={rp.img} alt={rp.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    {rp.badge && (
                      <span className={`absolute left-2 top-2 rotate-[-6deg] px-2 py-0.5 font-display text-[10px] font-bold uppercase ${badgeStyle[rp.badge]}`}>{rp.badge}</span>
                    )}
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] uppercase tracking-widest text-club">{rp.club}</span>
                    <p className="font-display text-sm font-bold leading-tight">{rp.name}</p>
                    <p className="mt-1 font-display text-sm">{rp.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Black x Croc — Wings Tee (розовые крылья, спина)
const BXC_WINGS_PINK_BACK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/da82247b-2f4a-4157-bd4f-9665af90c7b9.jpeg';
// Black x Croc — Wings Tee дубль (тот же принт, второй вариант загрузки)
const BXC_WINGS_PINK_BACK2 = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/4338192c-7845-4c62-9660-316956e17701.jpeg';
// Black x Croc — Wings Tee (зелёные крылья, спина)
const BXC_WINGS_GREEN_BACK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/51312d84-dfe2-4114-a84b-84d11cca85cc.jpeg';
// Black x Croc — Thunder Croc Tee (синий крокодил молния, спина + грудь)
const BXC_THUNDER_BACK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/55ae7217-fdd6-435e-8603-05ff6fbb7561.png';
// Black x Croc — Graffiti Bus Tee (граффити-автобус, грудь / зелёный крок, спина)
const BXC_GRAFFITI_FRONT = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/703df703-2f59-4edc-bf40-569f2034f8bc.png';
// Black x Croc — Fitness Club Tee (ретро лого, грудь)
const BXC_FITNESS_FRONT = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/0a7afe3a-5bf8-44f5-981c-4aad8f72c0cb.png';
// Black x Croc — Drip Tee (жёлтый 3D лого, спина + грудь)
const BXC_DRIP_BACK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/2fe67a25-3cc8-4421-8630-6f634e160064.png';
// Black x Croc — Gothic Tee (готический лого, грудь + логотип спина)
const BXC_GOTHIC_FRONT = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/7c2f3795-458d-4190-ad96-e52a191198b7.png';
// 50GYM — Logo Tee (кислотно-зелёный лого, перед)
const GYM_TEE_GREEN = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/2be96aaa-dff4-487b-aa2c-9eba64acf182.jpeg';
// 50GYM — Logo Tee (розовый лого, перед)
const GYM_TEE_PINK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/c23241c0-ba8c-4b72-9a32-ca409bc2ea6b.jpeg';
// 50GYM — Longsleeve (розовый лого)
const GYM_LONG_PINK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/611ee8ea-ce25-4830-a19b-3d42265d9330.jpeg';
// 50GYM — Logo Tee второй ракурс
const GYM_TEE_BACK = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/bucket/962fc7b8-f697-42bb-a204-1e7620395366.jpeg';
const CAP = 'https://cdn.poehali.dev/projects/19f10c4d-b84f-455e-ac3d-51ec39193f42/files/d18b7b3c-f983-4dd0-bfb2-c9fe09b76c6d.jpg';

type Club = { id: string; name: string; color: string; tagline: string; emblem: string };

const CLUBS: Club[] = [
  { id: 'blackcroc', name: 'Black x Croc', color: '#FF2D93', tagline: 'Дерзкий стрит для тех, кто живёт в зале', emblem: '♛' },
  { id: '50gym', name: '50GYM', color: '#39FF14', tagline: 'Кислотная энергия и максимальный объём', emblem: '☠' },
  { id: 'repit', name: 'REPiT', color: '#FF6A00', tagline: 'Повторяй до победы. Снова и снова', emblem: '⚡' },
];

type Product = {
  id: number; name: string; club: string; price: number; cat: string; img: string; img2?: string;
  badge?: 'New' | 'Drop' | 'Limited'; color: string;
};

const PRODUCTS: Product[] = [
  // Black x Croc — Wings
  { id: 1, name: 'Wings Tee Pink', club: 'Black x Croc', cat: 'Футболки', price: 2490, img: BXC_WINGS_PINK_BACK, img2: BXC_WINGS_PINK_BACK2, badge: 'Drop', color: '#FF2D93' },
  { id: 2, name: 'Wings Tee Pink II', club: 'Black x Croc', cat: 'Футболки', price: 2490, img: BXC_WINGS_PINK_BACK2, img2: BXC_WINGS_PINK_BACK, badge: 'Limited', color: '#FF2D93' },
  { id: 3, name: 'Wings Tee Green', club: 'Black x Croc', cat: 'Футболки', price: 2490, img: BXC_WINGS_GREEN_BACK, badge: 'New', color: '#FF2D93' },
  // Black x Croc — новые
  { id: 9, name: 'Thunder Croc Tee', club: 'Black x Croc', cat: 'Футболки', price: 2790, img: BXC_THUNDER_BACK, badge: 'Drop', color: '#FF2D93' },
  { id: 10, name: 'Graffiti Bus Tee', club: 'Black x Croc', cat: 'Футболки', price: 2790, img: BXC_GRAFFITI_FRONT, badge: 'New', color: '#FF2D93' },
  { id: 11, name: 'Fitness Club Tee', club: 'Black x Croc', cat: 'Футболки', price: 2490, img: BXC_FITNESS_FRONT, color: '#FF2D93' },
  { id: 12, name: 'Drip Tee Yellow', club: 'Black x Croc', cat: 'Футболки', price: 2790, img: BXC_DRIP_BACK, badge: 'Limited', color: '#FF2D93' },
  { id: 13, name: 'Gothic Logo Tee', club: 'Black x Croc', cat: 'Футболки', price: 2490, img: BXC_GOTHIC_FRONT, badge: 'New', color: '#FF2D93' },
  // 50GYM
  { id: 4, name: 'Logo Tee Green', club: '50GYM', cat: 'Футболки', price: 2490, img: GYM_TEE_GREEN, img2: GYM_TEE_BACK, badge: 'New', color: '#39FF14' },
  { id: 5, name: 'Logo Tee Pink', club: '50GYM', cat: 'Футболки', price: 2490, img: GYM_TEE_PINK, img2: GYM_TEE_BACK, color: '#39FF14' },
  { id: 6, name: 'Logo Tee Back', club: '50GYM', cat: 'Футболки', price: 2490, img: GYM_TEE_BACK, img2: GYM_TEE_GREEN, badge: 'Drop', color: '#39FF14' },
  { id: 7, name: 'Logo Longsleeve Pink', club: '50GYM', cat: 'Лонгсливы', price: 3290, img: GYM_LONG_PINK, badge: 'New', color: '#39FF14' },
  // REPiT
  { id: 8, name: 'Street Cap', club: 'REPiT', cat: 'Кепки', price: 1990, img: CAP, color: '#FF6A00' },
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
  const [pdp, setPdp] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => cat === 'Все' || p.cat === cat);
  const related = pdp ? PRODUCTS.filter((p) => p.id !== pdp.id && (p.club === pdp.club || p.cat === pdp.cat)).slice(0, 4) : [];

  return (
    <div className="min-h-screen bg-white text-ink" style={{ ['--club' as string]: club.color }}>
      {pdp && (
        <ProductPage
          product={pdp}
          onClose={() => setPdp(null)}
          onAddToCart={() => setCart((c) => c + 1)}
          related={related}
          onOpenProduct={(p) => { setPdp(p); window.scrollTo(0, 0); }}
        />
      )}
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
            <img src={BXC_WINGS_PINK_BACK} alt="Хиро мерч" loading="eager" className="relative w-full max-w-sm rounded-2xl object-cover shadow-2xl" />
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
                className="glow-club group relative cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-white transition"
                onClick={() => { setPdp(p); window.scrollTo(0, 0); }}
              >
                <div className="relative aspect-square overflow-hidden bg-[#eee]">
                  <img src={p.img} alt={p.name} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${p.img2 ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`} />
                  {p.img2 && (
                    <img src={p.img2} alt={`${p.name} — вид сзади`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  )}
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