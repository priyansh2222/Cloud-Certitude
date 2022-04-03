import { LightningElement,api} from 'lwc';

export default class OpenGoogle extends LightningElement {
       @api recordId;
         @api invoke(){
             console.log('invoked ',this.recordId);
         }


}