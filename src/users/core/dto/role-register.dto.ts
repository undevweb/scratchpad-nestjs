import {ApiProperty} from "@nestjs/swagger";
import {RolesEnum} from "../../../database/enums/roles.enum";

export class RoleRegisterDto {

    @ApiProperty({ enum: RolesEnum})
    readonly label: string;
}
