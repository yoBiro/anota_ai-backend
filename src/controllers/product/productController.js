import { createProduct, 
  findProductPerID, 
  findAllProducts, 
  updateProductPerID, 
  deleteProductPerID } from "../../services/product/productService.js";

export async function createProductController(req, res) {
  try {
    const { title, description, price, category_id, owner_id } = req.body;

    if (!title || !price || !category_id || !owner_id) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    
    const newProduct = await createProduct({
      title,
      description,
      price,
      category_id,
      owner_id
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function findAllProductsController(req, res) {
  try {
    const products = await findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function findProductPerIDController(req, res) {
  try {
    const product = await findProductPerID(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateProductPerIDController(req, res) {
  try {
    const product = await updateProductPerID(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProductPerIDController(req, res) {
  try {
    const product = await deleteProductPerID(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}