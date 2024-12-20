const { activeDrivers } = require('../../index');

const getDriverLocations = async (req, res) => {
    try {
        const routeId = req.params.routeId;
        const drivers = Object.entries(activeDrivers)
            .filter(([_, driver]) => driver.routeId === routeId)
            .map(([driverId, driver]) => ({
                driverId,
                latitude: driver.latitude,
                longitude: driver.longitude
            }));
        res.status(200).json({ drivers });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ubicaciones', error });
    }
};

module.exports = { getDriverLocations };
