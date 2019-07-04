// http://www.loc.gov/standards/iso639-2/php/code_list.php contains list of language tags system defined in BCP 47
// Format name
let f2 = new Intl.ListFormat("en");
const na = ["khurram", "ali", "imran"];
console.log(f2.format(na));

// Human friendly date
f2 = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
f2.format(-1, "month"); // display : last month
f2.format(2, "month"); //"in 2 months"
f2.format(3, "day"); //"in 3 days"

// Number format
f2 = new Intl.NumberFormat("en");
const number = 100000000000;
f2.format(number); // "100,000,000,000"

f2 = new Intl.NumberFormat("de");
f2.format(number); //"100.000.000.000"

f2 = new Intl.DateTimeFormat("en", {
	year: "numeric",
	month: "short",
	day: "numeric"
});
f2.format(new Date()); //"Jul 4, 2019"

f2 = new Intl.DateTimeFormat("eu", {
	year: "numeric",
	month: "short",
	day: "numeric"
});
f2.format(new Date()); //"2019 M07 4"