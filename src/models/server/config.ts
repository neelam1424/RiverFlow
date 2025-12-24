import env from "@/app/env";

import { Client, Avatars,Databases,Storage , Users} from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey!);

     const databases = new Databases(client);
        const users = new Users(client);
        const avatars = new Avatars(client);
        const storage = new Storage(client);
    
    export {client, databases,avatars,storage,users}
   