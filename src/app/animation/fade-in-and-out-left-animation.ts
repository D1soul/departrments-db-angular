import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutLeftAnimation = trigger('fadeInAndOutLeftAnimation', [
    state('*', style({
      position: 'relative',
      left: '19.8%',
      top: '15.5%',
      float: 'left',
      opacity: 1,
      minWidth: '1200px',
      maxWidth: 'max-content',
      marginTop: '20px'
    })),
    transition(':enter', [

      style({
        top: '15.5%',
        left: '9.8%',
        opacity: 0,
        position: 'absolute',
      }),


    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          left: '10.8%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '11.8%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '12.8%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          left: '13.8%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '14.8%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          left: '15.8%',
          opacity: 0.1,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          left: '16.8%',
          opacity: 0.3,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          left: '17.8%',
          opacity: 0.5,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          left: '18.8%',
          opacity: 0.7,
          position: 'absolute',
          offset: 0.9
        }),
        style({
          top: '15.5%',
          left: '19.8%',
          opacity: 1,
          position: 'absolute',
          offset: 1.0
        })
      ]))
    ]),

    transition(':leave', [

      style({
        top: '15.5%',
        left: '19.8%',
        opacity: 1,
        position: 'relative',
      }),

      animate('0.7s ease-in',
        keyframes([
          style({
            top: '15.5%',
            left: '19.8%',
            opacity: 1,
            position: 'absolute',
            offset: 0.1,
          }),
          style({
            top: '15.5%',
            left: '18.8%',
            opacity: 0.7,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            left: '17.8%',
            opacity: 0.3,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            left: '16.8%',
            opacity: 0.1,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '15.8%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '14.8%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '13.8%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '12.8%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '9.8%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);
