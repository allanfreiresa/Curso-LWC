import { LightningElement, api } from 'lwc';

export default class EditarContato extends LightningElement {
    @api recordId;

    handleContact(){
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if(inputFields){
            inputFields.forEach(
                field => {
                    field.reset();
                }
            );
        }
    }
}