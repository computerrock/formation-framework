import {datadogLogs} from '@datadog/browser-logs';
import {datadogRum} from '@datadog/browser-rum';

/**
 * Datadog logger client
 *
 * @constructor
 */
export default class DatadogLoggerClient {
    /**
     * @param {Object} serviceParameters
     * @returns {Object}
     */
    constructor(serviceParameters = {}) {
        const {options = {}} = serviceParameters;

        datadogLogs.init({
            clientToken: serviceParameters.clientToken || '',
            service: serviceParameters.service || '',
            ...(!!options.env && {env: options.env}),
            ...(!!options.version && {version: options.version}),
            site: options.site || 'datadoghq.eu',
            sampleRate: options.site || 100,
            forwardErrorsToLogs: typeof options.forwardErrorsToLogs === 'boolean' ? options.forwardErrorsToLogs : true,
            ...options,
        });

        datadogRum.init({
            applicationId: serviceParameters.applicationId || '',
            clientToken: serviceParameters.clientToken || '',
            service: serviceParameters.service || '',
            ...(!!options.env && {env: options.env}),
            ...(!!options.version && {version: options.version}),
            site: options.site || 'datadoghq.eu',
            sampleRate: options.site || 100,
            trackInteractions: typeof options.trackInteractions === 'boolean' ? options.trackInteractions : true,
            ...options,
        });

        this.#logger = datadogLogs.logger;
    }

    #logger = null;

    error = (message, messageContext) => this.#logger.error(message, messageContext);
    warn = (message, messageContext) => this.#logger.warn(message, messageContext);
    info = (message, messageContext) => this.#logger.info(message, messageContext);
}
