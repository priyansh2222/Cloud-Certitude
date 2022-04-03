public with sharing class FilePreviewAndDownloadController {
    public FilePreviewAndDownloadController() {

    }
    @AuraEnabled
    public static list<sObject> getDocumentsByRecordId(String recordId){
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<ID> fileIDs = new List<ID>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }
 
        List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension, Title,ContentDocument.CreatedBy.Name, ContentDocument.ContentSize 
            FROM ContentVersion WHERE ContentDocumentId IN : fileIDs];
        return docs;
    }
    @AuraEnabled
    public static string DeleteFile(String recordId){
        try {
            Database.delete(recordId);
            return 'success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
