import clock from "clock";
import * as document from "document";
import { today as activity, minuteHistory } from "user-activity";
import { me as appbit } from "appbit";
import { battery } from "power";
import { user } from "user-profile";

// Update the clock every minute
clock.granularity = "minutes";


clock.ontick = (evt) => {
    //console.log('Hours: ' + evt.date.getHours());
    //console.log('Minutes: ' + evt.date.getMinutes()); 
    //console.log('Day of week: ' + evt.date.getDay());  // zero based - Sunday == 0
    //console.log('Month: ' + (evt.date.getMonth() + 1));  // zero based - +1 to get expected number
    //console.log('Day of Month: ' + evt.date.getDate());  
}

console.log('Hello ' + getTitle() + ' Cobol Clock user!');
console.log('Battery: ' + battery.chargeLevel);
console.log('Steps: ' + activity.adjusted.steps);
console.log('Floors: ' + activity.adjusted.elevationGain);
console.log('Distance in Meters: ' + activity.adjusted.distance);
console.log('calories: ' + activity.adjusted.calories);
console.log('Active Zone Mins fatBurn: ' + activity.local.activeZoneMinutes.fatBurn);
console.log('Active Zone Mins cardio: ' + activity.local.activeZoneMinutes.cardio);
console.log('Active Zone Mins Peak: ' + activity.local.activeZoneMinutes.peak);
console.log('Active Zone Mins total: ' + activity.local.activeZoneMinutes.total);
//console.log('Hourly steps: ' + minuteHistory.query({ limit: 60 }));
const minuteRecords = minuteHistory.query({ limit: 60 });
console.log(minuteRecords.length);
//console.log(`${minuteRecords[59]} steps.`);
//console.log("Hourly steps?: " + minuteRecords);

minuteRecords.forEach((minute, index) => {
    //console.log(`${minute.steps} steps. ${index + 1} minute(s) ago.`);
  });

function getTitle() {
    let title;
    if (user.gender === 'male') {
        title = 'Mr.';
    } else if (user.gender === 'female') {
        title = 'Ms.';
    } else {
        title = 'Mx.';
    }
    return title;
}