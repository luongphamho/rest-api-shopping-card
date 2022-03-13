import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

productSchema.index({title: 'text'})
//danh dau index de tim kiem
const Products = mongoose.model('Products', productSchema)

Products.createIndexes({title: 'text'})
//danh dau index
export default Products;