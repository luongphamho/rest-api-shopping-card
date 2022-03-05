import mongoose from 'mongoose'
//tam mang loc  
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

const Products = mongoose.model('Products', productSchema)
// productSchema se anh xa den Products collection tren mongodb
export default Products;