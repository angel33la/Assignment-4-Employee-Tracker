class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = 'Part Time';
    }

    calculatePay() {
        this.annualSalary = this.payRate * this.hours * 52;
    }
}

class Manager extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = 'Manager';
    }

    calculatePay() {
        this.annualSalary = (this.payRate * this.hours * 52) - 1000;
    }
}

class Main {
    constructor() {
        this.employees = [];
        this.initializeEmployees();
        this.displayMenu();
    }

    initializeEmployees() {
        const emp1 = new Manager("John Doe", 35, 5, 45);
        const emp2 = new PartTime("Jane Smith", 28, 8, 20);
        const emp3 = new Manager("Bob Wilson", 42, 7, 50);
        
        [emp1, emp2, emp3].forEach(emp => {
            emp.calculatePay();
            this.employees.push(emp);
        });
    }

    displayMenu() {
        console.log("\n=== Menu Options: ===");
        console.log("1. Add Employee");
        console.log("2. Remove Employee");
        console.log("3. Edit Employee");
        console.log("4. Display Employees");
        console.log("5. Exit");
        
        const choice = prompt("Enter your choice (1-4):");
        this.handleMenuChoice(choice);
    }

    handleMenuChoice(choice) {
        switch(choice) {
            case "1": this.addEmployee(); break;
            case "2": this.removeEmployee(); break;
            case "3": this.editEmployee(); break;
            case "4": this.displayEmployees(); break;
            case "5": return;
        }
        this.displayMenu();
    }

    addEmployee() {
        const input = prompt("Enter name,age,pay rate,hours (comma separated):");
        const [name, age, payRate, hours] = input.split(",").map(item => item.trim());

        const employee = parseInt(hours) >= 40 
        ? new Manager(name, parseInt(age), parseFloat(payRate), parseInt(hours))
        : new PartTime(name, parseInt(age), parseFloat(payRate), parseInt(hours));

        employee.calculatePay();
        this.employees.push(employee);
        this.displayEmployees();
    }

    removeEmployee() {
        const name = prompt("Enter employee name to remove:").trim();
        if (!isNaN(name)) {
            this.employees.splice(parseInt(input) - 1, 1);
        } else {
            this.employees = this.employees.filter(emp => emp.name !== input);
        }
        this.displayEmployees();
    }

    editEmployee() {
        const id = parseInt(prompt("Enter employee ID to edit:")) - 1;
        const newPayRate = parseFloat(prompt("Enter new pay rate:"));
        
        if (this.employees[id]) {
            this.employees[id].payRate = newPayRate;
            this.employees[id].calculatePay();
            this.displayEmployees();
        }
    }

    displayEmployees() {
        console.clear();
        console.log("Emp#\tName\tAge\tSalary\tHours\tPay Rate\tType");
        console.log("----\t----\t---\t------\t-----\t--------\t----");
        
        this.employees.forEach((emp, index) => {
            console.log(
                `${index + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary}\t${emp.hours || 40}\t${emp.payRate}\t${emp.employeeType}`
            );
        });
        }
    }


(function() {
    new Main();
})();