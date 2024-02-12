import dotenv from 'dotenv';
import 'module-alias/register';
dotenv.config();
import { application } from './Application';
import { createDependencyContainer } from '@configuration';

class Server {
    public async runServer(): Promise<void> {
        const port = process.env.PORT || 8080;
        try {
            const server = await application.listen(port, '0.0.0.0');
            application.swagger();
            createDependencyContainer();
            application.swagger();
            console.log(`Application running on ${server}`);
        } catch (error) {
            console.error(error);
            await application.close();
        }
    }
}

export default new Server().runServer();
