import { LightningElement,api,track } from 'lwc';
import getDocumentsByRecordId from '@salesforce/apex/FilePreviewAndDownloadController.getDocumentsByRecordId';
import DeleteFile from '@salesforce/apex/FilePreviewAndDownloadController.DeleteFile';
export default class FilePreviewAndDownload extends LightningElement {
@api recordId;
@track data=[];
@api accept = '.csv,.doc,.xsl,.pdf,.png,.jpg,.jpeg,.docx,.doc';
@track fileData =[];
    connectedCallback(){
       this.refreshData();
    }
    deleteHandler(event){
        console.log(event.target.dataset.id);
        DeleteFile({recordId:event.target.dataset.id})
        .then(result =>{
            console.log(result);
            this.refreshData();
        })
       
    }
    refreshData(){
        getDocumentsByRecordId({recordId:this.recordId})
        
        .then(result => {
            this.fileData=[];
            this.data = result;
            console.log(this.data);
           for(var i=0;i<this.data.length;i++){
               console.log(this.data[i].Title);
               console.log(this.data[i].ContentDocumentId);
               console.log({title:this.data[i].Title,url:"/sfc/servlet.shepherd/document/download/"+this.data[i].ContentDocumentId});
               this.fileData.push({title:this.data[i].Title,url:"/sfc/servlet.shepherd/document/download/"+this.data[i].ContentDocumentId,Id:this.data[i].ContentDocumentId,size:parseInt(this.data[i].ContentDocument.ContentSize)/1000,extention:this.data[i].FileExtension});
           }
        })
    }
    handleUploadFinished(event){
        this.refreshData();
    }
}