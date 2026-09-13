(() => {
  const root = document.getElementById("shop");
  if (!root) return;

  const products = JSON.parse(root.dataset.products || "[]");
  const coupons = JSON.parse(root.dataset.coupons || "[]");
  const cart = {};
  let appliedCoupon = null;

  const currency = (amount) => new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);

  const getItems = () => products
    .filter((product) => cart[product.id] > 0)
    .map((product) => ({ ...product, quantity: cart[product.id] }));

  const render = () => {
    const items = getItems();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = appliedCoupon?.percentOff
      ? Math.floor((total * appliedCoupon.percentOff) / 100)
      : appliedCoupon?.amountOff && (!appliedCoupon.minimumTotal || total >= appliedCoupon.minimumTotal)
        ? appliedCoupon.amountOff
        : 0;

    document.getElementById("hero-item-count").textContent = `${items.length} 商品`;
    document.getElementById("hero-total").textContent = currency(total);
    document.getElementById("cart-count").textContent = `${items.length} 種類`;
    document.getElementById("subtotal").textContent = currency(total);
    document.getElementById("discount").textContent = `-${currency(discount)}`;
    document.getElementById("discounted-total").textContent = currency(Math.max(total - discount, 0));
    document.getElementById("checkout").disabled = items.length === 0;
    document.getElementById("apply-coupon").disabled = items.length === 0;

    document.querySelectorAll("[data-product-id]").forEach((card) => {
      const product = products.find((item) => item.id === Number(card.dataset.productId));
      card.querySelector("[data-action=add]").disabled = cart[product.id] >= product.stock;
    });

    document.getElementById("cart-items").innerHTML = items.length === 0
      ? '<div class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">カートに商品がありません。商品を追加してください。</div>'
      : `<div class="space-y-4">${items.map((item) => `<div class="rounded-3xl border border-slate-200 bg-slate-50 p-4"><div class="flex items-start justify-between gap-4"><div><p class="text-sm font-semibold text-slate-950">${item.name}</p><p class="mt-1 text-xs text-slate-500">${currency(item.price)} × ${item.quantity}</p></div><div class="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm"><button type="button" data-change="-1" data-id="${item.id}" class="h-9 w-9 rounded-full bg-slate-900 text-sm font-bold text-white">−</button><span class="min-w-[2rem] text-center text-sm font-semibold text-slate-900">${item.quantity}</span><button type="button" data-change="1" data-id="${item.id}" class="h-9 w-9 rounded-full bg-slate-900 text-sm font-bold text-white">＋</button></div></div></div>`).join("")}</div>`;

    document.getElementById("applied-coupon").innerHTML = appliedCoupon
      ? `<div class="rounded-3xl bg-white/10 p-4 text-sm text-slate-200"><div class="flex items-center justify-between gap-4"><div><p class="font-semibold">適用済みクーポン</p><p class="text-xs text-slate-300">${appliedCoupon.code} - ${appliedCoupon.description}</p></div><button type="button" data-remove-coupon class="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs text-white">解除</button></div></div>`
      : "";
  };

  root.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    const id = Number(target.dataset.id || target.closest("[data-product-id]")?.dataset.productId);
    if (target.dataset.action === "add") cart[id] = Math.min((cart[id] || 0) + 1, products.find((item) => item.id === id).stock);
    if (target.dataset.change) cart[id] = Math.max((cart[id] || 0) + Number(target.dataset.change), 0);
    if (target.dataset.removeCoupon !== undefined) appliedCoupon = null;
    render();
  });

  document.getElementById("apply-coupon").addEventListener("click", () => {
    const code = document.getElementById("coupon-code").value.trim().toUpperCase();
    const coupon = coupons.find((item) => item.code === code);
    const total = getItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = document.getElementById("coupon-message");
    if (!coupon) { appliedCoupon = null; message.textContent = "無効なクーポンコードです。"; return render(); }
    if (coupon.minimumTotal && total < coupon.minimumTotal) { appliedCoupon = null; message.textContent = `このクーポンは合計${currency(coupon.minimumTotal)}以上でご利用いただけます。`; return render(); }
    appliedCoupon = coupon;
    message.textContent = `クーポン「${coupon.code}」を適用しました。`;
    render();
  });

  render();
})();