/*
 * MIT License
 *
 * Copyright (c) 2024 Joshua Horvath
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import clock from "clock";
import * as document from "document";
import { today as activity, minuteHistory } from "user-activity";
import { me as appbit } from "appbit";
import { battery } from "power";
import { user } from "user-profile";

// Update the clock every minute
clock.granularity = "minutes";

const hourLabel = document.getElementById("hourLabel");
const minuteLabel = document.getElementById("minuteLabel");
const amPmLabel = document.getElementById("amPmLabel");
//const stepCountLabel = document.getElementById("stepCountLabel");
//const floorsLabel = document.getElementById("floorsLabel");
//const batteryLabel = document.getElementById("batteryLabel");

clock.ontick = (evt) => {
    //console.log('Hours: ' + evt.date.getHours());
    //console.log('Minutes: ' + evt.date.getMinutes()); 
    //console.log('Day of week: ' + evt.date.getDay());  // zero based - Sunday == 0
    //console.log('Month: ' + (evt.date.getMonth() + 1));  // zero based - +1 to get expected number
    //console.log('Day of Month: ' + evt.date.getDate());  

    updateTimeGroup(evt);
}

/**
 * Updates the current time display values in GUI. 
 * @param {*} evt 
 */
function updateTimeGroup(evt) {
  // get time information from API
  let todayDate = evt.date;
  let rawHours = todayDate.getHours();

  // 12 hour format
  let hours = rawHours % 12 || 12;

  let mins = todayDate.getMinutes();
  let displayMins = zeroPad(mins);

  // display time on main clock
  hourLabel.text = `${hours}`;
  minuteLabel.text = `${displayMins}`;

  // AM / PM indicator
  amPmLabel.text = rawHours >= 12 ? '"PM".' : '"AM".';
}

/**
 * Front appends a zero to an integer if less than ten.
 * @param {*} i 
 * @returns 
 */
function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
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