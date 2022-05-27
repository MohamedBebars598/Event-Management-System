import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[BuldingNumberValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:BuildingNumberValidatorDirective,
        multi:true
    }]

})
export class BuildingNumberValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        const BuildingRegex = RegExp(
            /[0-9]/);
            console.log(BuildingRegex.test(control.value))

          return BuildingRegex.test(control.value)?null:{'invalidBuildingNumber':true};

        
    }

}