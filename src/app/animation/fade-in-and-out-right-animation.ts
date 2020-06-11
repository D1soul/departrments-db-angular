import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutRightAnimation = trigger('fadeInAndOutRightAnimation', [
    state('*', style({
      position: 'absolute',
      left: '47.5%',
      top: '15.5%',
      float: 'left',
      opacity: 1,
      minWidth: '1200px',
      maxWidth: 'max-content',
      margin: '0 -600px 0 -600px'
    })),
    transition(':enter', [

      style({
        top: '15.5%',
        left: '29.8%',
        opacity: 0,
        position: 'absolute',
      }),

    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          left: '56.5%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '55.5%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '54.5%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          left: '53.5%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '52.5%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          left: '51.5%',
          opacity: 0,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          left: '50.5%',
          opacity: 0.2,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          left: '49.5%',
          opacity: 0.4,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          left: '48.5%',
          opacity: 0.6,
          position: 'absolute',
          offset: 0.9
        }),
        style({
          top: '15.5%',
          left: '47.5%',
          opacity: 1,
          position: 'absolute',
          offset: 1.0
        })
      ]))
    ]),


    transition(':leave', [

      style({
        top: '15.5%',
        left: '47.5%',
        opacity: 1,
        position: 'absolute',
      }),

      animate('0.7s ease-in',
        keyframes([
          style({
            top: '15.5%',
            left: '47.5%',
            opacity: 1,
            position: 'absolute',
            offset: 0.1,
          }),
          style({
            top: '15.5%',
            left: '48.5%',
            opacity: 0.6,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            left: '49.5%',
            opacity: 0.2,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            left: '50.5%',
            opacity: 0,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '51.5%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '52.5%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '53.5%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '54.5%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '56.5%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);



