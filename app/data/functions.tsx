import { conditions, temperatures, names } from "./data";

export const randomName = () => names[Math.floor(Math.random() * names.length)];

export const randomZipCode = (country: string) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  switch (country) {
    case "USA":
      return Math.floor(Math.random() * 89999) + 10000;
    case "Canada":
      return `${letters[Math.floor(Math.random() * 26)]}${Math.floor(
        Math.random() * 9
      )}${letters[Math.floor(Math.random() * 26)]} ${Math.floor(
        Math.random() * 9
      )}${letters[Math.floor(Math.random() * 26)]}${Math.floor(
        Math.random() * 9
      )}`;
    case "UK":
      return `${letters[Math.floor(Math.random() * 26)]}${Math.floor(
        Math.random() * 9
      )} ${letters[Math.floor(Math.random() * 26)]}${Math.floor(
        Math.random() * 9
      )}${letters[Math.floor(Math.random() * 26)]}`;
    case "Germany":
      return Math.floor(Math.random() * 89999) + 10000;
    case "Australia":
      return Math.floor(Math.random() * 8999) + 1000;
    case "India":
      return Math.floor(Math.random() * 899999) + 100000;
    case "Japan":
      return `${Math.floor(Math.random() * 899) + 100}-${
        Math.floor(Math.random() * 8999) + 1000
      }`;
    case "Brazil":
      return `${Math.floor(Math.random() * 89999) + 10000}-${
        Math.floor(Math.random() * 899) + 100
      }`;
    case "Mexico":
      return Math.floor(Math.random() * 89999) + 10000;
    case "South Africa":
      return Math.floor(Math.random() * 8999) + 1000;
    default:
      return Math.floor(Math.random() * 89999) + 10000;
  }
};

export const generateRandomLocation = () => {
  const latitude = (Math.random() * 180 - 90).toFixed(6);
  const longitude = (Math.random() * 360 - 180).toFixed(6);
  return { latitude, longitude };
};

export const population = () => Math.floor(Math.random() * 10000000);

export const age = () => Math.floor(Math.random() * 71) + 10;

export const generateRandomDateTime = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTime.toISOString();
};

export const generateRandomWeather = () => {
  const temperature =
    temperatures[Math.floor(Math.random() * temperatures.length)];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const humidity = Math.floor(Math.random() * 101);
  return { temperature, condition, humidity };
};
