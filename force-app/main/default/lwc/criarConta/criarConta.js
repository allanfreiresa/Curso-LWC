import { LightningElement } from 'lwc';
import criarConta from '@salesforce/apex/CriarContas.criarConta';

export default class CriarConta extends LightningElement {
    conta = {};

    changeHandler(event){
        this.conta[event.target.name] = event.target.value;
    }

    handleClickSalvar(){
        if(this.conta){
            criarConta({ conta : this.conta });
        }
    }
}