const whitelist = ["microsoft", "bloomberg", "AI2", "facebook", "google", "flatiron"];

const companyList = [];
const applyList = [];

const applyStatus = {
    PROCESSING: "processing",
    INTERVIEWING: "interviewing",
    PROCESSING: "processing",
    ACCEPTED: "accepted",
    DENIED: "denied"
}

// TODO replace lastUpdate with time
class Application {
    emails;

    constructor(company){
        this.company = company;
        this.lastUpdate = 0;
        this.status = applyStatus.PROCESSING;
        this.emails = [];
        applyList.push(this);
    }

    updateStatus(status){
        this.status = status;
    }

    getCompany() {
        return this.company;
    }

    getTimeLastUpdate() {
        return 0 - this.lastUpdate;
    }

    getStatus() {
        return this.status;
    }

    addEmail(email) {
        this.emails.push(email);
        this.lastUpdate = 0;
    }

    getListEmails() {
        return this.emails;
    }

}

class Company {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        companyList.push(this);
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getAvgTime() {
        return "two weeks";
    }
}

// Returns an array of applications from this company
function applicationsByCompany(companyName) {
    let companyApps = [];
    applyList.forEach(function(application) {
        if(companyName === application.getCompany()) {
            companyApps.push(application);
        }
    });
    return companyApps;
}

// Returns an array of applications which are in this status
function applicationsByStatus(status) {
    let statusApps = [];
    applyList.forEach(function(application) {
        if(status === application.getStatus()) {
            statusApps.push(application);
        }
    });
    return statusApps;
}