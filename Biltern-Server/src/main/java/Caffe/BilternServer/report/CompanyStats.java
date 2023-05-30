package Caffe.BilternServer.report;

/**
 * This is the special enum class for CompanyStats, containing valid states that are used throughout the system
 */
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
