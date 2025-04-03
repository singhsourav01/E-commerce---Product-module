import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductImage } from "./productImage.entity";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    prodcut_id: string;

    @Column({ unique: true })
    prodcut_sku: string;

    @Column()
    prodcut_name: string;

    @Column("decimal", { precision: 10, scale: 2 })
    prodcut_price: number;

    @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
    images: ProductImage[];  // ✅ Ensure this is correctly defined
}
