// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideRightLeftAnimation =
    trigger('slideRightLeftAnimation', [

        state('*', style({
            //position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0)'            
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                // start with the content positioned off the right of the screen, 
                // -400% is required instead of -100% because the negative position adds to the width of the element
                position: 'relative',
                right: '-400%',

                backgroundColor: 'rgba(0, 0, 0, 0)'
            }),

            // animation and styles at end of transition
            animate('1s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                right: '0',
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            style({
                // start with the content positioned off the right of the screen, 
                // -400% is required instead of -100% because the negative position adds to the width of the element
                position: 'relative',
                //top: '0',
                left: '0',

                backgroundColor: 'rgba(0, 0, 0, 0)'
            }),
            // animation and styles at end of transition
            animate('1s ease-in-out', style({
                // transition the left position to -400% which slides the content out of view
                position: 'relative',
                left: '-400%',

                // transition the background opacity to 0 to fade it out
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])
    ]);