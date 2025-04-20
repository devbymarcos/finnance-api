import { prisma } from "../../database/prismaClient.js";
import bcryptjs from "bcryptjs";

class User {
    private id!: number;
    private first_name!: string;
    private last_name!: string;
    private email!: string;
    private password!: string;
    private photo!: string;

    public setId(id: number) {
        this.id = id;
    }
    public setFirstName(first_name: string) {
        this.first_name = first_name;
    }
    public setLastName(last_name: string) {
        this.last_name = last_name;
    }
    public setEmail(email: string) {
        this.email = email;
    }
    public setPassword(password: string) {
        this.password = password;
    }
    public setPhoto(photo: string) {
        this.photo = photo;
    }
    public getId() {
        return this.id;
    }
    public getFirstName() {
        return this.first_name;
    }
    public getLastName() {
        return this.last_name;
    }
    public getEmail() {
        return this.email;
    }
    public getPassword() {
        return this.password;
    }
    public getPhoto() {
        return this.photo;
    }

    async findById() {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: this.id,
                },
            });

            if (user == null) return false;

            const data = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                photo: user.photo,
            };
            return data;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }

    async hasEmail() {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: this.email,
                },
            });

            if (!user) return false;
            return user;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }

    async register() {
        const existingUser = await this.hasEmail();

        if (!existingUser) {
            return false;
        }

        try {
            const userCreate = await prisma.users.create({
                data: {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: await this.cryptpass(),
                },
            });

            const data = {
                id: userCreate.id,
                first_name: userCreate.first_name,
                last_name: userCreate.last_name,
                email: userCreate.email,
                photo: userCreate.photo,
            };
            return data;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }
    async update() {
        try {
            const user = await prisma.users.update({
                where: {
                    id: this.id,
                },
                data: {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                },
            });
            const data = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                photo: user.photo,
            };
            return data;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }

    private async cryptpass() {
        const passwordCrypt = await bcryptjs.hash(this.password, 10);
        return passwordCrypt;
    }

    async updatePass() {
        try {
            const user = await prisma.users.update({
                where: {
                    id: this.id,
                },
                data: {
                    password: await this.cryptpass(),
                },
            });

            return true;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }
}

export default User;
