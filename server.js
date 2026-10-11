import express from 'express';
import productRouter from "./src/routes/products/productRoutes.js"; 
import categoryRouter from "./src/routes/category/categoryRoutes.js"; 

const app = express();
app.use(express.json());

app.use('/products', productRouter); 
app.use('/categories', categoryRouter); 

app.get('/status', (req, res) => {
  try {
    res.send('BACK-END ANOTA AI - FUNCIONANDO');
  } catch (error) {
    res.status(500).send('BACK-END ANOTA AI - ERROR');
  }
});

app.listen(3000, () => {
  console.log('SERVER FUNCIONANDO EM http://localhost:3000');
});
