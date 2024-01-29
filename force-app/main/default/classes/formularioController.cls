public without sharing class formularioController {

    @AuraEnabled
    public static List<Object> getFieldsSetSubLead(){

        RetornoFieldSet retorno = new RetornoFieldSet();
        retorno.listFieldsSet = SObjectType.Sub_Lead__c.FieldSets.Sub_Lead.getFields();

        List<Object> lstRetorno = new List<Object>();
        lstRetorno.add(JSON.deserializeUntyped(JSON.serialize(retorno)));
        return lstRetorno;
    }

    @AuraEnabled
    public static List<Object> getFieldsSets() {
        List<Retorno>  lstRet = new List<Retorno>();

        RetornoFieldSet retorno = new RetornoFieldSet();
        retorno.listFieldsSet = SObjectType.Lead.FieldSets.formulario.getFields();
        for(Schema.FieldSetMember field : retorno.listFieldsSet) {
            System.debug(field.fieldPath);
        }
        for(Schema.FieldSetMember field : retorno.listFieldsSet) {
                Retorno ret = new Retorno();
                ret.fieldPath = String.valueOf(field.fieldPath);
                ret.label = String.valueOf(field.label);
                ret.required = field.required;
                ret.type = String.valueOf(field.type);

                if ('PICKLIST'.equals(String.valueOf(field.type))) {
                Schema.DescribeSObjectResult objDescribe = Lead.getSObjectType().getDescribe();
                map<String, Schema.SObjectField> customFieldMap = objDescribe.fields.getMap();
                list<Schema.PicklistEntry> custPickValues = customFieldMap.get(String.valueOf(field.fieldPath)).getDescribe().getPickListValues();
                for (Schema.PicklistEntry myCustPick: custPickValues) {
                    ret.options.add(myCustPick.getLabel());
                }
            }
            lstRet.add(ret);
         }
        
        List<Object> lstRetorno = new List<Object>();
        lstRetorno.add(JSON.deserializeUntyped(JSON.serialize(lstRet)));

        return lstRetorno;
    }

    public class Retorno{

        public  Retorno(){
            options = new List<String>();
        }

        public String fieldPath {get; set;}
        public String label {get; set;}
        public Boolean required {get; set;}
        public String type {get; set;}
        public List<String> options {get; set;}

   }

   @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String actName){
        List<Account> accountList = new List<Account>();
        if(actName!=''){
            String accountName = '%' + actName + '%';
            accountList = [select id,name from Account where name like:accountName];
            return accountList;  
        }
        return accountList;
              
    }
    @AuraEnabled(cacheable=true)
    public static list<sObject> searchResults(string searchKey, string sObectType) {
        
        list<sObject> returnList = new List<sObject>();
        if(searchKey != '') {

            String query = 'Select Id, Name From ' + sObectType + ' Where Name LIKE  \'%' + searchKey + '%\'';
            list<sObject> queryResult = Database.query(query);
            return queryResult;
        }
        return null;   
    }

    @AuraEnabled(cacheable=true)
    public static String saveLeads(){

        Lead lead = new Lead();
        lead.Account__c = '' ;
        lead.Salutation = '';
        lead.FirstName = '';
        lead.LastName = '';
        lead.Company = '';
        lead.Title = '';
        lead.LeadSource = '';
        lead.Industry = '';
        lead.AnnualRevenue = 0;
        lead.Phone = '';
        lead.MobilePhone = '';
        lead.Fax = '';
        lead.Email = '';
        lead.Website = '';
        lead.Status = '';
        lead.Rating = '';
        lead.NumberOfEmployees = 0;
        lead.Street = '';
        lead.City = '';
        lead.State = '';
        lead.PostalCode = '';
        lead.NumberofLocations__c = 0;
        lead.Description = '';

        try {
            insert lead;
            return lead.id;
        } catch(Exception ex){
            System.debug('Callout Exception: ' + ex.getMessage() + ' '+ ex.getStackTraceString());
        }

        return '';
    }
}