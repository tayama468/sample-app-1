import type { CartItem, Coupon } from "../types";
import { formatCurrency } from "../lib/format";

type CartSidebarProps = {
  cartItems: CartItem[];
  totalPrice: number;
  discount: number;
  discountedTotal: number;
  couponCode: string;
  couponMessage: string;
  appliedCoupon: Coupon | null;
  onChangeCouponCode: (value: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onChangeQuantity: (productId: number, delta: number) => void;
};

export default function CartSidebar({
  cartItems,
  totalPrice,
  discount,
  discountedTotal,
  couponCode,
  couponMessage,
  appliedCoupon,
  onChangeCouponCode,
  onApplyCoupon,
  onRemoveCoupon,
  onChangeQuantity,
}: CartSidebarProps) {
  return (
    <aside className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">注文概要</p>
          <p className="mt-2 text-xs text-slate-400">数量を調整して購入準備を進めます。</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
          {cartItems.length} 種類
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          カートに商品がありません。商品を追加してください。
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatCurrency(item.price)} × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => onChangeQuantity(item.id, -1)}
                    className="h-9 w-9 rounded-full bg-slate-900 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onChangeQuantity(item.id, 1)}
                    className="h-9 w-9 rounded-full bg-slate-900 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    ＋
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-inner shadow-slate-900/10">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">クーポンコード</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={couponCode}
                onChange={(event) => onChangeCouponCode(event.target.value)}
                placeholder="例: SALE10"
                className="w-full rounded-2xl border border-white/15 bg-slate-100/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/20 sm:max-w-[220px]"
              />
              <button
                type="button"
                onClick={onApplyCoupon}
                disabled={cartItems.length === 0}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                適用する
              </button>
            </div>
            {couponMessage ? (
              <p className="mt-2 text-sm text-slate-300">{couponMessage}</p>
            ) : null}
          </div>

          {appliedCoupon ? (
            <div className="rounded-3xl bg-white/10 p-4 text-sm text-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">適用済みクーポン</p>
                  <p className="text-xs text-slate-300">{appliedCoupon.code} - {appliedCoupon.description}</p>
                </div>
                <button
                  type="button"
                  onClick={onRemoveCoupon}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                >
                  解除
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-6 rounded-3xl bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>小計</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
            <span>割引</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-slate-400">合計金額</p>
          <p className="mt-3 text-3xl font-semibold">{formatCurrency(discountedTotal)}</p>
          <button
            type="button"
            disabled={cartItems.length === 0}
            className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            レジに進む
          </button>
        </div>
      </div>
    </aside>
  );
}
