public with sharing class CustomLookupController {
    
    @AuraEnabled(cacheable =true)
    public static List<Account> getAccounts(String name){
        name = '%'+name +'%';
        try {
            if(Account.sObjectType.getDescribe().isAccessible() ){
                return [Select id , Name from Account where Name like : name];
            }
            return new list<Account>();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}
