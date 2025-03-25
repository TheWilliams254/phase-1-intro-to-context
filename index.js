// Your code here
// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }

  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, targetDate) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === targetDate);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === targetDate);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  function wagesEarnedOnDate(employeeRecord, targetDate) {
    return hoursWorkedOnDate(employeeRecord, targetDate) * employeeRecord.payPerHour;
  }
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
      return total + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    }, 0);
  }
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  