import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName : 'products',
    modelName : 'Product',
    timestamps : true
})

class Product extends Model {

    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4,
        allowNull : false
    })
    declare id : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    declare productName : string


    @Column({
        type : DataType.TEXT
    })
    declare productDescription : string

    @Column({
        type : DataType.FLOAT
    })
    declare productPrice : number

    @Column({
        type : DataType.INTEGER
    })
    declare discount : number

    @Column({
        type : DataType.STRING
    })
    declare productImageUrl : string


    @Column({
        type : DataType.STRING
    })
    declare name : string






}

export default Product 