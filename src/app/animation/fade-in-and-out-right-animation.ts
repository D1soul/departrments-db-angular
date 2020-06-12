import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutRightAnimation = trigger('fadeInAndOutRightAnimation', [
    state('*', style({
      position: 'absolute',
      left: '50%',
      top: '15.5%',
      float: 'left',
      opacity: 1,
      minWidth: '1280px',
      maxWidth: 'max-content',
      margin: '70px -640px 0 -640px'
    })),
    transition(':enter', [

      style({
        top: '15.5%',
        left: '59%',
        opacity: 0,
        position: 'absolute',
      }),

    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          left: '59%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '58%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '57%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          left: '56%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '55%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          left: '54%',
          opacity: 0,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          left: '53%',
          opacity: 0.2,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          left: '52%',
          opacity: 0.4,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          left: '51%',
          opacity: 0.6,
          position: 'absolute',
          offset: 0.9
        }),
        style({
          top: '15.5%',
          left: '50%',
          opacity: 1,
          position: 'absolute',
          offset: 1.0
        })
      ]))
    ]),


    transition(':leave', [

      style({
        top: '15.5%',
        left: '50%',
        opacity: 1,
        position: 'absolute',
      }),

      animate('0.7s ease-in',
        keyframes([
          style({
            top: '15.5%',
            left: '50%',
            opacity: 1,
            position: 'absolute',
            offset: 0.1,
          }),
          style({
            top: '15.5%',
            left: '51%',
            opacity: 0.6,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            left: '52%',
            opacity: 0.2,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            left: '53%',
            opacity: 0,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '54%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '55%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '56%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '57%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '59%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);



