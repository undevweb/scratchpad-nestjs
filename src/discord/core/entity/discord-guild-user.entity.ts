import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuild} from "./discord-guild.entity";
import {DiscordRole} from "./discord-role.entity";
import {SocialDiscord} from "../../../users/core/entity/social-discord.entity";

@Entity()
export class DiscordGuildUser {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    permissions?: string;

    @Column({default: false})
    isOwner?: boolean;

    @ManyToOne(type => DiscordGuild, discordGuild => discordGuild.discordGuildUsers, {
        primary: true
    })
    discordGuild?: DiscordGuild;

    @ManyToOne(type => SocialDiscord, socialDiscord => socialDiscord.discordGuildUsers, {
        primary: true,
        eager: true
    })
    socialDiscord?: SocialDiscord;

    @ManyToMany(type => DiscordRole, discordRole => discordRole.discordGuildUsers, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    discordRoles?: DiscordRole[];

}