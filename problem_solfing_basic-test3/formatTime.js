function convertTo24HourFormat(time12Hour) {
  const [time, period] = time12Hour.split(" ");
  const [hours, minutes, seconds] = time.split(":");

  let hour = parseInt(hours, 10);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  const hour24Format = hour.toString().padStart(2, "0");
  const minute24Format = minutes.padStart(2, "0");
  const second24Format = seconds.padStart(2, "0");

  return `${hour24Format}:${minute24Format}:${second24Format}`;
}

const time12Hour = "02:30:45 AM";
const time24HourWithSeconds = convertTo24HourFormat(time12Hour);
console.log(time24HourWithSeconds);
