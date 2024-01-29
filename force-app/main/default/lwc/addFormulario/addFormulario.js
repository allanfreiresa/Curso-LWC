import { LightningElement, track } from 'lwc';
import criarConta from '@salesforce/apex/CriarContas.criarContas';

export default class AddFormulario extends LightningElement {
    @track formularios = [];
    
    handleChange(e){
        const index = e.target.dataset.index;
        this.formularios[index][e.target.name] = e.target.value;
    }

    handleDeleteFormulário(e){
        const index = e.target.dataset.index;
        this.formularios.splice(index, 1);
    }

    addFormulario(){
        const newFormulario = {
            id : Date.now(),
            Name : '',
            Idade__c : 0
        };

        this.formularios.push(newFormulario);
    }

    handleClickSalvar(){
        if(this.formularios){
            criarConta({contas : this.formularios});
        }
    }
}