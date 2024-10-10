const Product = require ("../../models/product");

const Adminproduct = async (req, res) => {
    try {
        const products = await Product.find();

        const updateproducts = products.map(product => {
            return {
                ...product._doc, 
                lowStock: product.stock === 0 
            };
        });

  
        res.render("Admin/Adminproduct", { products: updateproducts });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: Unable to load products");
    }
};


const editproductpage = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render("Admin/editproduct", { product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: Unable to load the product edit page");
    }
};

const Addproduct = async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;
        const image = req.file ? req.file.filename : "";
       

        if (!image) {
            return res.status(400).json({ error: "Image is required." });
        }

        const product = new Product({
            name,
            price,
            category,
            description,
            image,
            stock
        });

        await product.save();
        res.status(201).redirect("/Adminproduct");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: Unable to add product");
    }
};

const editproduct = async (req, res) => {
    try {
        const productId = req.params.id;
       
        
        const { name, description, price, stock, category } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Create an object with fields to update
        const updateFields = { name, description, price, stock, category };
        if (image) updateFields.image = image;  // Only update image if provided

        const updateProduct = await Product.findByIdAndUpdate(productId, updateFields, { new: true });

        if (!updateProduct) {
            return res.status(404).send("Product not found");
        }

        res.status(200).redirect("/Adminproduct");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: Unable to update product");
    }
};

const deleteproduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }

        res.status(200).redirect("/Adminproduct");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: Unable to delete product");
    }
};




module.exports = {Adminproduct,Addproduct,deleteproduct,editproductpage,editproduct}