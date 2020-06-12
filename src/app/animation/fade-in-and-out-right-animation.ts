import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutRightAnimation = trigger('fadeInAndOutRightAnimation', [
    state('*', style({
      position: 'absolute',
      right: '37%',
      top: '15.5%',
      float: 'right',
      opacity: 1,
      minWidth: '1280px',
      maxWidth: 'max-content',
      margin: '50px -640px 0 -640px'
    })),
    transition(':enter', [

      style({
        top: '15.5%',
        right: '28%',
        opacity: 0,
        position: 'absolute',
      }),

    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          right: '28%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          right: '29%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          right: '30%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          right: '31%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          right: '32%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          right: '33%',
          opacity: 0,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          right: '34%',
          opacity: 0.2,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          right: '36%',
          opacity: 0.4,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          right: '36%',
          opacity: 0.6,
          position: 'absolute',
          offset: 0.9
        }),
        style({
          top: '15.5%',
          right: '37%',
          opacity: 1,
          position: 'absolute',
          offset: 1.0
        })
      ]))
    ]),


    transition(':leave', [

      style({
        top: '15.5%',
        right: '37%',
        opacity: 1,
        position: 'absolute',
      }),

      animate('0.7s ease-in',
        keyframes([
          style({
            top: '15.5%',
            right: '36%',
            opacity: 1,
            position: 'absolute',
            offset: 0.1,
          }),
          style({
            top: '15.5%',
            right: '35%',
            opacity: 0.6,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            right: '34%',
            opacity: 0.2,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            right: '33%',
            opacity: 0,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            right: '32%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            right: '31%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            right: '30%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '15.5%',
            opacity: 0,
            right: '29%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            right: '28%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);



