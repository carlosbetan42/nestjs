const config: any = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
  keepConnectionAlive: true,
  autoLoadEntities: false,
};

export = config;
