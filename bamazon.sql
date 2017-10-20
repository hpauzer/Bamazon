#2. Then create a Table inside of that database called `products`.

#3. The products table should have each of the following columns:

  # * item_id (unique id for each product)

   #* product_name (Name of product)

   #* department_name

   #* price (cost to customer)

  # * stock_quantity (how much of the product is available in stores)

#4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).


Create table products(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(13,2),
	stock_quantity INT(4)
    );

INSERT INTO bamazon.products( 
product_name, department_name, price, stock_quantity)
VALUES ("OPI Nail Polish Vamp", "Beauty", 7.99, 25), 
("Frye Melissa Boots", "Shoes", 499.00, 5), 
("Ds No Cow Bars", "Grocery", 2.25, 30), 
("Nike Sweatshirt", "Apparel", 49.99, 7), 
("What Happened by Hillary Clinton", "Books", 19.95, 17), 
("Dove Dry Shampoo", "Beauty", 3.99, 16), 
("Vega Protein Shake Vanilla", "Grocery", 48.99, 11), 
("Smuckers Natural Peanut Butter", "Grocery", 2.99, 22), 
("Northface Quilted Vest Black", "Apparel", 98.99, 7), 
("Creativity Inc by Ed Catmull", "Books", 17.99, 8);
