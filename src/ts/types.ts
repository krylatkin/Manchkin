///<reference path='char.ts'/>
module App {
    export interface IItem {
        id: string;
        name: string;
        power: number;
        gold?: number;
        condition?(char:Char): boolean;
        slot?: string;
        big?: boolean;
    }

    export interface IMonster {
        id: string;
        name: string;
        level: number;
        win: any;
        lose(char): any;
        conditionalPower?(char:Char): number;
        canRun?(char:Char): number;
    }
}