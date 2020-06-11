import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutRightAnimation = trigger('fadeInAndOutRightAnimation', [
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
        left: '29.8%',
        opacity: 0,
        position: 'absolute',
      }),

    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          left: '28.8%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '27.8%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '26.8%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          left: '25.8%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          left: '24.8%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          left: '23.8%',
          opacity: 0,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          left: '22.8%',
          opacity: 0.2,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          left: '21.8%',
          opacity: 0.4,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          left: '20.8%',
          opacity: 0.6,
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
        position: 'absolute',
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
            left: '20.8%',
            opacity: 0.6,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            left: '21.8%',
            opacity: 0.2,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            left: '22.8%',
            opacity: 0,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '23.8%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            left: '24.8%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '25.8%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '26.8%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            left: '29.8%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);



