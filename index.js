var eventPlannedForFlag = true;

//adding event listerners
//event listener for on click of "EVENT LIST"
$("#eventList").click(function() {
  var name = $("#name").val();
  var startTime = $("#startTime").val();
  var endTime = $("#endTime").val();
  //push to the input allparticipantsArray
  prepareInputArray(name, startTime, endTime);

  //display the so formed array.
  var formattedArray = particpantsArray.map(curr => {
    return Object.values(curr).join(" ");
  });
  $("#formedInputArray").text(formattedArray.join(", "));
});

//event listener for on click of "FIND A MATCH"
$("#matchList").click(function() {
  matchLunchEvent(particpantsArray);
  generateView(particpantsArray);
});

//array containing all the participants
var particpantsArray = [];

//function to prepareInput Array based on the input entered
function prepareInputArray(name, startTime, endTime) {
  if (name && startTime && endTime)
    particpantsArray.push({
      name: name,
      start: startTime,
      end: endTime,
      color: "",
      eventPlannedFor: eventPlannedForFlag
    });
  eventPlannedForFlag = false;
}

//to find a suitable match
//input should in the form of [{name:name,start:startTime,end:endTime,color:"",eventPlannedFor:true},{...},....]
/** example arrays below */
var testCase1 = [
  { name: "me", start: "225", end: "285", color: "", eventPlannedFor: true },
  { name: "me1", start: "210", end: "270", color: "", eventPlannedFor: false },
  { name: "me2", start: "180", end: "240", color: "", eventPlannedFor: false },
  { name: "me3", start: "240", end: "300", color: "", eventPlannedFor: false },
  { name: "me4", start: "300", end: "360", color: "", eventPlannedFor: false },
  { name: "me5", start: "270", end: "330", color: "", eventPlannedFor: false }
];

var testCase2 = [
  { name: "me", start: "225", end: "285", color: "", eventPlannedFor: true },
  { name: "me1", start: "300", end: "360", color: "", eventPlannedFor: false },
  { name: "me2", start: "180", end: "240", color: "", eventPlannedFor: false }
];

//function to match the participant and prepare the array for color
function matchLunchEvent(input) {
  let allEmployee = [...input];
  employeeRenderList = [...input];
  let meName = allEmployee[0].name;
  let meStartTime = Number(allEmployee[0].start);
  let meEndTime = Number(allEmployee[0].end);

  allEmployee.splice(0, 1);

  let tempAllEmployee = [...allEmployee];
  tempAllEmployee.forEach((curr, index) => {
    var employeeStartTime = Number(curr.start);
    var employeeEndTime = Number(curr.end);

    var totalTimeOfMeet;
    var foundIndex = 0;
    if (employeeEndTime > meStartTime) {
      if (meStartTime >= employeeStartTime) {
        totalTimeOfMeet = 0;
        if (employeeEndTime >= meEndTime) {
          totalTimeOfMeet =
            employeeEndTime - meStartTime - (employeeEndTime - meEndTime);
        } else {
          totalTimeOfMeet = employeeEndTime - meStartTime;
        }
        if (totalTimeOfMeet < 30) {
          allEmployee.forEach((current, index) => {
            if (current.name === curr.name) foundIndex = index;
          });
          allEmployee.splice(foundIndex, 1);
        } else {
          allEmployee.forEach((current, index) => {
            if (current.name === curr.name) foundIndex = index;
          });
          allEmployee[foundIndex]["totalMeetTime"] = String(totalTimeOfMeet);
        }
      } else {
        totalTimeOfMeet = 0;
        if (employeeEndTime >= meEndTime) {
          totalTimeOfMeet =
            employeeEndTime -
            meStartTime -
            (employeeStartTime - meStartTime) -
            (employeeEndTime - meEndTime);
        } else {
          totalTimeOfMeet =
            employeeEndTime - meStartTime - (employeeStartTime - meStartTime);
        }

        if (totalTimeOfMeet < 30) {
          allEmployee.forEach((current, index) => {
            if (current.name === curr.name) foundIndex = index;
          });
          allEmployee.splice(foundIndex, 1);
        } else {
          allEmployee.forEach((current, index) => {
            if (current.name === curr.name) foundIndex = index;
          });
          allEmployee[foundIndex]["totalMeetTime"] = String(totalTimeOfMeet);
        }
      }
    } else {
      allEmployee.forEach((current, index) => {
        if (current.name === curr.name) foundIndex = index;
      });
      allEmployee.splice(foundIndex, 1);
    }
  });

  if (allEmployee.length === 0) {
    employeeRenderList.forEach(curr => {
      if (curr.name === meName) {
        curr.color = "black";
      } else {
        curr.color = "#003cb3";
      }
    });
    input = employeeRenderList;
  } else {
    //sort the array based on totalTimeOfMeet
    allEmployee.sort(
      (a, b) => Number(b.totalMeetTime) - Number(a.totalMeetTime)
    );

    var maxTimeOfmeet = Number(allEmployee[0].totalMeetTime);

    allEmployee.filter(curr => Number(curr.totalMeetTime) === maxTimeOfmeet);
    if (allEmployee.length === 1) {
      var matchedParticipant = allEmployee[0].name;
      employeeRenderList.forEach(curr => {
        if (curr.name === matchedParticipant || curr.name === meName) {
          curr.color = "green";
        } else {
          curr.color = "#003cb3";
        }
      });
      input = employeeRenderList;
    } else {
      allEmployee.sort((a, b) => Number(a.start) - Number(b.start));
      var matchedParticipant = allEmployee[0].name;
      employeeRenderList.forEach(curr => {
        if (curr.name === matchedParticipant || curr.name === meName) {
          curr.color = "green";
        } else {
          curr.color = "#003cb3";
        }
      });
      input = employeeRenderList;
    }
  }
}

//dynamically generate the HTML view
function generateView(input) {
  input.sort((a, b) => a.start - b.start);

  var finalDisplay = [];
  input.forEach(eachParticipant => {
    if (!eachParticipant.eventPlannedFor) {
      var placed = false;

      //when there is no element in a row add it
      if (finalDisplay.length === 0) {
        finalDisplay.push([eachParticipant]);
        placed = true;
      } else {
        for (var k = 0; k < finalDisplay.length; k++) {
          if (
            eachParticipant.start >=
            finalDisplay[k][finalDisplay[k].length - 1].end
          ) {
            finalDisplay[k].push(eachParticipant);
            placed = true;
            break;
          }

          if (placed) break;
        }
      }

      if (!placed) {
        finalDisplay.push([eachParticipant]);
      }
    }
  });

  input.forEach(eachParticipant => {
    if (eachParticipant.eventPlannedFor) {
      finalDisplay.push([eachParticipant]);
    }
  });

  console.log("finalDisplay", finalDisplay);

  //Now insert into the HTML form and style
  $(".lunchEvents").empty();
  finalDisplay.forEach((groupEvents, indexP) => {
    console.log("groupEvents", groupEvents);
    var groupHtml = `<div class="group-events-${indexP}" id="group-events"> </div>`;

    $(".lunchEvents").append(groupHtml);
    groupEvents.forEach((singleEvent, indexC) => {
      console.log("singleEvent", singleEvent);
      var singleHtml = `<div class="singleEvent-${indexP}-${indexC}" id="single-event" ><label class="control-label-${indexP}-${indexC}" id="control-label">${singleEvent.name}</label></div>`;
      $(`.group-events-${indexP}`).append(singleHtml);

      $(`.singleEvent-${indexP}-${indexC}`).css(
        "border-left",
        `5px solid ${singleEvent.color}`
      );
      $(`.singleEvent-${indexP}-${indexC}`).css(
        "height",
        `${singleEvent.end - singleEvent.start - 2}`
      );
      $(`.singleEvent-${indexP}-${indexC}`).css("position", `absolute`);
      $(`.singleEvent-${indexP}-${indexC}`).css("top", `${singleEvent.start}`);
      $(`.control-label-${indexP}-${indexC}`).css(
        "color",
        `${singleEvent.color}`
      );
    });
  });
}
