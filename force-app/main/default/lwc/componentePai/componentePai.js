import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/ComponentePaiController.getAccount';
import getDadosEmpresas from '@salesforce/apex/ComponentePaiController.getDadosEmpresas';
export default class ComponentePai extends LightningElement {
    dadosPai;
    contas;
    connectedCallback(){
        this.pegarValoresEmpresa();
    }

    async pegarValoresEmpresa(){
        try{
            this.dadosPai =  await getDadosEmpresas();
            console.log('contas: ' + JSON.stringify(this.dadosPai));
        } catch(error){
            console.log('error: ' + JSON.stringify(error));
            this.setToast('Error', 'Não foi possivél carregar as contas', 'error');
        }
    }

    @wire(getAccount)
    conta({data, error}){
        if(data){
            this.contas =  data;
            console.log('contas: ' + JSON.stringify(this.contas));
        } else if(error){
            console.log('error: ' + JSON.stringify(error));
            this.setToast('Error', 'Não foi possivél carregar as contas', 'error');
        }
    }

    handleClickItemSelecionadaPai(e){
        console.log(JSON.stringify(e.detail.dado));
    }
}