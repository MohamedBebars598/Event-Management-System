import { Speaker } from "./Speaker";
import { Student } from "./student";


export class EventSend {


    constructor(public title:string,public date:Date,public mainSpeaker:number,public otherSpeakers:number[],public students:number[]){

    }
}