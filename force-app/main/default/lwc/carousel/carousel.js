import { LightningElement, api } from 'lwc';

export default class Carrossel extends LightningElement {
    @api dados;
    pagina = 0;
    paginaSelecionada;

    connectedCallback(){
    }
    get posicao(){
        return `transform:translateX(-${this.pagina * 100}%);`;
    }

    get botaoRetorno(){
        return this.pagina === 0;
    }

    get botaoAvanca(){
        return this.pagina === this.dados.length -1;
    }

    get slideJs(){
        return this.paginaSelecionada == this.pagina ? 'slide slideSelecionada' : 'slide';
    }

    previousSlide(){
        if(this.pagina > 0){
            this.pagina -= 1;
        }
    }
    nextSlide(){
        if(this.pagina < this.dados.length -1 ){
            this.pagina += 1;
        }
    }

    mudarvalor(e){
        this.dados = JSON.parse(JSON.stringify(this.dados));
        this.dados[e.target.dataset.index].empresa = e.target.value
    }

    handleClickItemSelecionada(){
        this.paginaSelecionada = this.pagina;
        const selecionado = new CustomEvent('passavalor',{
            detail : {
                dado : this.dados[this.pagina],
            }
        });
        this.dispatchEvent(selecionado);
    }
}