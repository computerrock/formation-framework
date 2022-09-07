/**
 * Formation logger service
 *
 * @constructor
 */
export default class FormationLoggerService {
    #logger = null;

    setLoggerClient = logger => {
        if (!logger || !(typeof logger === 'function' || typeof logger === 'object')) {
            warning(false, `Logger client not provided.`);
            throw new Error('Logger client not provided.');
        }

        if (typeof logger.error !== 'function') {
            warning(false, `Logger client must at least implement 'error' method. Methods 'info' and 'warn' are optional but recommended.`);
            throw new Error('Logger client must at least implement `error` method.');
        }

        this.#logger = logger;
    };

    error = (message, messageContext) => {
        if (this.#logger) {
            this.#logger.error(message, messageContext);
        }
    };

    warn = (message, messageContext) => {
        if (this.#logger) {
            if (typeof this.#logger.warn === 'function') {
                this.#logger.warn(message, messageContext);
            } else {
                this.#logger.error(message, messageContext);
            }
        }
    };

    info = (message, messageContext) => {
        if (this.#logger && typeof this.#logger.info === 'function') {
            this.#logger.info(message, messageContext);
        }
    };
}
