import stylesInfo from './styles/info';
import stylesWarn from './styles/warn';
import stylesError from './styles/error';

/**
 * Formation logger service
 *
 * @constructor
 */
export default class FormationLoggerService {
    #logger = null;

    setLoggerClient = logger => {
        if (!logger || !(typeof logger === 'function' || typeof logger === 'object')) {
            throw new Error(`Logger client not provided.`);
        }

        if (typeof logger.error !== 'function') {
            throw new Error(`Logger client must at least implement 'error' method. Methods 'info' and 'warn' are optional but recommended.`);
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

    consoleError = (message = '', error) => {
        console.log(`%c${message}`, stylesError); // eslint-disable-line no-console
        if (error && typeof error.stack === 'string') {
            console.log(`%c${error.stack}`, stylesError); // eslint-disable-line no-console
        }
    };

    consoleWarn = message => {
        console.log(`%c${message}`, stylesWarn); // eslint-disable-line no-console
    };

    consoleInfo = message => {
        console.log(`%c${message}`, stylesInfo); // eslint-disable-line no-console
    };
}
