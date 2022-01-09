import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

export class PostgresTypeormConfiguration implements TypeOrmOptionsFactory
{
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const TypeOrmOptions:TypeOrmModuleOptions=
        {
            type:'postgres',
            username:'postgres',
            password:'3231530',
            host:'localhost',
            port:5432,
            autoLoadEntities:true,
            database:'productmanagement',
            synchronize:true
        }
        return TypeOrmOptions
    }
}