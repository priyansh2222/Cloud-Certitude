import { api, LightningElement,track } from 'lwc';
import getAccount from '@salesforce/apex/cloneAccountController.getAccount';
export default class CloneAccount extends LightningElement {
    @api availableActions = [];
    @api recordId;
    @api accountRecordId;
    @track accountId;
    @track record ={Name:'',Type:'',BillingCity:'',BillingState:''};
    connectedCallback(){
        console.log(this.accountRecordId);
        getAccount({recordId:this.accountRecordId})
        .then(result=>{
            console.log(result);           
            this.record = result;
        })
    }
   
    @api validate(){
        if(this.accountId==null || this.accountId ==undefined)
        this.template.querySelector('lightning-record-edit-form').submit();
        console.log(this.accountId);
    }
    
    handleSuccess(event) {
        console.log('i am called');
        console.log(event.detail.id);
        this.accountId = event.detail.id;
    }
   
}