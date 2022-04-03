import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/taskController.getAccounts';
import getContacts from '@salesforce/apex/taskController.getContacts';
export default class Task extends LightningElement {
    @track searchAccount;
    @track accountRecords;
    @track selectedId;
    @track contactRecords;
    @track draftValues;
    rowOffset = 0;
    contactCols =[
        {label:'Id',fieldName:'Id'},
        {label:'FirstName',fieldName:'FirstName'},
    ]
    changeHandler(event){
        this.searchAccount = event.target.value;
        getAccounts({name:this.searchAccount})
        .then(result => {
            this.accountRecords = result;
        })       
    }
    handleRowAction(event){
        console.log('i am called');
        console.log(event.target.value);
        console.log('ha');
        console.log(this.accountRecords);
        console.log(this.accountRecords[0].Id);
        this.selectedId = this.accountRecords[event.target.value].Id;
        console.log(this.selectedId);
        getContacts({idValue:this.selectedId})
            .then(result => {
                console.log(result);
                this.contactRecords = result;
                console.log(this.contactRecords);
            })
    }
    async handleSave( event ) {

        const updatedFields = event.detail.draftValues;
            console.log(updatedFields);
    }
}