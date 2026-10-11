import express from 'express';
import { 
  createCategoryController,
  findAllCategoriesController,
  findCategoryPerIDController,
  updateCategoryPerIDController,
  deleteCategoryPerIDController
} from "../../controllers/category/categoryController.js";

const router = express.Router();

router.post('/', createCategoryController);       // Mapeia para: POST /categories
router.get('/', findAllCategoriesController);     // Mapeia para: GET /categories
router.get('/:id', findCategoryPerIDController);           // Mapeia para: GET /categories/:id
router.put('/:id', updateCategoryPerIDController);         // Mapeia para: PUT /categories/:id
router.delete('/:id', deleteCategoryPerIDController);      // Mapeia para: DELETE /categories/:id

export default router;