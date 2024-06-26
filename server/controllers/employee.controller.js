const Employee = require('../models/employee');

const employeeController = {
    getEmployees: async (req, res) => {
        const employees = await Employee.find();
        res.json(employees);
    },
    createEmployee: async (req, res) => {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.json({ status: 'Employee created' });
    },
    getEmployee: async (req, res) => {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    },
    editEmployee: async (req, res) => {
        const { id } = req.params;
        const employee = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };
        await Employee.findByIdAndUpdate(id, { $set: employee }, { new: true });
        res.json({ status: 'Employee Updated' });
    },
    deleteEmployee: async (req, res) => {
        await Employee.findByIdAndRemove(req.params.id);
        res.json({ status: 'Employee Deleted' });
    }
};

module.exports = employeeController;
