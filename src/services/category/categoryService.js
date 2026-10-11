import { create, 
  findAll, 
  findPerID, 
  updatePerID, 
  deletePerID } from "../../repositories/category/categoryRepository.js";

import crypto from 'crypto'

export async function createCategory(data) {

  if (!data.title || data.title.length < 4) {
    throw new Error('O título é obrigatório e deve ter pelo menos 4 caracteres.');
  }

  const newCategory = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    owner_id: data.owner_id,
    created_at: new Date()
  }

  return await create(newCategory)

}

export async function findAllCategories() {
  return await findAll();
}

export async function findCategoryPerID(id) {
  const categoryExists = await findPerID({ id })
  if (!categoryExists) {
    throw new Error('Categoria não encontrada.')
  }
  return categoryExists
}

export async function updateCategoryPerID(id, data) {
  // 1. Validações de negócio de entrada
  if (data.title !== undefined && (!data.title || data.title.length < 4)) {
    throw new Error('O título deve ter pelo menos 4 caracteres.');
  }

  // 2. CORREÇÃO: Busca os dados ATUAIS da categoria no banco usando findPerID e await
  const categoryExists = await findPerID({ id });
  if (!categoryExists) {
    throw new Error('Categoria não encontrada para atualização.');
  }

  // 3. Atualiza a categoria no banco de dados
  const updatedCategory = {
    id,
    title: data.title !== undefined ? data.title : categoryExists.title,
    description: data.description !== undefined ? data.description : categoryExists.description,
    owner_id: data.owner_id !== undefined ? data.owner_id : categoryExists.owner_id
  };
  
  return await updatePerID(updatedCategory);
}

export async function deleteCategoryPerID(id) {
  const categoryExists = await findPerID({ id });
  if (!categoryExists) {
    throw new Error('Categoria não encontrada para exclusão.');
  }

  return await deletePerID({ id });
}