import express from 'express';
import { 
  createProductController,
  findAllProductsController,
  findProductPerIDController,
  updateProductPerIDController,
  deleteProductPerIDController
} from "../../controllers/product/productController.js";

const router = express.Router();

router.post('/', createProductController);       // Mapeia para: POST /products
router.get('/', findAllProductsController);     // Mapeia para: GET /products
router.get('/:id', findProductPerIDController);           // Mapeia para: GET /products/:id
router.put('/:id', updateProductPerIDController);         // Mapeia para: PUT /products/:id
router.delete('/:id', deleteProductPerIDController);      // Mapeia para: DELETE /products/:id

export default router; 
