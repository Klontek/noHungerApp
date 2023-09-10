import Category from "../model/category.js";

export const getCategories = async (req, res) => {
 try{
  const category = await Category.find();
  res.status(201).json(category)
 }catch(error) {
  res.status(500).json({
   msg: error
  })
 }
}

export const getCategory = async(req, res) => {
 const categoryId = req.params.categoryId
 try{
  const category = await Category.findById(categoryId);
  if(!category) {
    res.status(404).json({msg: "The category with the given ID was not found"}) 
  }
  res.status(200).json(category);
 }catch(error) {
  res.status(500).json({
   success: false,
   msg: error
  })
 }
}

export const addCategory = async (req, res) => {
 try{
  const newCategory = Category.create({
   name: req.body.name,
   icon: req.body.icon,
   color: req.body.color,
   image: req.body.image
  });
  res.status(201).json(newCategory);
 }catch(error) {
  res.status(500).json({
   msg: error
  })
 }
}

export const updateCategories = async (req, res) => {
 try{
  await Category.findByIdAndUpdate(
   req.params.categoryId,
   { 
    $set: req.body 
   },
   {
    new: true
   }
  );

  res.status(200).json("Category has been updated successfully!")
 }catch(error) {
  res.status(500).json({
   msg: error
  })
 }
} 

export const deleteCategory = async (req, res) => {
 try {
  let category = await Category.findById(req.params.categoryId)
  (!category) ? res.status(404).json({msg: "category not found"}) :
  await category.remove();
  res.status(200).json("Category has been deleted successfully")
 }catch(error) {
  res.status(500).json({
   success: false,
   msg: error
  }) 
 }
}