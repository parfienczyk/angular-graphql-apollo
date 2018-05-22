import { trigger, transition, query, style, group, animate, stagger, state, animateChild, keyframes } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */
    // query('.block', style({ opacity: 0 })),
    /* 3 */
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ]),
    /* 4 */
    query(':enter', stagger(400, [
      style({ transform: 'translateY(100px)' }),
      animate('1s ease-in-out',
        style({ transform: 'translateY(0px)', opacity: 1 })),
    ])),
  ])
]);


export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(':leave',
      [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0 }))
      ],
      { optional: true }
    ),
    query(':enter',
      [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 }))
      ],
      { optional: true }
    )
  ])
]);


export const flyInOut = trigger('flyInOut', [
  state('in', style({ transform: 'translateY(0)' })),
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate(350)
  ]),

  // state('in', style({ transform: 'translateX(0)' })),
  // transition('void => *', animate('600ms ease-in', keyframes([
  //   style({ opacity: 0, offset: 0 }),
  //   style({ opacity: 1, offset: 1.0 })
  // ])))

  // transition(':enter', [
  //   style({ opacity: 0 }),
  //   animate(500, style({ opacity: 1 }))
  // ]),
  // transition('* => void', [
  //   animate(200, style({ transform: 'translateX(100%)' }))
  // ])
]);

export const slideFromDownToUp = trigger('slideFromDownToUp', [
  state('in', style({ opacity: 0, transform: 'translateY(0)' })),
  transition(':enter', [
    style({ opacity: 1, transform: 'translateY(100%)' }),
    animate(200)
  ]),
]);

export const photosAnimation = trigger('photosAnimation', [
  transition('* => *', [

    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(':enter', stagger('300ms', [
      animate('.6s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
      ]))]), { optional: true })
    ,
    query(':leave', stagger('300ms', [
      animate('.6s ease-out', keyframes([
        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
        style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
      ]))]), { optional: true })
  ])
]);
