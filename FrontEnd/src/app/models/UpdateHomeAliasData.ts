export class UpdateHomeAliasData
{
    alias: string | undefined;
    homeId: number | undefined;

    constructor(alias: string, homeId: number) {
        this.alias = alias;
        this.homeId = homeId;
    }
}