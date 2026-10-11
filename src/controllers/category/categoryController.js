import { createCategory, 
  findCategoryPerID, 
  findAllCategories, 
  updateCategoryPerID, 
  deleteCategoryPerID } from "../../services/category/categoryService.js";

export async function createCategoryController(req, res) {
  try {
    const { title, description, owner_id } = req.body;

    if (!title || !owner_id) {
      return res.status(400).json({ error: 'O título e o ID do proprietário são obrigatórios.' });
    }

    const newCategory = await createCategory({
      title,
      description,
      owner_id
    })

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function findAllCategoriesController(req, res) {
  try {
    const categories = await findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function findCategoryPerIDController(req, res) {
  try {
    const category = await findCategoryPerID(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateCategoryPerIDController(req, res) {
  try {
    const category = await updateCategoryPerID(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteCategoryPerIDController(req, res) {
  try {
    const category = await deleteCategoryPerID(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }
    res.status(200).json({ message: 'Categoria deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}