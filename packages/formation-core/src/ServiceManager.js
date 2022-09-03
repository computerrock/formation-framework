import warning from 'warning';

/**
 * Service manager
 */
class ServiceManager {
    constructor() {
        this.services = {};
    }

    /**
     * Registers service in manager
     *
     * @param {string} serviceName
     * @param {object} serviceObject
     */
    registerService = (serviceName, serviceObject) => {
        if (typeof this.services[serviceName] !== 'undefined') {
            warning(false, `[@computerrock] ServiceManager already contains service with name '${serviceName}'.`);
            throw new Error('Service initialization error - conflict: ' + serviceName);
        }

        this.services[serviceName] = serviceObject;
    };

    /**
     * Returns requested service by name
     *
     * @param {string} serviceName
     * @return {*}
     */
    loadService = serviceName => {
        if (typeof this.services[serviceName] === 'undefined') {
            warning(false, `[@computerrock] ServiceManager cannot find service with name: '${serviceName}'.`);
            throw new Error('Service initialization error - not found: ' + serviceName);
        }

        return this.services[serviceName];
    };

    /**
     * Removes registered service by name
     *
     * @param {string} serviceName
     */
    removeService = serviceName => {
        if (typeof this.services[serviceName] === 'undefined') {
            warning(false, `[@computerrock] ServiceManager cannot remove service with name: '${serviceName}'.`);
            return;
        }

        delete this.services[serviceName];
    };
}

export default ServiceManager;
