import { products, coupons } from "../features/shop/data";
import { formatCurrency } from "../lib/format";
import Script from "next/script";

export default function Home() {
  return (
    <div
      id="shop"
      className="min-h-screen bg-slate-50 text-slate-950"
      data-products={JSON.stringify(products)}
      data-coupons={JSON.stringify(coupons)}
    >
      <header className="w-full border-b bg-white/5 px-6 py-4">
        <div className="mx-auto max-w-7xl">ECサイトデモストア</div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-8 py-12 text-white shadow-2xl shadow-slate-800/30 sm:px-12 sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-white/10">
                ECサイトデモストア
              </p>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  毎日のショッピングがもっとシンプルに。
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-300">
                  今すぐ使える商品カタログとショッピングカート機能を備えた、Next.jsベースのECサイトサンプルです。
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">カテゴリー</p>
                  <p className="mt-3 text-xl font-semibold">家具・家電・ガジェット</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">特長</p>
                  <p className="mt-3 text-xl font-semibold">レスポンシブ・クリーンUI・カート管理</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">あなたのカート</p>
              <p id="hero-item-count" className="mt-4 text-4xl font-semibold text-white">0 商品</p>
              <p className="mt-2 text-slate-300">合計: <span id="hero-total">{formatCurrency(0)}</span></p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article key={product.id} data-product-id={product.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{product.category}</p>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-950">{product.name}</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">{product.badge}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{product.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">{formatCurrency(product.price)}</p>
                    <p className="mt-2 text-xs text-slate-500">在庫: {product.stock} 個</p>
                  </div>
                  <button type="button" data-action="add" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">カートに追加</button>
                </div>
              </article>
            ))}
          </div>

          <aside id="cart" className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-semibold text-slate-500">注文概要</p><p className="mt-2 text-xs text-slate-400">数量を調整して購入準備を進めます。</p></div>
              <span id="cart-count" className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">0 種類</span>
            </div>
            <div id="cart-items"><div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">カートに商品がありません。商品を追加してください。</div></div>
            <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-inner shadow-slate-900/10">
              <div className="space-y-4">
                <div><p className="text-sm uppercase tracking-[0.24em] text-slate-400">クーポンコード</p><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="coupon-code" placeholder="例: SALE10" className="w-full rounded-2xl border border-white/15 bg-slate-100/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/20 sm:max-w-[220px]" /><button id="apply-coupon" type="button" disabled className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">適用する</button></div><p id="coupon-message" className="mt-2 text-sm text-slate-300"></p></div>
                <div id="applied-coupon"></div>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-900/60 p-5"><div className="flex items-center justify-between text-sm text-slate-400"><span>小計</span><span id="subtotal">{formatCurrency(0)}</span></div><div className="mt-3 flex items-center justify-between text-sm text-slate-400"><span>割引</span><span id="discount">-{formatCurrency(0)}</span></div><p className="mt-6 text-sm uppercase tracking-[0.24em] text-slate-400">合計金額</p><p id="discounted-total" className="mt-3 text-3xl font-semibold">{formatCurrency(0)}</p><button id="checkout" type="button" disabled className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">レジに進む</button></div>
            </div>
          </aside>
        </section>
      </main>
      <Script src="/shop.js" strategy="afterInteractive" />
    </div>
  );
}
