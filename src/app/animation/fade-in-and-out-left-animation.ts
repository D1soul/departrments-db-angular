import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInAndOutLeftAnimation = trigger('fadeInAndOutLeftAnimation', [
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
        right: '46%',
        opacity: 0,
        position: 'absolute',
      }),


    animate('0.7s  ease-in',
      keyframes([
        style({
          top: '15.5%',
          opacity: 0,
          right: '46%',
          position: 'absolute',
          offset: 0.1
        }),
        style({
          top: '15.5%',
          opacity: 0,
          right: '45%',
          position: 'absolute',
          offset: 0.2
        }),
        style({
          top: '15.5%',
          opacity: 0,
          right: '44%',
          position: 'absolute',
          offset: 0.3
        }),
        style({
          top: '15.5%',
          opacity: 0 ,
          right: '43%',
          position: 'absolute',
          offset: 0.4
        }),
        style({
          top: '15.5%',
          opacity: 0,
          right: '42%',
          position: 'absolute',
          offset: 0.5
        }),
        style({
          top: '15.5%',
          right: '41%',
          opacity: 0.1,
          position: 'absolute',
          offset: 0.6
        }),
        style({
          top: '15.5%',
          right: '40%',
          opacity: 0.3,
          position: 'absolute',
          offset: 0.7
        }),
        style({
          top: '15.5%',
          right: '39%',
          opacity: 0.5,
          position: 'absolute',
          offset: 0.8
        }),
        style({
          top: '15.5%',
          right: '38%',
          opacity: 0.7,
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
            right: '37%',
            opacity: 1,
            position: 'absolute',
            offset: 0.1,
          }),
          style({
            top: '15.5%',
            right: '38%',
            opacity: 0.7,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '15.5%',
            right: '39%',
            opacity: 0.3,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '15.5%',
            right: '40%',
            opacity: 0.1,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            right: '41%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '15.5%',
            opacity: 0 ,
            right: '42%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '15.5%',
            opacity: 0,
            right: '43%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '13%',
            opacity: 0,
            right: '44%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15.5%',
            opacity: 0,
            right: '46%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);
