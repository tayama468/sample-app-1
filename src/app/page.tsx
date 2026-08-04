"use client";

import { useMemo, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CartSidebar from "../components/CartSidebar";
import { products, coupons } from "../features/shop/data";
import type { CartItem, Coupon } from "../types";
import { formatCurrency } from "../lib/format";

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<string>("");

  const cartItems: CartItem[] = useMemo(
    () =>
      products
        .filter((product) => cart[product.id] > 0)
        .map((product) => ({
          ...product,
          quantity: cart[product.id] ?? 0,
        })),
    [cart]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const addToCart = (productId: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setCart((prev) => {
      const currentQuantity = prev[productId] ?? 0;
      if (currentQuantity >= product.stock) return prev;
      return {
        ...prev,
        [productId]: currentQuantity + 1,
      };
    });
  };

  const changeQuantity = (productId: number, delta: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setCart((prev) => {
      const nextQuantity = (prev[productId] ?? 0) + delta;
      if (nextQuantity <= 0) {
        const nextCart = { ...prev };
        delete nextCart[productId];
        return nextCart;
      }
      if (nextQuantity > product.stock) {
        return prev;
      }
      return {
        ...prev,
        [productId]: nextQuantity,
      };
    });
  };

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minimumTotal && totalPrice < appliedCoupon.minimumTotal) {
      return 0;
    }
    if (appliedCoupon.percentOff) {
      return Math.floor((totalPrice * appliedCoupon.percentOff) / 100);
    }
    return appliedCoupon.amountOff ?? 0;
  }, [appliedCoupon, totalPrice]);

  const discountedTotal = Math.max(totalPrice - discount, 0);

  const applyCoupon = () => {
    const normalized = couponCode.trim().toUpperCase();
    const coupon = coupons.find((item) => item.code === normalized);
    if (!coupon) {
      setCouponMessage("無効なクーポンコードです。");
      setAppliedCoupon(null);
      return;
    }
    if (coupon.minimumTotal && totalPrice < coupon.minimumTotal) {
      setCouponMessage(`このクーポンは合計${formatCurrency(coupon.minimumTotal)}以上でご利用いただけます。`);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponMessage(`クーポン「${coupon.code}」を適用しました。`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponMessage("クーポンを解除しました。");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
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
              <p className="mt-4 text-4xl font-semibold text-white">{cartItems.length} 商品</p>
              <p className="mt-2 text-slate-300">合計: {formatCurrency(totalPrice)}</p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] ?? 0}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          <CartSidebar
            cartItems={cartItems}
            totalPrice={totalPrice}
            discount={discount}
            discountedTotal={discountedTotal}
            couponCode={couponCode}
            couponMessage={couponMessage}
            appliedCoupon={appliedCoupon}
            onChangeCouponCode={setCouponCode}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={removeCoupon}
            onChangeQuantity={changeQuantity}
          />
        </section>
      </main>
    </div>
  );
}
