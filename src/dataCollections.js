let whitelist = ["microsoft", "bloomberg", "AI2", "facebook", "google", "flatiron"];

class Application {
    constructor(company){
        this.company = company;
        this.appliedDay = 0;
    }

    updateStatus(status){
        this.status = status;
    }
}

class Company {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}