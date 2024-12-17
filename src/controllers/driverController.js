// controllers/driverController.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const DriverRoute = require('../models/DriverRoutes');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'drivers', // Carpeta en Cloudinary
      allowed_formats: ['jpg', 'png'],
      public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Nombre del archivo en Cloudinary
  },
});

const upload = multer({ storage });

exports.createDriverWithPhotos = async (req, res) => {
  upload.fields([
    { name: 'photoCi', maxCount: 1 },
    { name: 'reversePhotoCi', maxCount: 1 },
    { name: 'photoLicence', maxCount: 1 },
    { name: 'reversePhotoLicence', maxCount: 1 },
    { name: 'photoCar', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(400).json({ error: 'Error uploading files', details: err.message });
    }

    // Aquí puedes acceder a req.files y req.body
    console.log('Archivos subidos:', req.files);
    console.log('Datos del formulario:', req.body);

    const { idUser, routes, Marcca, Model, Placa } = req.body;

    try {
      const driverRoute = new DriverRoute({
        idUser,
        photoCi: req.files['photoCi']?.[0]?.path,
        reversePhotoCi: req.files['reversePhotoCi']?.[0]?.path,
        photoLicence: req.files['photoLicence']?.[0]?.path,
        reversePhotoLicence: req.files['reversePhotoLicence']?.[0]?.path,
        photoCar: req.files['photoCar']?.[0]?.path,
        Marcca,
        Model,
        Placa,
        routes: JSON.parse(routes),
      });

      await driverRoute.save();
      res.status(201).json(driverRoute);
    } catch (error) {
      console.error('Error saving driver route:', error);
      res.status(500).json({ error: 'Error saving driver route', details: error.message });
    }
  });
};




exports.createDriverRoutes = async (req, res) => {

  const { idUser, routes } = req.body;

  if (!idUser || !routes) {
    return res.status(400).json({ error: 'idUser and routes are required' });
  }

  try {
    const driverRoute = new DriverRoute({ idUser, routes });
    await driverRoute.save();
    res.status(201).json(driverRoute);
  } catch (error) {
    console.error('Error creating driver routes:', error);
    res.status(500).json({ error: 'Error creating driver routes', details: error.message });
  }
};

exports.addRoute = async (req, res) => {
  const { idUser, route } = req.body;

  if (!idUser || !route) {
    return res.status(400).json({ error: 'idUser and route are required' });
  }

  try {
    const driverRoute = await DriverRoute.findOneAndUpdate(
      { idUser },
      { $addToSet: { routes: route } },
      { new: true, upsert: true }
    );
    res.status(200).json(driverRoute);
  } catch (error) {
    console.error('Error adding route:', error);
    res.status(500).json({ error: 'Error adding route', details: error.message });
  }
};

exports.removeRoute = async (req, res) => {
  const { idUser, route } = req.body;

  if (!idUser || !route) {
    return res.status(400).json({ error: 'idUser and route are required' });
  }

  try {
    const driverRoute = await DriverRoute.findOneAndUpdate(
      { idUser },
      { $pull: { routes: route } },
      { new: true }
    );
    res.status(200).json(driverRoute);
  } catch (error) {
    console.error('Error removing route:', error);
    res.status(500).json({ error: 'Error removing route', details: error.message });
  }
};

exports.getDriverRoutes = async (req, res) => {
  const { idUser } = req.params;

  if (!idUser) {
    return res.status(400).json({ error: 'idUser requerido' });
  }

  try {
    const driverRoute = await DriverRoute.findOne({ idUser });

    if (!driverRoute) {
      return res.status(404).json({ error: 'Id no encontrado' });
    }

    res.status(200).json(driverRoute);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error', details: error.message });
  }
};

