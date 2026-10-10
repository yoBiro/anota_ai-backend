import { create, 
  findAll, 
  findPerID, 
  updatePerID, 
  deletePerID } from "../../repositories/product/productRepository.js";

import crypto from 'crypto'

export async function createProduct(data) {

  if (data.price < 0) {
    throw new Error ('O Preço não pode ser negativo.')
  }
  if (!data.title || data.title.length < 4) {
    throw new Error('O título é obrigatório e deve ter pelo menos 4 caracteres.');
  }
  if (!data.category_id) {
    throw new Error('A categoria é obrigatória.');
  }

  const newProduct = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    price: data.price,
    category_id: data.category_id,
    owner_id: data.owner_id,
    created_at: new Date()
  }

  return await create(newProduct)

}

export async function findAllProducts() {
  return await findAll();
}

export async function findProductPerID(id) {
  const productExists = findPerID({ id })
  if (!productExists) {
    throw new Error('Produto não encontrado.')
  }
  return productExists
}

export async function updateProductPerID(id, data) {
  // 1. Validações de negócio de entrada
  if (data.price !== undefined && data.price < 0) {
    throw new Error('Preço Inválido para Atualização.');
  }
  if (data.title !== undefined && (!data.title || data.title.length < 4)) {
    throw new Error('O título deve ter pelo menos 4 caracteres.');
  }

  // 2. CORREÇÃO: Busca os dados ATUAIS do produto no banco usando findPerID e await
  const productExists = await findPerID({ id });
  if (!productExists) {
    throw new Error('Produto não encontrado para atualização.');
  }

  // 3. Mescla os dados (se o usuário não enviou no body, usa o que já estava no banco)
  const productData = {
    id,
    title: data.title || productExists.title,
    description: data.description !== undefined ? data.description : productExists.description,
    price: data.price !== undefined ? data.price : productExists.price,
    category_id: data.category_id || productExists.category_id,
    owner_id: data.owner_id || productExists.owner_id
  };

  // 4. Executa a atualização de fato com os dados mesclados e sem undefined
  await updatePerID(productData);
  
  return productData;
}

export async function deleteProductPerID(id) {
  const productExists = findPerID({ id })
  if (!productExists) {
    throw new Error('Produto não encontrado.')
  }

  return await deletePerID({ id });
}