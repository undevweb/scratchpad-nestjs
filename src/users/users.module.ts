import {Module} from '@nestjs/common';
import {UsersService} from "./local/users.service";
import {GoogleController} from "./google/google.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./core/entity/user.entity";
import {UserRepository} from "./core/repository/user.repository";
import {Role} from "./core/entity/role.entity";
import {LocalStrategy} from "./auth/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./auth/jwt.strategy";
import {GoogleStrategy} from "./google/google.strategy";
import {GoogleService} from "./google/google.service";
import {AppGateway} from "../app.gateway";
import {UserController} from "./local/user.controller";
import {RoleRepository} from "./core/repository/role.repository";
import {EncrDecrService} from "./local/enc-decr.service";
import {DiscordStrategy} from "./discord/discord.strategy";
import {DiscordUserService} from "./discord/discord-user.service";
import {DiscordController} from "./discord/discord.controller";
import {DiscordGuild} from "./core/entity/discord-guild.entity";
import {DiscordGuildRepository} from "./core/repository/discord-guild.repository";
import {DiscordGuildUser} from "./core/entity/discord-guild-user.entity";
import {DiscordGuildUserRepository} from "./core/repository/discord-guild-user.repository";
import {DiscordRole} from "./core/entity/discord-role.entity";
import {DiscordRoleRepository} from "./core/repository/discord-role.repository";
import {DiscordCdn} from "./discord/discord-cdn.service";
import {DiscordGuildsController} from "./discord/discord-guild.controller";
import {AuthService} from "./local/auth.service";
import {SocialDiscord} from "./core/entity/social-discord.entity";
import {SocialDiscordRepository} from "./core/repository/social-discord.repository";
import {SocialGoogleRepository} from "./core/repository/social-google.repository";
import {SocialGoogle} from "./core/entity/social-google.entity";
import {SocialLocal} from "./core/entity/social-local.entity";
import {SocialLocalRepository} from "./core/repository/social-local.repository";
import {AdminController} from "./admin/admin.controller";
import {LocalController} from "./local/local.controller";
import {SocialGenerated} from "./core/entity/social-generated.entity";
import {SocialGeneratedRepository} from "./core/repository/social-generated.repository";
import {SocialGeneratedController} from "./generated/social-generated.controller";

@Module({
    providers: [
        AppGateway,
        JwtStrategy,
        LocalStrategy, UsersService,
        GoogleStrategy, GoogleService,
        DiscordStrategy, DiscordUserService,
        DiscordCdn,
        AuthService,
        EncrDecrService
    ],
    imports: [
        TypeOrmModule.forFeature([
            User, UserRepository,
            SocialDiscord, SocialDiscordRepository,
            SocialGoogle, SocialGoogleRepository,
            SocialLocal, SocialLocalRepository,
            SocialGenerated, SocialGeneratedRepository,
            Role, RoleRepository,
            DiscordGuild, DiscordGuildRepository,
            DiscordGuildUser, DiscordGuildUserRepository,
            DiscordRole, DiscordRoleRepository
        ]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_KEY_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRES_IN || '600s'},
        }),
    ],
    exports: [UsersService, EncrDecrService, DiscordUserService],
    controllers: [
        AdminController,
        GoogleController,
        DiscordController,
        DiscordGuildsController,
        LocalController,
        SocialGeneratedController,
        UserController
    ]
})
export class UsersModule {
}
