import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutLeftAnimation = trigger('fadeInAndOutLeftAnimation', [
    state('*', style({
      position: 'relative',
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
        left: '38.5%',
        opacity: 0,
        position: 'absolute',
      }),


    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          left: '38.5%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '39.5%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '40.5%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          left: '41.5%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '42.5%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          left: '43.5%',
          opacity: 0.1,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          left: '44.5%',
          opacity: 0.3,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          left: '45.5%',
          opacity: 0.5,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          left: '46.5%',
          opacity: 0.7,
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
        position: 'relative',
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
            left: '46.5%',
            opacity: 0.7,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            left: '45.5%',
            opacity: 0.3,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            left: '44.5%',
            opacity: 0.1,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '43.5%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '42.5%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '41.5%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '40.5%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '38.5%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);
