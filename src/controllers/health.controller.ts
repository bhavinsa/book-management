'use strict';

import { GET, Path } from 'typescript-rest';

@Path('/health')
export class HealthController {
    @GET
    public serverIsUp(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('Server is up!');
        });
    }
}
