function createCollection() {
  let rows = [];
  let nextId = 1;

  return {
    insert(data) {
      const row = { id: nextId++, ...data };
      rows.push(row);
      return row;
    },
    findById(id) {
      return rows.find((row) => row.id === Number(id)) ?? null;
    },
    findAll() {
      return [...rows];
    },
    update(id, patch) {
      const row = rows.find((row) => row.id === Number(id));
      if (!row) return null;
      Object.assign(row, patch);
      return row;
    },
    remove(id) {
      const before = rows.length;
      rows = rows.filter((row) => row.id !== Number(id));
      return rows.length < before;
    },
    deleteAll() {
      rows = [];
      nextId = 1;
    },
  };
}

export const db = {
  users: createCollection(),
  products: createCollection(),
  orders: createCollection(),
  reviews: createCollection(),
};

export function seedDemoData() {
  db.products.deleteAll();
  db.products.insert({
    name: "เสื้อยืด",
    price: 199,
    description: "เสื้อยืดผ้าคอตตอน 100% ใส่สบาย",
  });
  db.products.insert({
    name: "กางเกงยีนส์",
    price: 590,
    description: "กางเกงยีนส์ทรงตรง ใส่ได้ทุกโอกาส",
  });
  db.products.insert({
    name: "หมวกแก๊ป",
    price: 150,
    description: "หมวกแก๊ปปรับขนาดได้",
  });
}

export function resetAll() {
  db.users.deleteAll();
  db.products.deleteAll();
  db.orders.deleteAll();
  db.reviews.deleteAll();
}
