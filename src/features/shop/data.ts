import type { Coupon, Product } from "../../types";

export const products: Product[] = [
  {
    id: 1,
    name: "モダンチェア",
    price: 12800,
    description: "どんな部屋にも馴染む、軽量で洗練されたデザイン。",
    category: "家具",
    badge: "人気",
    stock: 5,
  },
  {
    id: 2,
    name: "ワイヤレスヘッドフォン",
    price: 19800,
    description: "高音質ノイズキャンセリングで没入感のあるリスニング体験。",
    category: "オーディオ",
    badge: "おすすめ",
    stock: 4,
  },
  {
    id: 3,
    name: "コーヒーメーカー",
    price: 9500,
    description: "朝のひとときを豊かにするコンパクトな一台。",
    category: "キッチン",
    badge: "新着",
    stock: 3,
  },
  {
    id: 4,
    name: "ランニングシューズ",
    price: 11200,
    description: "軽さとクッション性を両立した、毎日のランニングに。",
    category: "スポーツ",
    badge: "売れ筋",
    stock: 6,
  },
  {
    id: 5,
    name: "スマートウォッチ",
    price: 23600,
    description: "健康管理と通知機能をひとつにまとめたスタイリッシュな腕時計。",
    category: "ガジェット",
    badge: "人気",
    stock: 2,
  },
];

export const coupons: Coupon[] = [
  {
    code: "SALE10",
    description: "合計から10%オフ",
    percentOff: 10,
  },
  {
    code: "WELCOME1000",
    description: "¥1,000割引（合計¥20,000以上）",
    amountOff: 1000,
    minimumTotal: 20000,
  },
  {
    code: "THANKS500",
    description: "¥500割引",
    amountOff: 500,
  },
];
