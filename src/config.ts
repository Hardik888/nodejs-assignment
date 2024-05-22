import { CorsOptions } from "cors";
import { HelmetOptions } from "helmet";
import { config } from "dotenv";
config();

type Config = {
  promiseConcurrency: number;
  mongo: {
    appName?: string;
    connectionString?: string;
    database?: string;
  };
  express: {
    port: number;
    cors?: CorsOptions;
    helmet?: HelmetOptions;
    jwt: {
      secret: string;
    };
  };
};

const configService: Config = {
  promiseConcurrency: 5,
  mongo: {
    appName: process.env.appName,
    connectionString: process.env.connectionString!,
    database: process.env.database,
  },
  express: {
    port: 5001,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    helmet: {
      contentSecurityPolicy: false,
      xXssProtection: true,
    },
    jwt: {
      secret: "cyber_cat",
    },
  },
};

export default configService;
