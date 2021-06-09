/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date
  })

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable
}

let createEmployeeRecord = (employeeArray) => {
  const employeeRecord = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

let createEmployeeRecords = (arrayOfEmployeeArrays) => {
  return arrayOfEmployeeArrays.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function (date) {
  const inEvent = {
    type: "TimeIn",
    hour: parseInt(date.slice(11)),
    date: date.slice(0, 10)
  }
  this.timeInEvents.push(inEvent)
  return this
}

let createTimeOutEvent = function (date) {
  const outEvent = {
    type: "TimeOut",
    hour: parseInt(date.slice(11)),
    date: date.slice(0, 10)
  }
  this.timeOutEvents.push(outEvent)
  return this
}

let hoursWorkedOnDate = function (date) {
  const timeIn = this.timeInEvents.find(function (day) {
    return day.date === date
  })
  const timeOut = this.timeOutEvents.find(function (day) {
    return day.date === date
  })
  return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function (date) {
  const hours = hoursWorkedOnDate.call(this, date)
  return hours * this.payPerHour
}

let findEmployeeByFirstName = function (employeeRecords, name) {
  const employeeFound = employeeRecords.find(function (employee) {
    return employee.firstName === name
  })
  return employeeFound
}

let calculatePayroll = function (employeeRecords) {
  const payroll = []
  employeeRecords.forEach(function (employee) {
    payroll.push(allWagesFor.call(employee))
  })
  const reducer = (num, accumulator) => num + accumulator
  return payroll.reduce(reducer, 0)
}
