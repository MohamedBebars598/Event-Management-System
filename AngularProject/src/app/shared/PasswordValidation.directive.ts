import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[PasswordValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:PasswordValidatorDirective,
        multi:true
    }]

})
export class PasswordValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        const passRegex = RegExp(
            /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
            console.log(passRegex.test(control.value))

          return passRegex.test(control.value)?null:{'invalidPassword':true};

        
    }

}