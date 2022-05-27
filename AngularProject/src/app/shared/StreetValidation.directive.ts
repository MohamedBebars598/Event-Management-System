import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[StreetValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:StreetValidatorDirective,
        multi:true
    }]

})
export class StreetValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        const streetRegex = RegExp(
            /^[#.0-9a-zA-Z,-]+(\s)?[#.0-9a-zA-Z,-]+$/);
            console.log(streetRegex.test(control.value))

          return streetRegex.test(control.value)?null:{'invalidStreet':true};

        
    }

}