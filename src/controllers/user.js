import bcrypt from "bcrypt";
import Users from "../Model/User.js";
import Blogs from "../Model/Blog.js";

  async function update(req, res) {
    try {
      const userId = req.userId;
      const existingUser = await Users.Math.findById(userId);
  
      if (!existingUser) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }
  
      const { name, email, password } = req.body;
  
      existingUser.name = name || existingUser.name;
      existingUser.email = email || existingUser.email;
      existingUser.password = password || existingUser.password;
  
      if (password) {
        // Eğer yeni bir şifre verildiyse, şifreyi güncelle
        if (password.length < 6)
          return res
            .status(400)
            .json({ error: "Şifreniz en az 6 karakter olmalıdır" });
        if (password.length > 32)
          return res
            .status(400)
            .json({ error: "Şifreniz en fazla 32 karakter olmalıdır" });
  
        if (!password.match(/[a-z]/g))
          return res
            .status(400)
            .json({ error: "Şifreniz en az bir küçük harf içermelidir" });
        if (!password.match(/[A-Z]/g))
          return res
            .status(400)
            .json({ error: "Şifreniz en az bir büyük harf içermelidir" });
        if (!password.match(/[0-9]/g))
          return res
            .status(400)
            .json({ error: "Şifreniz en az bir rakam içermelidir" });
        existingUser.password = await bcrypt.hash(password, 10);
      }
  
      await existingUser.save();
      res.status(200).json({ message: "Kullanıcı başarıyla güncellendi" });
    } catch (error) {
      res.status(500).json({
        error: "Kullanıcı güncellenirken bir hata oluştu.",
        message: error.message,
      });
    }
  }
  
  async function getUserById(req, res) {
    try {
      const userId = req.userId;
  
      const user = await Users.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ error: "Kullanıcı bulunamadı" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Kullanıcı bilgileri alınırken bir hata oluştu." });
    }
  }
  
  async function getAllUsers(req, res) {
    try {
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await Users.findById(userId);
      const userBlogs = user.blogs;
      if (!user) {
        return res.status(404).json({ error: "Kullanıcı bulunamadı" });
      }
  
      userBlogs.map(async (blogId) => {
        await Blogs.findByIdAndDelete(blogId);
      });
  
      await Users.findByIdAndDelete(userId);
      res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export { update, getUserById, getAllUsers, deleteUser };
