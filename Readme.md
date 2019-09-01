Here is the design architect i followed->
1)Start with HTML,CSS and structure your webpage as per design. I have included additional text boxes to test the application instead of testing it from console.
2)A function to Form the participant array on click of "Event List" button. You can see the list of participants so formed beside the input Form.Note that we should include first participant for which the match will happen primarily.
3)The input has to be given in this format -> [{name:name,start:startTime,end:endTime,color:"",eventPlannedFor:true},{...},....]. When you enter the text in text boxes and click on Event List, it automaticlly does the job for you . Here eventPlannedFor is the one for which the lunch event is matched against.
4)As soon as you form the entire list , click on find a match. A function "matchLunchEvent" is called to find a match. It also filles the participant array so formed with colors, green, blue ,black,etc.
5)generateView is the function which is called as soon as we get the match. In this based on the colors decided , we pace the participants events.

How to use->

1. Fill the name, start Time, end time for individual participants and click on "Event List". Make sure that the first person entered is the one we have to find a match for .
   2)After the partipants are stacked up click on "FIND A MATCH".Here you go, you see the view. Green means matched up events. Black means no match. blue means they were in the competetion.
