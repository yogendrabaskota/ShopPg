import { Table,Column,Model,DataType } from "sequelize-typescript";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true
})

class User extends Model<User> {
    @Column({
        primaryKey : true,
        type: DataType.UUID,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
        unique: true 
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.ENUM('admin', 'customer'),
        defaultValue: 'customer',
    })
    declare role: string;
}

export default User