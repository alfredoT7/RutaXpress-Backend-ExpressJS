const Location = require('../models/Location');


exports.saveLocation = async (req, res) => {
    const { driverId, latitude, longitude } = req.body;

    if (!driverId || !latitude || !longitude) {
        return res.status(400).json({ message: 'Se requiere driverId, latitude, longitude' });
    }

    try {
        const newLocation = new Location({
            driverId,
            latitude,
            longitude,
        });

        await newLocation.save();

        res.status(200).json({ message: 'Ubicación guardada exitosamente', newLocation });
    } catch (err) {
        res.status(500).json({ message: 'Error al guardar la ubicación', error: err.message });
    }
}