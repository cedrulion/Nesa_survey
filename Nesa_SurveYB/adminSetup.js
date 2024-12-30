// adminSetup.js
const Admin = require('../Nesa_SurveYB/src/model/AdminModel');

const createAdminUser = async () => {
  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      // Create a new admin if not found
      const admin = new Admin({
        username: 'admin',
        password: 'admin123', // You can change this to a secure password
      });
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error setting up admin user:', err);
  }
};

module.exports = createAdminUser;
