import { api, LightningElement } from 'lwc';

export default class OpenGoogle2 extends LightningElement {
    @api recordId;
    
    @api invoke(){
        console.log('id2',this.recordId);
        window.open('https://www.google.com/',"_blank");
    }
}