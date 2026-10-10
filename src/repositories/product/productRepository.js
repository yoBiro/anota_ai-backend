/*
  Querys resumidas:

  - Create Product (POST)
  - Find All Products (GET)
  - Find Product per ID (GET)
  - Update Product per ID (PUT)
  - Delete Product per ID (DELETE)
*/

import { connection } from '../../config/database.js'

export async function create(productData) {
  const pool = await connection();
  const { id, title, description, price, category_id, owner_id, created_at } = productData;

  const query = `
    INSERT INTO products (id, title, description, price, category_id, owner_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await pool.execute(query, [id, title, description, price, category_id, owner_id, created_at])
    console.log("Produto criado com sucesso!");
  } catch (error) {
    console.error("Falha ao criar produto:", error.message);
    throw error;
  }
}

export async function findPerID (productData) {
  const pool = await connection();
  const { id } = productData;

  const query = `
    SELECT * FROM products WHERE id = ?
  `;

  try {
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Falha ao buscar produto:", error.message);
    throw error;
  }
}

export async function findAll(productData) {
  const pool = await connection();

  const query = `
    SELECT * FROM products
  `;

  try {
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    console.error("Falha ao buscar todos produtos:", error.message);
    throw error;
  } 
}

export async function updatePerID(productData) {
  const pool = await connection();
  const { id, title, description, price, category_id, owner_id } = productData;

  const query = `
    UPDATE products
    SET title = ?, description = ?, price = ?, category_id = ?, owner_id = ?
    WHERE id = ?
  `;

  try {
    await pool.execute(query, [title, description, price, category_id, owner_id, id]);
    console.log("Produto atualizado com sucesso!");
  } catch (error) {
    console.error("Falha ao atualizar produto:", error.message);
    throw error;
  }
}

export async function deletePerID(productData) {
  const pool = await connection();
  const { id } = productData;

  const query = `
    DELETE FROM products WHERE id = ?
  `;

  try {
    await pool.execute(query, [id]);
    console.log("Produto deletado com sucesso!");
  } catch (error) {
    console.error("Falha ao deletar produto:", error.message);
    throw error;
  }
}