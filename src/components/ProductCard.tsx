import type { Product } from "../types";
import { formatCurrency } from "../lib/format";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onAddToCart: (productId: number) => void;
};

export default function ProductCard({ product, quantity, onAddToCart }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{product.category}</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">{product.name}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
          {product.badge}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{product.description}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-semibold text-slate-950">{formatCurrency(product.price)}</p>
          <p className="mt-2 text-xs text-slate-500">在庫: {product.stock} 個</p>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          disabled={quantity >= product.stock}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          カートに追加
        </button>
      </div>
    </article>
  );
}
