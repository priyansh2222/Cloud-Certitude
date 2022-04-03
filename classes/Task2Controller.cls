public with sharing class Task2Controller {
    @AuraEnabled(cacheable=true)
    public static List<objectData> getObjectNames(){
        List<objectData> ObjectDataObj = new List<objectData>();
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();  
        for(SObjectType sot:gd){
            objectData objectObj = new objectData();
            objectObj.label = sot.getDescribe().getLabel();
            objectObj.fieldName = sot.getDescribe().getName();
            objectDataObj.add(objectObj);
        }
        
        return objectDataObj;
    }
    @AuraEnabled(cacheable=true)
    public static List<ObjectData> getObjectField(string objectName){
        Map <String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        List<ObjectData> fieldsWrapperList = new List<ObjectData>();
        Map <String, Schema.SObjectField> fieldMap = schemaMap.get(objectName).getDescribe().fields.getMap();
        for(Schema.SObjectField sfield : fieldMap.Values()){
            ObjectData fieldObj = new ObjectData();
            schema.describefieldresult dfield = sfield.getDescribe();
            fieldObj.fieldName = dfield.getName();
            fieldObj.label = dfield.getLabel();
            fieldsWrapperList.add(fieldObj);
        }
      return fieldsWrapperList;
    }  
    @AuraEnabled(cacheable=true)
    public static list<SObject> getData(String obj,list<String> listOfFields,String startDate,String endDate){
        try {
            Set<String> fields = new Set<String>(listOfFields);
            listOfFields = new list<String>(fields);
            System.debug(startDate);
            System.debug(endDate);
            Date sDate = Date.newInstance(Integer.valueOf(startDate.substring(1,5)), Integer.valueOf(startDate.substring(6,8)), Integer.valueOf(startDate.substring(9,11)));
            Date eDate = Date.newInstance(Integer.valueOf(endDate.substring(1,5)), Integer.valueOf(endDate.substring(6,8)), Integer.valueOf(endDate.substring(9,11)));
            String query;
            System.debug(sdate +'  '+eDate);
             query = 'Select '+String.join(listOfFields,',')+' from '+obj+' where CreatedDate >=:sDate and CreatedDate <=:eDate';
            System.debug(query);
            return  database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    public class ObjectData{
        @AuraEnabled public String label;
        @AuraEnabled public String fieldName;
        
    }
}
