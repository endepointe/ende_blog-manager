export default function checkDates(pub, mod) {
  if (pub === "Invalid Date") {return 0;}
  if (pub > mod) {
    return 0;
  }
  return 1;
}