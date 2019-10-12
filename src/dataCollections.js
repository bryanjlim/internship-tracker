const whitelist = ["microsoft", "bloomberg", "AI2", "facebook", "google", "flatiron"];

const companyList = [];

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