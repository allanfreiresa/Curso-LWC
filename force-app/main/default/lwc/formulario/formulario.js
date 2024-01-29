import { LightningElement, api, track  } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveLeads from '@salesforce/apex/formularioController.saveLeads';
import getFieldsSets from '@salesforce/apex/formularioController.getFieldsSets';
export default class Formulario extends LightningElement {
    @track subLeads = [];

    fields; 
    valueLead = '';

    values = [];

    connectedCallback() {
        this.getfields();
        this.addSubLead();
    }
    
    async getfields() {
        const fieldsSets = await getFieldsSets();
        const updatedFields = [];
      
        fieldsSets.forEach(fieldSet => {
          fieldSet.forEach(field => {
            const fieldType = field.type;
      
            field.typeText = fieldType === 'String';
            field.typeSearch = fieldType === 'REFERENCE';
            field.typePicklist = fieldType === 'PICKLIST';
            field.typeTel = fieldType === 'PHONE';
            field.typeEmail = fieldType === 'EMAIL';
            field.typeUrl = fieldType === 'URL';
            field.typeNumber = fieldType === 'INTEGER' || fieldType === 'DOUBLE' || fieldType === 'CURRENCY';
            field.typeDate = fieldType === 'Date';
      
            if (fieldType === 'PICKLIST') {
                console.log(field.options);
                field.picklistValues = field.options.map(option => ({
                    label: option,
                    value: option
                }));
            }
      
            updatedFields.push(field);
          });
        });
      
        this.fields = [...updatedFields];
    }
      

    handleChange(e){
        this.values[e.target.name] = e.target.value;
    }
    
    addSubLead() {
        const newSubLead = {
          id: Date.now(),
          lead: '',
          name: '',
          age: ''
        };
        this.subLeads.push(newSubLead);
    }

    handleNameChange(event) {
    const index = event.target.dataset.index;
    this.subLeads[index].name = event.target.value;
    }

    handleAgeChange(event) {
    const index = event.target.dataset.index;
    this.subLeads[index].age = event.target.value;
    }

    handleDelete(event) {
    const index = event.target.dataset.index;
    this.subLeads.splice(index, 1);
    }

    saveLead(){
        this.insertLead();
    }

    async insertLead(){
        try{
            await saveLeads({ 
                formData : this.values
            });
        } catch (error) {
            console.log('Error creating lead: ' + error);
            this.setToast('Erro', 'Error creating lead', 'error');
        }
    }

    setToast( title, message, type){
        this.dispatchEvent(new ShowToastEvent({
            title : title,
            message : message,
            variant : type
        }));
    }
}