import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    nomeCompleto = '';
    idade = '';
    estudante = false;
    serie = '';
    sexoSelecionado;
    sexo = false;
    clickedButtoMostrarNome = '';

    mapMarkers = [];
    pais;
    zoomLevel = 4;
    
    changeHandlerPais(event){
        this.pais = event.target.value;
    }

    handleClickbuscarMap(event){
        if(this.pais){
            this.mapMarkers = [
                {
                    location:{
                        Country: this.pais,
                    },
                },
            ];
        }
    }


    get optionsSexos() {
        return [
            { label: 'Masculino', value: 'masculino' },
            { label: 'Feminino', value: 'feminino' },
        ];
    }

    changeHandlerSexo(event){
        this.sexoSelecionado = event.target.value;
        if(this.sexoSelecionado ==  'masculino'){
            this.sexo = true;
        } else {
            this.sexo = false;
        }
    }

    changeHandler(event) {
        this[event.target.name] = event.target.value;
    }

    changeHandlerChecked(event) {
        this[event.target.name] = event.target.checked;
        if(event.target.name == 'estudante' && !this.estudante) this.serie = '';
    }

    handleClickSalvar(event) {
        if(this.clickedButtoMostrarNome != ''){
            this.clickedButtoMostrarNome = '';
        } else {
            this.clickedButtoMostrarNome = this.nomeCompleto;
        }
    }

    handleClickLimpaCampos(event) {
        this.nomeCompleto = '';
        this.idade = '';
        this.estudante = false;
        this.serie = '';
        this.clickedButtoMostrarNome = '';
    }

    get optionsSeries() {
        return [
            { label: 'Série 1', value: 'serie1' },
            { label: 'Série 2', value: 'serie2' },
            { label: 'Série 3', value: 'serie3' },
        ];
    }

    handleChangeSerie(event) {
        this.serie = event.detail.value;
    }
}