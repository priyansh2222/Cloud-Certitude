import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/CustomLookupController.getAccounts'; 
export default class CustomLookup extends LightningElement {
    @track inputValue;
    @track records;
    @track selectedAccountId ;
    cols =[
        {label:'Id',fieldName :'Id'},
        {label:'Name',fieldName:'Name'}
    ]
    changeHandler(event){
        this.inputValue = event.target.value;
        if(this.inputValue !==''){
        getAccounts({name:this.inputValue})
        .then(result =>{
            this.records = result;
        })
    }
    }
    selectAccount(event){
        this.inputValue = this.records[event.target.value].Name;
        this.selectedAccountId = this.records[event.target.value].Id;
        console.log(this.selectedAccountId);
    }
}