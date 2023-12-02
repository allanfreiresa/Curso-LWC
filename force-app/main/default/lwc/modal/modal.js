import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class Modal extends LightningModal {
    @api content;
    @api options = [];

    handleOkay(){
        this.disableClose = false;
        this.close('fechou');
    }

    handleOptionClick(e) {
        const { target } = e;
        const { id, value } = target.dataset;
        this.disableClose = false;
        this.close(value);
      }
}