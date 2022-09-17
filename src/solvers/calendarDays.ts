function isLeapYear(year: number) {
  return year % 4 === 0
}

function numberOfDaysInYear(year: number) {
  return isLeapYear(year) ? 366 : 365
}

function getNumberOfDaysInMonth(year: number) {
  const normalYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return isLeapYear(year) ? leapYear : normalYear
}

/** Find the month and which day (Sun-Sat) a given day falls on */
function getMonthDay(year: number, daySinceStartOfYear: number) {
  const numberOfDaysInMonth = getNumberOfDaysInMonth(year)
  let month = 0
  let day = daySinceStartOfYear
  while (day > numberOfDaysInMonth[month]) {
    day -= numberOfDaysInMonth[month]
    month++
  }
  const date = new Date(year, month, day)
  return { month: date.getMonth(), day: date.getDay() }
}

/** Given a month and required present day (Sun-Sat), generate a day since start of year */
function generateDaySinceStartOfYear(year: number, month: number, day: number) {
  const firstDayInMonth = new Date(year, month, 1)
  const difference = (day + 7 - firstDayInMonth.getDay()) % 7
  let ans = 0
  const numberOfDaysInMonth = getNumberOfDaysInMonth(year)
  for (let i = 0; i < month; i++) ans += numberOfDaysInMonth[i]
  ans += 1 + difference
  return ans
}

export function calendarDaysSolution(numbers: number[]): {
  part1: string
  part2: number[]
} {
  const year = numbers[0]
  const days = numbers.slice(1).filter((day) => day >= 1 && day <= numberOfDaysInYear(year))
  const monthDays = days.map((day) => getMonthDay(year, day))

  // an array of size [12][7] representing if a given [month][day] was given in numbers
  const monthDayPresent = []
  for (let i = 0; i < 12; i++) monthDayPresent.push(Array(7).fill(false))

  for (const monthDay of monthDays) {
    const { day, month } = monthDay
    monthDayPresent[month][day] = true
  }

  let part1 = ''
  for (const daysPresent of monthDayPresent) {
    if (daysPresent.every((x) => x)) part1 += 'alldays,'
    else if (daysPresent[0] && daysPresent[6] && daysPresent.slice(1, 6).every((x) => !x)) {
      part1 += 'weekend,'
    } else if (daysPresent.slice(1, 6).every((x) => x) && !daysPresent[0] && !daysPresent[6]) {
      part1 += 'weekday,'
    } else {
      const mask = 'mtwtfss'
      const dayOrder = [1, 2, 3, 4, 5, 6, 0]
      for (const [index, day] of dayOrder.entries()) part1 += daysPresent[day] ? mask[index] : ' '
      part1 += ','
    }
  }

  const part2Year = 2001 + part1.indexOf(' ')
  const part2 = [part2Year]
  for (const [month, daysPresent] of monthDayPresent.entries()) {
    for (let i = 0; i < 7; i++) {
      if (daysPresent[i]) part2.push(generateDaySinceStartOfYear(part2Year, month, i))
    }
  }

  return { part1, part2 }
}
