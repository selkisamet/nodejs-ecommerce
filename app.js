const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const adminRouter = require("./routes/admin");
const userRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const sequelize = require("./utility/database");
const Product = require("./models/product");
const Category = require("./models/category");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");

app.set("view engine", "pug");
app.set("views", "./views", { pretty: true });

// Body Parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public/")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Routes
app.use("/admin", adminRouter);
app.use(userRoutes);
app.use(errorsController.getErrorsPage);

Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
});

Product.belongsTo(Category, { foreignKey: { allowNull: false } });
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    User.findByPk(1)
      .then((user) => {
        if (!user) {
          return User.create({
            name: "sametselki",
            email: "sametselki@outlook.com",
          });
        }
        return user;
      })
      .then((user) => {
        return user.getCart();
        Category.count().then((count) => {
          if (count === 0) {
            Category.bulkCreate([
              { name: "Telefon", description: "Lorem ipsum.." },
              { name: "Bilgisayar", description: "Lorem ipsum.." },
              { name: "Elektronik", description: "Lorem ipsum.." },
            ]);
          }
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000..");
});
