package Caffe.BilternServer.report;

public enum CompanyStats {
    RECEIVED("Recieved"),
    REQUESTED("Company info requested"),
    GRADED("Graded"),
    WAITING("Waiting for company");

    String stat;

    CompanyStats(String stat) {
        this.stat = stat;
    }
    public String getStat(){
        return stat;
    }

}
