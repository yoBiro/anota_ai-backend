/* 

*/

import { connection } from '../../config/database.js'

export async function create(categoryData) {
  const pool = await connection();
  const { id, title, description, owner_id, created_at } = categoryData;

  const query = `
    INSERT INTO categories (id, title, description, owner_id, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    await pool.execute(query, [id, title, description, owner_id, created_at])
    console.log("Categoria criada com sucesso!");
  } catch (error) {
    console.error("Falha ao criar categoria:", error.message);
    throw error;
  }
}

export async function findPerID(categoryData) {
  const pool = await connection();
  const { id } = categoryData;

  const query = `
    SELECT * FROM categories WHERE id = ?
  `;

  try {
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Falha ao buscar categoria:", error.message);
    throw error;
  }
}

export async function findAll() {
  const pool = await connection();

  const query = `
    SELECT * FROM categories
  `;

  try {
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    console.error("Falha ao buscar categorias:", error.message);
    throw error;
  }
}

export async function updatePerID(categoryData) {
  const pool = await connection();
  const { id, title, description, owner_id } = categoryData;

  const query = `
    UPDATE categories
    SET title = ?, description = ?, owner_id = ?
    WHERE id = ?
  `;

  try {
    await pool.execute(query, [title, description, owner_id, id]);
    console.log("Categoria atualizada com sucesso!");
  } catch (error) {
    console.error("Falha ao atualizar categoria:", error.message);
    throw error;
  }
}

export async function deletePerID(categoryData) {
  const pool = await connection();
  const { id } = categoryData;

  const query = `
    DELETE FROM categories WHERE id = ?
  `;

  try {
    await pool.execute(query, [id]);
    console.log("Categoria deletada com sucesso!");
  } catch (error) {
    console.error("Falha ao deletar categoria:", error.message);
    throw error;
  }
}