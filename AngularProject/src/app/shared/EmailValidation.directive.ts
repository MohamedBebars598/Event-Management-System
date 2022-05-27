import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[EmailValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:EmailValidatorDirective,
        multi:true
    }]

})
export class EmailValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        console.log("ssss")
        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            );
            console.log(emailRegex.test(control.value))

          return emailRegex.test(control.value)?null:{'invalidEmail':true};

        
    }

}