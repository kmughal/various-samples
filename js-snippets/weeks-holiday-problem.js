function getAllDaysInMonth(date, day) {
  const year = date.getFullYear(),
    month = date.getMonth()

  const days = "sun,mon,tue,wed,thu,fri,sat".split(",")
  day = String(day).toLocaleLowerCase()
  const dayInt = days.findIndex((d) => d === day)
  date.setDate(1)
  let startDate = date

  while (startDate.getDay() !== dayInt)
    startDate.setDate(startDate.getDate() + 1)

  const result = []
  while (startDate.getMonth() === month) {
    result.push(new Date(startDate.getTime()))
    startDate.setDate(startDate.getDate() + 7)
  }

  return result
}

const startDate = new Date()
const endDate = new Date()
endDate.setMonth(endDate.getMonth() + 1)

const allSat = getAllDaysInMonth(startDate, "sat") // can only travel to first saturday

const allMondays = getAllDaysInMonth(endDate, "mon") // can only return to last monday
console.log(
  "Total weeks of holidays : ",
  WeeksDifference(allSat[0], allMondays[allMondays.length - 1])
)

function WeeksDifference(a, b) {
  return Math.round((b - a) / 604800000)
}
