import { EventBus, useComponent } from "@odoo/owl";

export class Model {
    /**
     * @param {Object} env
     * @param {Object} options
     */
    constructor(env, params, options) {
        this.env = env;
        this.orm = options.orm;
        this.rpc = options.rpc;
        this.bus = new EventBus();
        this.setup(params, options);
    }

    /**
     * @param {Object} params
     * @param {Object} options
     */
    setup(/* params, options */) {}

    /**
     * @param {SearchParams} searchParams
     */
    async load(/* searchParams */) {}

    /**
     * This function is meant to be overriden by models that want to implement
     * the sample data feature. It should return true iff the last loaded state
     * actually contains data. If not, another load will be done (if the sample
     * feature is enabled) with the orm service substituted by another using the
     * SampleServer, to have sample data to display instead of an empty screen.
     *
     * @returns {boolean}
     */
    hasData() {
        return true;
    }

    /**
     * This function is meant to be overriden by models that want to combine
     * sample data with real groups that exist on the server.
     *
     * @returns {boolean}
     */
    getGroups() {
        return null;
    }

    notify() {
        this.bus.trigger("update");
    }
}

/**
 * @template {typeof Model} T
 * @param {T} ModelClass
 * @param {Object} params
 * @param {Object} [options]
 * @param {Function} [options.beforeFirstLoad]
 * @returns {InstanceType<T>}
 */
export function useModel(ModelClass, params = {}, options = {}) {
    const component = useComponent();
    const model = new ModelClass(component.env, params, { orm: component.env.orm, rpc: component.env.rpc });
    return model;
}
