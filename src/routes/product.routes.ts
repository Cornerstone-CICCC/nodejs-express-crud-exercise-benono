import { Router, Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { Product, ProductRequestBody } from "../types/product"

const productRouter: Router = Router()

let products: Product[] = [
  {
    id: "1",
    product_name: "Card",
    product_description: "this is pokemon card",
    product_price: 1200,
  },
]

// Get all products
productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products)
})

// Post
productRouter.post(
  "/",
  (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
    const newProduct: Product = {
      id: uuidv4(),
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
    }
    products = [...products, newProduct]
    res.status(201).json("Product added successfully...")
  }
)

// Get by id
productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const result = products.find((product) => product.id === id)
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(404).json("product not found!")
  }
})

// Put by id
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response) => {
    const { id } = req.params
    const index = products.findIndex((product) => product.id === id)
    if (index !== -1) {
      const updatedProduct: Product = {
        ...products[index],
        product_name: req.body.product_name ?? products[index].product_name,
        product_description:
          req.body.product_description ?? products[index].product_description,
        product_price: req.body.product_price ?? products[index].product_price,
      }
      products[index] = updatedProduct
      res.status(201).json(updatedProduct)
    } else {
      res.status(404).json("No")
    }
  }
)

// Delete by id
productRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const findTodo = products.find((prodct) => prodct.id === id)
  if (findTodo) {
    products = products.filter((prodct) => prodct.id !== id)
    res.status(200).send(`Product was deleted successfully...`)
  } else {
    res.status(404).send(`Product not found!`)
  }
})

export default productRouter
