let whitelist = ["microsoft", "bloomberg", "AI2", "facebook", "google", "flatiron"];

class Application {
    constructor(company){
        this.company = company;
        this.appliedDay = 0;
    }

    updateStatus(status){
        this.status = status;
    }

    getCompany() {
        return this.company;
    }

    getTimeElapsed() {
        // TODO replace with time
        return 0 - this.appliedDay;
    }

    getStatus() {
        return this.status;
    }
}

class Company {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }
}