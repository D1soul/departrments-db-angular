import { trigger, animate, transition, style, state, keyframes } from '@angular/animations';

export const fadeInAndOutTopAnimation =
  trigger('fadeInAndOutTopAnimation', [
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
        top: '120px',
        right: '37%',
        opacity: 0,
        position: 'absolute',
      }),

      animate('0.7s  ease-in',
        keyframes([
          style({
            top: '11%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 0.1
          }),
          style({
            top: '11.5%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 0.2
          }),
          style({
            top: '12%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '12.5%',
            opacity: 0 ,
            right: '37%',
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '13%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '13.5%',
            right: '37%',
            opacity: 0,
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '14%',
            right: '37%',
            opacity: 0.2,
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '14.5%',
            right: '37%',
            opacity: 0.4,
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '15%',
            right: '37%',
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
            top: '15%',
            right: '37%',
            opacity: 0.6,
            position: 'absolute',
            offset: 0.2,
          }),
          style({
            top: '14.5%',
            right: '37%',
            opacity: 0.2,
            position: 'absolute',
            offset: 0.3
          }),
          style({
            top: '14%',
            right: '37%',
            opacity: 0,
            position: 'absolute',
            offset: 0.4
          }),
          style({
            top: '13.5%',
            opacity: 0 ,
            right: '37%',
            position: 'absolute',
            offset: 0.5
          }),
          style({
            top: '13%',
            opacity: 0 ,
            right: '37%',
            position: 'absolute',
            offset: 0.6
          }),
          style({
            top: '12.5%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 0.7
          }),
          style({
            top: '12%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 0.8
          }),
          style({
            top: '11.5%',
            opacity: 0,
            right: '37%',
            position: 'absolute',
            offset: 1.0
          })
        ])
      )
    ])
  ]);



