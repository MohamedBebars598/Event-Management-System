// "_id": 3,
// "title": "pollution",
// "date": "1998-05-31T21:00:00.000Z",
// "mainSpeaker": null,
// "otherSpeakers": [],
// "students": [

import { Speaker } from "./Speaker";
import { Student } from "./student";


export class Event {


    constructor(public _id:number,public title:string,public date:Date,public mainSpeaker:Speaker,public otherSpeakers:Speaker[],public students:Student[]){

    }
}