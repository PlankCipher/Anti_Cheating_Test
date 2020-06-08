# Anti_Cheating_Test
A piece of JavaScript code to potentially prevent cheating on web based tests or quizes.

**Available at: [http://anti_cheating_test.imfast.io/](http://anti_cheating_test.imfast.io/)**

## How it works
It depends on using event listeners to detect user activity in the page, and if user is not active for specific amount of time, they are considered cheating.

After the counter is initiated, these are the events listened for to detect cheating:

|event     |element             |job                                                              |
|----------|--------------------|-----------------------------------------------------------------|
|mousedown |anti-cheating button|stops the counter and resets it.                                 |
|mouseup   |anti-cheating button|restarts the counter.                                            |
|mouseleave|anti-cheating button|mainly used to count for holding the mouse down on anti-cheating button and releasing it outside the button, which does not trigger mouse up.                             |
|mousemove |form                |keeps restarting the counter as mouse moves to count for the situation in which the user is not clicking the anti-cheating button, but trying to choose an answer.          |
|mouseleave|form                |actually..I forgot why it is there :sweat_smile:                 |

