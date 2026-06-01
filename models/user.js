const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Bestämmer hur en användare ska se ut i databasen
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, //Kan bara finnas en användare med det namnet
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

//En pre-save funktion som körs innan det sparas i databasen
userSchema.pre("save", async function () {
  try {
    //Om lösenordet är nytt eller ändrats så ska det krypteras
    if (this.isNew || this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10); // Hashar lösenordet så  det ej sparas i klartext
      this.password = hashedPassword;
    }
  } catch (error) {
    throw error;
  }
});

//Funktion för att skapa en ny användare
userSchema.statics.register = async function (username, password) {
  try {
    const user = new this({ username, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

//Jämför det inskrivna lösenrodet med det krypterade i databasen
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

//Logik för själva inloggningen
userSchema.statics.login = async function (username, password) {
  try {
    //Kolla om användaren finns i databasen
    const user = await this.findOne({ username });
    if (!user) {
      throw new Error("Incorrect username/password");
    }
    //Om användare finns kolla om lösenordet matchar
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Incorrect username/password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
