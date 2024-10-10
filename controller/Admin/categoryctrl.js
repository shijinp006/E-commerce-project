const Category = require('../../models/category');

let Admincategory = async(req,res) => {
  try {
    const categories= await Category.find()
     
    res.render("Admin/Admincategory",{categories:categories});

  } catch (error) {
    console.error(error.message)
  }

}

    const Admineditcategory = async (req,res) => {
  try {

    const categoryId = req.params.id;
    
    // Fetch the category by its ID
    let categories = await Category.findById(categoryId);


    // Check if the category exists
    if (!categories) {
        return res.status(404).send('Category not found');
    }

    // Render the edit page, passing the category to the view
    res.render('Admin/Admineditcategory', { category:categories });

} catch (err) {
  console.error(err.message)
    res.status(500).send('Server error');
}
}


const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename :"";


    if (!image) {
      return res.status(400).send('Image is required.');
    }


    // Create a new category
    const category = new Category({
      name,
      description,
      image,
    });

    
    // Save the category in the database
    await category.save();

    res.status(200).redirect("/Admincategory")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  const editcategory = async (req,res) => {

    try {
      const { id } = req.params; // Get category ID from URL
      
      const { name,description } = req.body; // Get new name from the form

      const image = req.file ? req.file.filename :"";

      // Find category by ID and update it
      const updatedCategory = await Category.findByIdAndUpdate(id, { name,description,image });

      if (!updatedCategory) {
          return res.status(404).send('Category not found');
      }

      // Redirect to the category listing page (or wherever you want to go after editing)
      res.redirect('/Admincategory');
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
};


const deletecategory = async (req,res) => {
  try {

    const categoryId = req.params.id;


    await Category.findByIdAndDelete(categoryId)

    res.status(200).redirect("/Admincategory")

  } catch (error) {
    console.error (error.message)
  }
}




// Export the function correctly
module.exports =  {createCategory,editcategory,deletecategory,Admincategory,Admineditcategory} ;
