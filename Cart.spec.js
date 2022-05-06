import Cart from './Cart';
describe('Cart', () => {
  let cart;
  let product = {
    title: 'Product 1',
    price: 35388,
  };
  let otherProduct = {
    title: 'Product 2',
    price: 5533,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created', () => {
      const cart = new Cart();
      expect(cart.getTotal()).toEqual(0);
    });

    it('should multiply quantity and price and receive when the total amount', () => {
      const item = {
        product,
        quantity: 2, // 70776
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(70776);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product, quantity: 1 });

      expect(cart.getTotal()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: otherProduct, quantity: 1 });

      cart.remove(product);

      expect(cart.getTotal()).toEqual(5533);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({ product, quantity: 3 });
      cart.add({ product: otherProduct, quantity: 15 });

      expect(cart.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Product 1",
              },
              "quantity": 3,
            },
            Object {
              "product": Object {
                "price": 5533,
                "title": "Product 2",
              },
              "quantity": 15,
            },
          ],
          "total": 189159,
        }
      `);
    });
    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({ product, quantity: 3 });
      cart.add({ product: otherProduct, quantity: 15 });

      expect(cart.summary()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Product 1",
              },
              "quantity": 3,
            },
            Object {
              "product": Object {
                "price": 5533,
                "title": "Product 2",
              },
              "quantity": 15,
            },
          ],
          "total": 189159,
        }
      `);

      expect(cart.getTotal()).toBeGreaterThan(0);
    });
    it('should reset the cart when checkout() is called', () => {
      cart.add({ product, quantity: 3 });

      cart.checkout();
      expect(cart.getTotal()).toEqual(0);
    });
  });
});
