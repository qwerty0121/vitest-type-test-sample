import { describe, expectTypeOf, test } from "vitest";

/** 製品を表す型 */
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  createdAt: Date;
}

/** 書籍製品を表す型 */
interface BookProduct extends Product {
  isbn: string;
}

/** 合計金額を計算する関数 */
function calculateTotalPrice(
  items: { price: number; quantity: number }[]
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

describe("Vitestによる型テストのサンプル", () => {
  // toEqualTypeOf: 特定の型が完全に一致することをテスト
  test("Product型は期待される構造と完全に一致すること", () => {
    type ExpectedBookProduct = {
      id: number;
      name: string;
      price: number;
      description?: string;
      createdAt: Date;
      isbn: string;
    };
    expectTypeOf<BookProduct>().toEqualTypeOf<ExpectedBookProduct>();
  });

  // not: 否定の条件をテスト
  test("Product型はisbnプロパティを持たないこと", () => {
    expectTypeOf<Product>().not.toHaveProperty("isbn");
  });

  // returns: 関数の戻り値の型をテスト
  test("calculateTotalPrice関数の戻り値はnumber型であること", () => {
    expectTypeOf(calculateTotalPrice).returns.toEqualTypeOf<number>();
  });

  // parameters: 関数の引数の型をテスト
  test("calculateTotalPrice関数の最初の引数は特定の配列型であること", () => {
    type ExpectedItemsParam = { price: number; quantity: number }[];
    expectTypeOf(calculateTotalPrice).parameters.toEqualTypeOf<
      [ExpectedItemsParam]
    >();
  });

  // toBeString: 型がstring型であることをテスト
  test("'abc'が文字列であること", () => {
    expectTypeOf("abc").toBeString();
  });

  // toHaveProperty: オブジェクト型が特定のプロパティを持つことをテスト
  test("BookProduct型はisbnプロパティを持つこと", () => {
    expectTypeOf<BookProduct>().toHaveProperty("isbn");
  });
});
