import Products from "../models/productModel"
import { APIfeatures } from "../lib/features";
const productCtr = {
    getProducts: async (req, res) => {
      try {
        const features = new APIfeatures(Products.find(), req.query)
        .paginating().sorting().searching().filtering()
  
        const result = await Promise.allSettled([
          features.query,
          Products.countDocuments() //count number of products.
        ])
        
        const products = result[0].status === 'fulfilled' ? result[0].value : [];
        const count = result[1].status === 'fulfilled' ? result[1].value : 0;
  
        return res.status(200).json({products, count})
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    },
    getProduct: async(req, res) => {
        try {
          const product = await Products.findById(req.params.id)
    
          if(!product) 
            return res.status(404).json({msg: 'This product does not exist.'})
    
          return res.status(200).json(product)
        } catch (err) {
          return res.status(500).json({msg: err.message})
        }
      }, 
    addProduct: async (req, res) => {
        try {
          const { title, price, description, category, image } = req.body;
          //loc truoc: lay cac gia tri can thiet tu req.body( trong truong hop du )
    
          const newProduct = new Products({
            title, price, description, category, image
          })
          // tao doi tuong schema tu models anh xa vao collections
          await newProduct.save()
    
          return res.status(200).json(newProduct)
        } catch (err) {
          return res.status(500).json({msg: err.message})
        }
      },
    updateProduct: async (req, res) => {
        try {
          const { title, price, description, category, image } = req.body;
          
          const product = await Products.findByIdAndUpdate(req.params.id, {
            title, price, description, category, image
          }, { new: true })
          // new: true tra ve gia tri vua moi update
          if(!product) 
            return res.status(404).json({msg: 'This product does not exist.'})
    
          return res.status(200).json(product)
        } catch (err: any) {
          return res.status(500).json({msg: err.message})
        }
      },
    deleteProduct: async (req, res) => {
        try {
          
          const product = await Products.findByIdAndDelete(req.params.id)
    
          if(!product) 
            return res.status(404).json({msg: 'This product does not exist.'})
    
          return res.status(200).json({msg: 'Delete Success!'})
        } catch (err) {
          return res.status(500).json({msg: err.message})
        }
      }
}
export default productCtr;