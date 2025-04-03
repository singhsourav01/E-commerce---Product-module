import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity("product_images")
export class ProductImage {
    @PrimaryGeneratedColumn("uuid")
    prodcut_image_id: string;

    @Column()
    prodcut_image_url: string;

    @ManyToOne(() => Product, (product) => product.images, { onDelete: "CASCADE" })
    product: Product;
}
