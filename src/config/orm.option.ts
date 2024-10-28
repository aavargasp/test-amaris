import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Pokemon } from 'src/modules/pokemon/entities/pokemon.entity';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'database',
  port: 3306,
  username: 'root',
  password: 'amaris',
  database: 'amaris',
  entities: [Pokemon],
  synchronize: true,
};

export default ormOptions;
