import { LightningElement } from 'lwc';

export default class Accordion extends LightningElement {

    serie = '';
    serieEscolhida = false;
    serieQueFoiEscolhida = '';
    a = false;
    b = false;
    c = false;

    get optionsSeries() {
        return [
            { label: 'Série 1', value: 'serie1' },
            { label: 'Série 2', value: 'serie2' },
            { label: 'Série 3', value: 'serie3' },
        ];
    }

    handleChange(e) {
        this[e.target.name] = e.detail.value;

        if(e.target.name === 'serie' && this.serie != ''){
            this.serieEscolhida = true;
            this.serieQueFoiEscolhida = this.serie;

            if(this.serie === 'serie1'){
                this.a = true;
            } else if(this.serie === 'serie2'){
                this.b = true;
            } else if(this.serie === 'serie3'){
                this.c = true;
            }
        } else {
            this.serieEscolhida = false;
        }
    }

    handleToggleSection(){}
}