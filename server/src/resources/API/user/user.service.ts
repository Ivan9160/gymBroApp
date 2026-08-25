import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { AuthService } from "src/auth/auth.service";

export interface CreateUserResult {
    accessToken: string;
    user: Awaited<ReturnType<UserService["findById"]>>;
}

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService
    ) {}

    findAll() {
        return this.prisma.user.findMany();
    }

    /**
     * Registration and profile setup in one call — no auth0Id,
     * no separate anonymous step. The account only starts existing
     * once someone actually fills the form, exactly like today,
     * just without a third-party identity provider involved.
     */
    async create(dto: CreateUserDto): Promise<CreateUserResult> {
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                userProfile: {
                    create: {
                        age: dto.age,
                        gender: dto.gender,
                        height: dto.height,
                        weight: dto.weight,
                        goal: dto.goal,
                    },
                },
            },
            include: {
                userProfile: true,
            },
        });

        const accessToken = this.authService.signAccessToken(user.id);

        return { accessToken, user };
    }

    /**
     * `id` must come from the validated JWT (req.user.id in the
     * controller), never from a client-supplied route param or
     * body field — otherwise anyone could edit anyone else's
     * profile just by changing a number in the URL.
     */
    update(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: {
                name: dto.name,
                userProfile: {
                    update: {
                        data: {
                            age: dto.age,
                            gender: dto.gender,
                            height: dto.height,
                            weight: dto.weight,
                            goal: dto.goal,
                        },
                    },
                },
            },
        });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                userProfile: true,
            },
        });
    }
}