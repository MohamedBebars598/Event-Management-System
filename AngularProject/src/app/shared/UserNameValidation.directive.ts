import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[UserNameValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:UserNameValidatorDirective,
        multi:true
    }]

})
export class UserNameValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        const userNameRegex = RegExp(
            /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/);
            console.log(userNameRegex.test(control.value))

          return userNameRegex.test(control.value)?null:{'invalidUserName':true};

        
    }

}