import { App } from './../app';
import { AppManagerInterface } from './app-manager-interface';
import { ArrayAppManager } from './array-app-manager';
import { Log } from '../log';
import { Server } from '../server';

/**
 * Class that controls the key/value data store.
 */
export class AppManager implements AppManagerInterface {
    /**
     * The application manager driver.
     */
    protected driver: AppManagerInterface;

    /**
     * Create a new database instance.
     */
    constructor(protected server: Server) {
        if (server.options.appManager.driver === 'array') {
            this.driver = new ArrayAppManager(server);
        } else {
            Log.error('Clients driver not set.');
        }
    }

    /**
     * Find an app by given ID.
     */
    findById(id: string): Promise<App|null> {
        return this.driver.findById(id);
    }

    /**
     * Find an app by given key.
     */
    findByKey(key: string): Promise<App|null> {
        return this.driver.findByKey(key);
    }
}