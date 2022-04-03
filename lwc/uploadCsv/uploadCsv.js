import { LightningElement,api,track } from 'lwc';
import csvFileRead from '@salesforce/apex/uploadCsvController.csvFileRead';
import insertAccounts from '@salesforce/apex/uploadCsvController.insertAccounts';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import replaceFile from '@salesforce/apex/uploadCsvController.replaceFile';
export default class UploadCsv extends LightningElement {

 @track columnsAccount = [
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'Source', fieldName: 'AccountSource' },
    { label: 'Account Site', fieldName: 'Site'}, 
    { label: 'Type', fieldName: 'Type'}, 
    { label: 'Website', fieldName: 'Website', type:'url'}
];
    @api recordId;
    @track error;
    @track isFile=false;
    @track data;
    @track fileId;

    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;
        console.log(uploadedFiles);
        this.fileId = uploadedFiles[0].documentId;
        // calling apex class csvFileread method
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        .then(result => {
            this.isFile = true;
            window.console.log('result ===> '+JSON.stringify(result));
            this.data = result;       
        })        
    }
    insertAccountHandler(event){
        insertAccounts({str:JSON.stringify(this.data)})
        .then(result=>{
            console.log(result);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Accounts are created according to the CSV file upload!!!',
                    variant: 'Success',
                }),
            );
        })
    }
    replaceHandler(event){
        replaceFile({recordId:this.fileId})
        .then(result=>{
            console.log(result);
            this.isFile = false;
            this.data = [];
        })
    }
}
