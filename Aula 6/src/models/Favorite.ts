import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Dish } from "./Dish";

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.$favorites)
    user!: User;

    @ManyToOne(() => Dish, (dish) => dish.$favorites)
    dish!: Dish;

    @CreateDateColumn()
    favoritedAt!: Date; 
}
