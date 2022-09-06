import {immerable, produce} from 'immer';
import persistenceStates from './persistenceStates';

/**
 * Property transformer callback definition
 *
 * @callback propertyTransformer
 * @param {any} value
 * @return {any}
 */

/**
 * EntityDTOMapping type definition
 *
 * @typedef {string|Object} EntityDTOProperty
 * @property {string} dtoProperty
 * @property {any} defaultValue
 * @property {?propertyTransformer} fromDTO - function for transforming property from DTO to entity object
 * @property {?propertyTransformer} toDTO - function for transforming property from entity object to DTO
 * @property {Entity} entity - Entity class for transforming nested entities
 * @property {boolean} isEntityArray - is property array of nested entities
 */

/**
 * Entity to DTO mapper
 *
 * @param {Object<string, any>} entityObject
 * @param {Object<string, EntityDTOProperty>} entityDTOMapping
 * @param {boolean} isFromRawObject
 */
export const mapPropertiesFromEntityObjectToDTO = function mapPropertiesFromEntityObjectToDTO(
    entityObject,
    entityDTOMapping,
    isFromRawObject = false,
) {
    const mappedDTOProperties = {};

    for (const [entityKey, entityMapper] of Object.entries(entityDTOMapping)) {
        const dtoProperty = typeof entityMapper === 'string' ? entityMapper
            : (typeof entityMapper === 'object' && typeof entityMapper.dtoProperty === 'string'
                ? entityMapper.dtoProperty : null);

        // skip if property key not set in mapper
        // or entity object doesn't have that key
        if (!dtoProperty || typeof entityObject[entityKey] === 'undefined') continue;

        // when Entity is set in mapper use it to generate DTO from entity object
        // but over-ride Entity's methods if `toDTO` is set in mapper
        let propertyTransformer = value => value;

        if (typeof entityMapper === 'object' && typeof entityMapper.entity === 'function') {
            const Entity = entityMapper.entity;
            const entityPropertyTransformer = nestedEntityObject => {
                if (!nestedEntityObject) return null;

                if (!isFromRawObject && typeof nestedEntityObject.toDTO === 'function') {
                    return nestedEntityObject.toDTO();
                }

                if (isFromRawObject) {
                    return Entity.objectToDTO(nestedEntityObject, isFromRawObject);
                }

                return null;
            };

            propertyTransformer = !entityMapper.isEntityArray
                ? entityPropertyTransformer
                : (nestedEntityObjects => (nestedEntityObjects && Array.isArray(nestedEntityObjects)
                    ? nestedEntityObjects.map(entityPropertyTransformer) : []));
        }

        if (typeof entityMapper === 'object' && typeof entityMapper.toDTO === 'function') {
            propertyTransformer = (entityObjectProperty, entityObject) => {
                return entityMapper.toDTO(entityObjectProperty, entityObject);
            };
        }

        // map DTO properties if all set
        mappedDTOProperties[dtoProperty] = propertyTransformer(entityObject[entityKey], entityObject);
    }

    return mappedDTOProperties;
};

export const mapPropertiesFromEntityObjectToPatchDTO = function mapPropertiesFromEntityObjectToPatchDTO(
    entityObject,
    entityDTOMapping,
    isFromRawObject = false,
) {
    const mappedDTOProperties = {};

    for (const [entityKey, entityMapper] of Object.entries(entityDTOMapping)) {
        const dtoProperty = typeof entityMapper === 'string' ? entityMapper
            : (typeof entityMapper === 'object' && typeof entityMapper.dtoProperty === 'string'
                ? entityMapper.dtoProperty : null);

        // skip if property key not set in mapper
        // or entity object doesn't have that key
        if (!dtoProperty || typeof entityObject[entityKey] === 'undefined') continue;

        // when Entity is set in mapper use it to generate patchDTO from entity object
        // over-ride Entity's methods if `toPatchDTO` is set in mapper
        let propertyTransformer = value => {
            return {
                value: value,
            };
        };

        if (typeof entityMapper === 'object' && typeof entityMapper.entity === 'function') {
            const Entity = entityMapper.entity;

            // if nested entity was not updated, skip (do not send null value)
            if (typeof entityObject[entityKey] !== 'object') continue;

            // TODO flag `useProperPatch` is temporary until all nested entities apply correct PATCH wrapper format
            const entityPropertyTransformer = nestedEntityObject => {
                if (!nestedEntityObject) return entityMapper.useProperPatch ? {value: null} : null;

                if (!isFromRawObject && typeof nestedEntityObject.toPatchDTO === 'function') {
                    return entityMapper.useProperPatch ? {value: nestedEntityObject.toPatchDTO()}
                        : nestedEntityObject.toPatchDTO();
                }

                if (isFromRawObject) {
                    return entityMapper.useProperPatch
                        ? {value: Entity.objectToPatchDTO(nestedEntityObject, isFromRawObject)}
                        : Entity.objectToPatchDTO(nestedEntityObject, isFromRawObject);
                }

                return entityMapper.useProperPatch ? {value: null} : null;
            };

            propertyTransformer = !entityMapper.isEntityArray
                ? entityPropertyTransformer
                : (nestedEntityObjects => (nestedEntityObjects && Array.isArray(nestedEntityObjects)
                    ? nestedEntityObjects.map(entityPropertyTransformer) : []));
        }

        if (typeof entityMapper === 'object' && typeof entityMapper.toPatchDTO === 'function') {
            propertyTransformer = (entityObjectProperty, entityObject) => {
                return entityMapper.toPatchDTO(entityObjectProperty, entityObject);
            };
        }

        // map DTO properties if all set
        mappedDTOProperties[dtoProperty] = propertyTransformer(entityObject[entityKey], entityObject);
    }

    return mappedDTOProperties;
};

/**
 * Entity type definition
 *
 * @typedef {Object} Entity
 * @property {Object<string, EntityDTOProperty>} entityDTOMapping
 * @property {persistenceState} persistenceState
 */

/**
 * Entity class
 *
 * @type {Entity}
 */
export default class Entity {
    [immerable] = true;

    /**
     * @static
     */
    static entityDTOMapping = {};

    persistenceState = persistenceStates.READY;

    initialize(rawObject = {}) {
        Object.keys(this.constructor.entityDTOMapping).forEach(key => {
            this[key] = typeof rawObject[key] !== 'undefined' ? rawObject[key] : null;

            const entityMapper = this.constructor.entityDTOMapping[key];
            if (this[key] === null
                && typeof entityMapper === 'object'
                && typeof entityMapper.defaultValue !== 'undefined') {
                this[key] = entityMapper.defaultValue;
            }
        });
    }

    setPersistenceState(persistenceState = persistenceStates.UNKNOWN) {
        return produce(this, draft => {
            draft.persistenceState = persistenceState;
        });
    }

    fromDTO(dataTransferObject = {}) {
        return produce(this, draft => {
            for (const [entityKey, entityMapper] of Object.entries(this.constructor.entityDTOMapping)) {
                let dtoProperty = typeof entityMapper === 'string' ? entityMapper : null;
                if (typeof entityMapper === 'object'
                    && typeof entityMapper.dtoProperty === 'string') dtoProperty = entityMapper.dtoProperty;
                if (typeof entityMapper === 'object'
                    && typeof entityMapper.customProperty === 'string') dtoProperty = entityMapper.customProperty;

                const defaultValue = typeof entityMapper === 'object'
                    && typeof entityMapper.defaultValue !== 'undefined'
                    ? entityMapper.defaultValue : null;

                // skip if property key not set in mapper
                if (!dtoProperty) continue;

                // when Entity is set in mapper use it to transform DTO into entity object or to update existing one,
                // but over-ride Entity's methods if `fromDTO` is set in mapper
                let propertyTransformer = value => (typeof value !== 'undefined' && value !== null
                    ? value : defaultValue);

                if (typeof entityMapper === 'object' && typeof entityMapper.entity === 'function') {
                    const Entity = entityMapper.entity;
                    const entityPropertyTransformer = entityDTO => {
                        const getDefaultEntityValue = value => (typeof value !== 'undefined' && value !== null
                            ? value : defaultValue);

                        if (draft[entityKey]
                            && typeof draft[entityKey] === 'object'
                            && typeof draft[entityKey].fromDTO === 'function') {
                            return typeof entityDTO === 'object' && entityDTO !== null
                                ? draft[entityKey].fromDTO(entityDTO) : getDefaultEntityValue(entityDTO);
                        }

                        return typeof entityDTO === 'object' && entityDTO !== null
                            ? new Entity().fromDTO(entityDTO) : getDefaultEntityValue(entityDTO);
                    };

                    propertyTransformer = !entityMapper.isEntityArray
                        ? entityPropertyTransformer
                        : (entityDTOs => (entityDTOs && Array.isArray(entityDTOs)
                            ? entityDTOs.map(entityPropertyTransformer) : []));
                }

                if (typeof entityMapper === 'object' && typeof entityMapper.fromDTO === 'function') {
                    propertyTransformer = (dataTransferObjectProperty, dataTransferObject) => {
                        return entityMapper.fromDTO(dataTransferObjectProperty, dataTransferObject);
                    };
                }

                // update draft if all set
                draft[entityKey] = propertyTransformer(dataTransferObject[dtoProperty], dataTransferObject);
            }
        });
    }

    toDTO() {
        return mapPropertiesFromEntityObjectToDTO(this, this.constructor.entityDTOMapping);
    }

    /**
     * @static
     */
    static objectToDTO(rawObject = {}, isFromRawObject = true) {
        return mapPropertiesFromEntityObjectToDTO(rawObject, this.entityDTOMapping, isFromRawObject);
    }

    toPatchDTO() {
        return mapPropertiesFromEntityObjectToPatchDTO(this, this.constructor.entityDTOMapping);
    }

    /**
     * @static
     */
    static objectToPatchDTO(rawObject = {}, isFromRawObject = true) {
        return mapPropertiesFromEntityObjectToPatchDTO(rawObject, this.entityDTOMapping, isFromRawObject);
    }
}
